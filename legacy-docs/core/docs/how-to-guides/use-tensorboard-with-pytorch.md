---
id: use-tensorboard-with-pytorch
title: How to use TensorBoard with Deephaven and PyTorch
sidebar_label: Use TensorBoard with Deephaven and PyTorch
---

This guide will show you how to use [TensorBoard](https://www.tensorflow.org/tensorboard) and [PyTorch](https://pytorch.org/) in Deephaven queries.

[TensorBoard](https://www.tensorflow.org/tensorboard) is one of the most useful tools you can use when training deep neural networks. The neural network is considered a black box, but TensorBoard can shed some light on this box and help you understand how to improve your model. It can track your experiment metrics like loss and accuracy, visualize the model’s architecture, check model weights and biases, profile your model to see its performance, help tune hyperparameters, project embeddings to a lower-dimensional space, and much more. If the training time of your neural network is a couple of hours/days, you can watch updating statistics in a TensorBoard dashboard in real time, making it a natural pairing with Deephaven.

Don't sweat: using TensorBoard with Deephaven's powerful table engine is very easy and requires just a couple lines of code!

In our example, we will be using one of the pre-built Deephaven Docker images: [Python with PyTorch](https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples/PyTorch/docker-compose.yml). If you need detailed instructions on how to launch Deephaven from pre-built images, please see [this guide](https://deephaven.io/core/docs/tutorials/quickstart/#choose-a-deployment).

## Classification example

We will classify the Iris dataset with Deephaven tables and use the same Keras neural network we built in our [how-to use PyTorch guide](https://deephaven.io/core/docs/how-to-guides/use-pytorch/#classify-the-iris-dataset-with-deephaven-tables). We will only need to add a few lines of code to enable TensorBoard!

First, we need to create a `SummaryWriter` instance to log data for consumption and visualization by TensorBoard:

```python skip-test
from torch.utils.tensorboard import SummaryWriter
writer = SummaryWriter()
```

Writer will output to ./runs/ directory by default.

Second, we need to run TensorBoard and provide the log directory and port number:

```python skip-test
os.system("tensorboard --logdir='runs' --port 6006 --bind_all &".format(log_dir))
```

After that, your TensorBoard dashboard will be available via the browser using the following URL:
[http://localhost:6006](http://localhost:6006)

The TensorBoard dashboard is not active yet. To have some meaningful information in it, let's use our `SummaryWriter` to write the model evaluation features that we want; e.g. loss:

```python skip-test
writer.add_scalar("Loss/train", loss, epoch)
```

The complete script looks like this:

```python skip-test
import os

# Set up the name of the log directory and run TensorBoard using port 6006
log_dir = "tensorboard_logs"
os.system("tensorboard --logdir='{}' --port 6006 --bind_all &".format(log_dir))

# Deephaven imports
from deephaven import DynamicTableWriter
import deephaven.dtypes as dht
from deephaven.learn import gather
from deephaven import read_csv
from deephaven import learn

# Machine learning imports
import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.tensorboard import SummaryWriter

# Python imports
import numpy as np, random, threading, time


# Read and quantize the Iris dataset
iris_raw = read_csv("https://media.githubusercontent.com/media/deephaven/examples/main/Iris/csv/iris.csv")

classes = {}
num_classes = 0
def get_class_number(c) -> np.intc:
    global classes, num_classes
    if c not in classes:
        classes[c] = num_classes
        num_classes += 1
    return classes[c]

iris = iris_raw.update(formulas=["Class = get_class_number(Class)"])

# Our neural network class
class IrisANN(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(in_features=4, out_features=16)
        self.fc2 = nn.Linear(in_features=16, out_features=12)
        self.output = nn.Linear(in_features=12, out_features=3)

    def forward(self, x):
        x = x.float()
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.output(x)
        return x

# Create the neural network
model = IrisANN()

# SummaryWriter to log data for visualization by TensorBoard
writer = SummaryWriter(log_dir)

# A function that trains the model
def train_model(X_train, Y_train):
    global model
    # Set training parameters
    criterion = nn.CrossEntropyLoss()

    optimizer = torch.optim.Adam(model.parameters(), lr=0.01)
    epochs = 50

    loss_arr = []

    for i in range(epochs):
        Y_hat = model.forward(X_train)
        loss = criterion(Y_hat, Y_train.long())
        writer.add_scalar("Loss/train", loss, i)
        loss_arr.append(loss)

        if i % 10 == 0:
            print(f'Epoch: {i} Loss: {loss}')

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

# A function that gets the model's predictions from input data
def predict_with_model(features):
    if features.dim() == 1:
        features = torch.unsqueeze(features, 0)
    preds = []

    with torch.no_grad():
        for val in features:
            Y_hat = model.forward(val)
            preds.append(Y_hat.argmax().item())

    # Return the model's predictions
    return preds


# A function to gather data from table columns into a torch tensor of doubles
def table_to_tensor_double(rows, cols):
    return torch.from_numpy(gather.table_to_numpy_2d(rows, cols, np_type=np.double))

# A function to gather data from table columns into a torch tensor of integers
def table_to_tensor_int(rows, cols):
    return torch.from_numpy(np.squeeze(gather.table_to_numpy_2d(rows, cols, np_type=np.intc)))

# A function to extract a prediction and cast the value to an integer
def get_predicted_class(data, idx):
    return int(data[idx])


# Use the learn function to train our neural network
learn.learn(
    table=iris,
    model_func=train_model,
    inputs=[learn.Input(["SepalLengthCM", "SepalWidthCM", "PetalLengthCM", "PetalWidthCM"], table_to_tensor_double), learn.Input("Class", table_to_tensor_int)],
    outputs=None,
    batch_size=150
)

# Use the learn function to create a new table that contains predicted values
iris_predicted_static = learn.learn(
    table=iris,
    model_func=predict_with_model,
    inputs=[learn.Input(["SepalLengthCM", "SepalWidthCM", "PetalLengthCM", "PetalWidthCM"], table_to_tensor_double)],
    outputs=[learn.Output("PredictedClass", get_predicted_class, "int")],
    batch_size=150
)
```

After training the model, you can open the Tensorboard dashboard with [http://localhost:6006](http://localhost:6006) and see the results of your neutral networks training runs:

![img](../assets/how-to/tensorboard-scalars-pytorch.png)

You can also use TensorBoard to check the distribution of the weights and biases over each epoch, visualize any vector representation (e.g., word embeddings and images), track the performance of every TensorFlow operation that has been executed, monitor hyperparameters and other cool things!

Hopefully, this will help you monitor and debug your training runs and ultimately build better models!

## Related documentation

- [How to install Python packages](./install-python-packages.md)
- [How to use deephaven.learn](./use-deephaven-learn.md)
- [How to use Python packages](./use-python-packages.md)
- [How to use PyTorch](./use-pytorch.md)
- [How to use TensorFlow](./use-tensorflow.md)
- [How to use TensorBoard with Deephaven and TensorFlow](./use-tensorboard-with-tf.md)
- [How to use SciKit-Learn](./use-scikit-learn.md)
- [How to use variables and functions in query strings](./query-scope-how-to.md)
- [How to write data to an in-memory, real-time table](./dynamic-table-writer.md)
