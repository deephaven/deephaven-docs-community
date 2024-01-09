---
id: bidirectional-plugins
title: How to create a server-side ObjectType plugin
sidebar_label: Create a server-side ObjectType plugin
---

This guide will show you how to write your own server-side streaming `ObjectType` plugin.

An `ObjectType` server plugin enables clients to connect to objects it manages. A client plugin must also exist. The server- and client-side plugins together form a bidirectional streaming plugin. In order to work properly, the plugin must:

- Be registered to be picked up during startup.
- Indicate which objects are managed by the plugin.
- Provide an implementation to handle messages from the client.

The remainder of this guide will present two examples that show how to create and use bidirectional plugins from both the server and client side. The first example passes an object back and forth between the client and server. The second example creates a basic chat server via a bidirectional `ObjectType` plugin.

## Basic plugin

The simplest possible bidirectional plugin demonstrates the wiring required to create the plugin itself. First, we must create an object that is recognized as the instance that the plugin will handle and be able to use it from the Python console.

First, create the object that will communicate with the client via the plugin, which is simply an empty dictionary. This goes into the file `example/plugin.py`.

```python skip-test
ECHO = {}
```

Without the plugin, `ECHO` won't be visible to clients. To register the plugin, extend `deephaven.plugin.Registration`, and implement the required class method to let Deephaven know about our new plugin. For this simple example, we'll add it in the same file, but generally we'd advise it live in its own file:

```python skip-test
from deephaven.plugin import Registration, Callback

class EchoRegistration(Registration):
    @classmethod
    def register_into(clscls, callback: Callback) -> None:
        callback.register(EchoPlugin)
```

Lastly, add a simple `BidirectionalObjectType`, again in the same file.

```python skip-test
from deephaven.plugin.object_type import MessageStream, BidirectionalObjectType
from typing import Any


class EchoPlugin(BidirectionalObjectType):
    @property
    def name(self) -> str:
        return 'echo'

    def is_type(self, obj: Any) -> bool:
        return obj is ECHO

    def create_client_connection(self, obj, connection: MessageStream) -> MessageStream:
        connection.on_data(b'Data Received.')
        return connection
```

With the Python code written, the final step is to register the plugin when the wheel is installed. This project uses the `pyproject.toml` format. Projects can also use `setup.py` or `setup.cfg`, as discussed in [Python's documentation](https://docs.python.org/3/distutils/configfile.html).

:::note
You can only have one plugin registration type in a project, but the `register_into` method can be built to install multiple plugins.
:::

```toml
[project.entry-points."deephaven.plugin"]
registration_cls = "echo.plugin:EchoRegistration"
```

## Chat app

The previous example showed the basics of getting a bidirectional plugin up and running, though it didn't do anything worthwhile. A familiar use case that illustrates a real use of bidirectional plugins is a chat app, where users can connect to a site to send and read messages from one another.

Consideration must be given as to how an object will interact with connected clients. Depending on the way in which the plugin is used, the object may be shared by multiple users or from multiple connections from the same user. In either case, the object could be made immutable, copied before being passed to the client, or passed as a single mutable item.

### Plugin implementation

Before designing the plugin itself, the chat room objects must be defined. They fall into two categories:

- Chat message
- Chat server

Below shows an example of the object definitions. The implementations are left out.

The code below is placed into a file called `deephaven_example/chat/__init__.py`.

```python skip-test
from typing import List, Callable, Union
from dataclasses import dataclass

@dataclass
class ChatMessage:
    message:str
    action:str
    user_name:str
    room_name:str

class ChatServer:
    def room_list(self, rooms_handler: Callable[[List[str]], None]) -> None:
        pass
    def join_or_create_room(self, user_name: str, room_name: str,
                            message_handler: Callable[[List[ChatMessage]], None]) -> None:
        pass
    def send_message(self, message: Union[str, None], action: Union[str, None], user_name: str, room_name: str) -> None:
        pass
    def leave_room(self, user_name: str, room_name: str):
        pass
```

Without a plugin, the object won't be accessible by clients. To register the plugin, extend `deephaven.plugin.Registration` and implement the required class method to let Deephaven know that it exists.

The code below is placed into a file called `deephaven_example/chat/plugin.py`.

```python skip-test
from deephaven.plugin import Registration, Callback

class Chat1Registration(Registration):
    @classmethod
    def register_into(clscls, callback: Callback) -> None:
        callback.register(ChatPlugin)
```

We will also add a simple `BidirectionalObjectType` to the same file.

```python skip-test
from . import ChatServer, ChatMessage
from deephaven.plugin.object_type import MessageStream, BidirectionalObjectType
from typing import Any


class ChatPlugin(BidirectionalObjectType):
    @property
    def name(self) -> str:
        return 'chatv1'

    def is_type(self, obj: Any) -> bool:
        return isinstance(obj, ChatServer)
    def create_client_connection(self, obj: ChatServer, connection: MessageStream) -> MessageStream:
        # Same useless example as in EchoPlugin for now
        connection.on_data(b'hello, world')
        return connection
```

At this point, if the plugin is installed and a chat server started, all clients would be able to see the object. If the Web UI had a client plugin, it could render the object in the panels dropdown. However, it would not render it as a panel or allow anything else to be done to it.

### Wire format definition

We next need to consider how the client and server will communicate, and what format messages will be sent. The `ObjectType` serialization format can handle any binary payload, and Deephaven plugins typically use [protobuf](https://protobuf.dev/) internally. Many developers, however, are more comfortable with JSON for quickly designing a format to experiment with.

Looking at the original `ChatServer` object above, there should be the following supported cases:

- Creating a room
- Joining a room
- Leaving a room
- Sending a message to a room
- Receiving a message from a room

After joining a room, past messages can be sent to the client using the same payload used when receiving a new message. Each message should be a JSON object with two fields: `message_type` and `payload`, where the payload varies depending on the message type.

### Room list response

On connection, the client should receive the list of rooms without needing to explicitly request it. They should also be notified of new rooms as they are created.

```json
{
  "message_type": "room_list",
  "payload": {
    "rooms": ["Newly Created Room"]
  }
}
```

### Create or join a room

To simplify things, make this a single action, creating a new room for messages. The client sends the message, and the server responds by subscribing the client to all messages in that room.

```json
{
  "message_type": "join_room",
  "payload": {
    "room_name": "room1"
  }
}
```

A corresponding `leave_room` will look the same.

```json
{
  "message_type": "leave_room",
  "payload": {
    "room_name": "room1"
  }
}
```

### Receive messages

Users should receive messages in two cases: when they first join a room, or when a message is sent to a room they are subscribed to.

```json
{
  "message_type": "receive_messages",
  "payload": {
    "messages": [
      {
        "username": "user1",
        "message": "Hello World!",
        "action": "receive"
      }
    ]
  }
}
```

### Send messages

Clients can send messages to any room they are a part of. The server will receive it and send it to other users.

```json
{
  "message_type": "send_message",
  "payload": {
    "room_name": "room1",
    "message": "Foo bar baz"
  }
}
```

### Client implementation

The following client implementation, `create_client_connection.py`, is able to read incoming messages from the client as well as send them back when callbacks are invoked.

```python skip-test
import json
from io import StringIO
from random import randrange

class ChatServerMessageStream(MessageStream):
    """
    Implementation of MessageStream that will be called when a message is received from the client
    """

    def __init__(self, connection: MessageStream, chat_server: ChatServer):
        super().__init__()
        self.server = chat_server
        self.connection = connection
        self.user_name = f'user #{randrange(1000000, 9999999, 1)}'
        self.server.room_list(self.send_rooms)
        self.active_rooms = []

    def send_rooms(self, rooms: List[str]):
        self.send('room_list', {'rooms': rooms})

    def send(self, message_type: str, payload: Any) -> None:
        s = StringIO()
        json.dump({"message_type": message_type, "payload": payload}, s)
        self.connection.on_data(s.getvalue().encode('utf-8'), [])

    def receive_messages(self, messages: List[ChatMessage]) -> None:
        self.send('receive_messages', {'messages': [m.__dict__ for m in messages]})

    def on_data(self, payload: bytes, references: List[Any]):
        json_string = bytes(iter(payload)).decode('utf-8')
        message = json.load(StringIO(json_string))
        if message['message_type'] == 'join_room':
            self.active_rooms.append(message['payload']['room_name'])
            self.server.join_or_create_room(self.user_name, message['payload']['room_name'], self.receive_messages)
        elif message['message_type'] == 'leave_room':
            self.active_rooms.remove(message['payload']['room_name'])
            self.server.leave_room(self.user_name, message['payload']['room_name'])
        elif message['message_type'] == 'send_message':
            self.server.send_message(
                user_name=self.user_name,
                room_name=message['payload']['room_name'],
                message=message['payload']['message'],
                action=None
            )

    def on_close(self) -> None:
        for room_name in self.active_rooms:
            self.server.leave_room(user_name=self.user_name, room_name=room_name)
```

We can now replace the plugin [`create_client_connection`](#basic-plugin-implementation) method with the following:

```python skip-test
def create_client_connection(self, obj: ChatServer, connection: MessageStream) -> MessageStream:
    return ChatServerMessageStream(connection, obj)
```

### HTML

The last piece of the puzzle is the HTML that will be used to render the chat app. The following HTML is placed into a file called `chat.html`.

<details><summary>HTML code for the chat app</summary>

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Deephaven HTML/JS sample for chat_v1 plugin</title>
    <link href="basic.css" rel="stylesheet" type="text/css" />
    <style>
      table {
        border-spacing: 0;
      }
      thead td {
        font-weight: bold;
        border-bottom: 1px solid black;
      }
      tbody td {
        border-bottom: 1px solid gray;
        padding: 4px;
      }
    </style>
  </head>
  <body>
    <h3>Room List (click a room to join it):</h3>
    <ul id="roomList"></ul>

    <button id="create">Create Room...</button>
    <h3>Join the chat:</h3>
    <table id="room">
      <thead>
        <tr>
          <!--            <td>Timestamp</td>-->
          <td>Username</td>
          <td>Message</td>
        </tr>
      </thead>
      <tbody id="roomMessages"></tbody>
    </table>
    <textarea
      id="message"
      placeholder="join a channel first"
      rows="1"
      cols="80"
      maxlength="1000"
      autofocus="autofocus"
      disabled="disabled"
      style="resize:vertical"
    ></textarea>
    <button id="send">Send</button>

    <script type="module">
      import dh from './dh-core.js';

      const { CoreClient } = dh;
      var connection;
      var ide;

      (async () => {
        // Open a connection to the server
        var client = new CoreClient(
          window.location.protocol + '//' + window.location.host
        );
        await client.login({ type: CoreClient.LOGIN_TYPE_ANONYMOUS });
        connection = await client.getAsIdeConnection();

        var types = await connection.getConsoleTypes();

        if (types.indexOf('python') !== -1) {
          // Start a python session
          ide = await connection.startSession('python');
        } else if (types.indexOf('groovy') !== -1) {
          alert('Sorry, this example only runs in python.');
          return;
        }

        function getChat() {
          return ide.getObject({ type: 'chat_v1', name: 'chat1' });
        }
        var chat;
        try {
          chat = await getChat();
        } catch (ignore) {
          // chat didn't exist yet, create it
          await ide.runCode(`from dhexample.chat1 import ChatServer
chat1 = ChatServer()`);
          chat = await getChat();
        }

        // DOM rendering functions
        var roomListElement = document.getElementById('roomList');
        function displayRoomList(rooms) {
          for (var i = 0; i < rooms.length; i++) {
            var li = document.createElement('li');
            li.textContent = rooms[i];
            roomListElement.appendChild(li);
          }
        }
        var roomMessagesElement = document.getElementById('roomMessages');
        function appendMessages(messages) {
          for (var i = 0; i < messages.length; i++) {
            var tr = document.createElement('tr');
            var username = document.createElement('td');
            username.textContent = messages[i].user_name;
            var message = document.createElement('td');
            if (messages[i].action) {
              message.style.fontStyle = 'italic';
              message.textContent = messages[i].action;
            } else {
              message.textContent = messages[i].message;
            }
            tr.append(username, message);
            roomMessagesElement.appendChild(tr);
          }
        }
        function clearMessages() {
          while (roomMessagesElement.hasChildNodes()) {
            roomMessagesElement.removeChild(roomMessagesElement.lastChild);
          }
        }

        // Process incoming widget events
        async function handleMessage(detail) {
          var m = JSON.parse(detail.getDataAsString());
          var objects = detail.exportedObjects;
          switch (m.message_type) {
            case 'room_list': {
              displayRoomList(m.payload.rooms);
              break;
            }
            case 'receive_messages': {
              appendMessages(m.payload.messages);
              break;
            }
          }
        }

        chat.addEventListener('message', (e) => handleMessage(e.detail));
        await handleMessage(chat);

        // Add event handlers to the page to know when to send outgoing widget events
        var sendBtn = document.getElementById('send');
        var messageBox = document.getElementById('message');

        var currentRoomName;
        function joinRoom(roomName) {
          messageBox.removeAttribute('disabled');
          messageBox.setAttribute(
            'placeholder',
            'Enter a message to send in ' + roomName
          );
          messageBox.value = '';

          if (currentRoomName) {
            chat.sendMessage(
              JSON.stringify({
                message_type: 'leave_room',
                payload: { room_name: currentRoomName },
              }),
              []
            );
          }
          chat.sendMessage(
            JSON.stringify({
              message_type: 'join_room',
              payload: { room_name: roomName },
            }),
            []
          );
          currentRoomName = roomName;
          clearMessages();
        }

        document.getElementById('roomList').onclick = (e) => {
          var target = e.target;
          if (target.tagName === 'LI') {
            var roomName = target.innerText;
            joinRoom(roomName);
          }
        };

        function send() {
          var message = messageBox.value;
          if (!message) {
            return;
          }
          messageBox.value = '';

          chat.sendMessage(
            JSON.stringify({
              message_type: 'send_message',
              payload: { room_name: currentRoomName, message: message },
            })
          );
        }
        sendBtn.onclick = send;
        messageBox.onkeydown = (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            send();
          }
        };

        document.getElementById('create').onclick = (e) => {
          var roomName = prompt('Enter a room name', '');
          if (roomName) {
            joinRoom(roomName);
          }
        };
      })();
    </script>
  </body>
</html>
```

</details>

<!--TODO: fill in
## Related documentation
-->

<!-- TODO: Fill out this section -->
