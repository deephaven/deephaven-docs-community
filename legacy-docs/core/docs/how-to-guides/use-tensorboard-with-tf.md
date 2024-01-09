---
id: use-tensorboard-with-tf
title: How to use TensorBoard with Deephaven and TensorFlow
sidebar_label: Use TensorBoard with Deephaven and TensorFlow
---

This guide will show you how to use [TensorBoard](https://www.tensorflow.org/tensorboard) and [TensorFlow](https://www.tensorflow.org/) in Deephaven queries.

[TensorBoard](https://www.tensorflow.org/tensorboard) is one of the most useful tools you can use when training deep neural networks. Many consider the neural network to be a black box; TensorBoard gives insight into your neural network and helps you understand how to improve your model. TensorBoard can track your experiment metrics like loss and accuracy, visualize the model’s architecture, check model weights and biases, profile your model to see its performance, help tune hyperparameters, project embeddings to a lower dimensional space, and much more.

Don't sweat: using TensorBoard with Deephaven's powerful table engine is very easy and requires just a couple of lines of code!

In our example, we will be using one of the pre-built Deephaven Docker images: [Python with TensorFlow](https://raw.githubusercontent.com/deephaven/deephaven-core/main/containers/python-examples/TensorFlow/docker-compose.yml). If you need detailed instructions on how to launch Deephaven from pre-built images, please see [this guide](https://deephaven.io/core/docs/tutorials/quickstart/#choose-a-deployment).

## Classification example

We will classify the Iris dataset with Deephaven tables and use the same Keras neural network we built in [our TensorFlow tutorial](https://deephaven.io/core/docs/how-to-guides/use-tensorflow/#classify-the-iris-dataset-with-deephaven-tables). We will only need to add a few lines of code to enable TensorBoard!

First, we have to set a log directory. This is where TensorBoard will store the logs. It will read these logs to show various visualizations:

```python skip-test
log_dir = "tensorboard_logs"
os.system("mkdir '{}'".format(logdir))
```

Second, we need to run TensorBoard and provide the log directory and port number:

```python skip-test
os.system("tensorboard --logdir='{}' --port 6006 --bind_all &".format(log_dir))
```

After that, your TensorBoard dashboard will be available via the browser using the following URL:
[http://localhost:6006](http://localhost:6006)

The TensorBoard dashboard is not active yet. To have some meaningful information in it, we need to specify the TensorBoard callback during the model’s fit method. The TensorBoard callback is just an object that will allow us to write to Tensorboard logs after every epoch:

```python skip-test
from tensorflow.keras.callbacks import TensorBoard

tensorboard_callback = TensorBoard(log_dir=log_dir,
                                   histogram_freq=1,
                                   write_graph=True,
                                   write_images=True,
                                   update_freq='epoch',
                                   profile_batch=2,
                                   embeddings_freq=1)
```

The final step is to pass the callback to the function that trains the model:

```python skip-test
def train_model(X_train, Y_train):
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.01), loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True), metrics=["accuracy"])
    model.fit(x=X_train, y=Y_train, epochs=20, callbacks=[tensorboard_callback])
```

So the complete script looks like this:

```python skip-test
import os

# Set up the name of the log directory and run TensorBoard using port 6006
log_dir = "tensorboard_logs"
os.system("mkdir '{}'".format(logdir))
os.system("tensorboard --logdir='{}' --port 6006 --bind_all &".format(log_dir))


# Deephaven imports
from deephaven import DynamicTableWriter
import deephaven.dtypes as dht
from deephaven.learn import gather
from deephaven import read_csv
from deephaven import learn

# Machine learning imports
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.callbacks import TensorBoard

# Additional required imports
import numpy as np
import random, threading, time

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

# Our neural network
model = Sequential()
model.add(Dense(16, input_shape=(4,), activation=tf.nn.relu))
model.add(Dense(12, activation=tf.nn.relu))
model.add(Dense(3, activation=tf.nn.softmax))

# Create the TensorBoard callback
tensorboard_callback = TensorBoard(log_dir=log_dir,
                                   histogram_freq=1,
                                   write_graph=True,
                                   write_images=True,
                                   update_freq='epoch',
                                   profile_batch=2,
                                   embeddings_freq=1)


# A function that trains the model with tensorboard_callback passed as a parameter
def train_model(X_train, Y_train):
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.01), loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True), metrics=["accuracy"])
    model.fit(x=X_train, y=Y_train, epochs=20, callbacks=[tensorboard_callback])

# A function that gets the model's predictions on input data
def predict_with_model(features):
    if features.ndim == 1:
        features = np.expand_dims(features, 0)
    predictions = model.predict(features)
    return [np.argmax(item) for item in predictions]


# A function to gather data from table columns into a NumPy array of doubles
def table_to_array_double(rows, cols):
    return gather.table_to_numpy_2d(rows, cols, np_type=np.double)

# A function to gather data from table columns into a NumPy array of integers
def table_to_array_int(rows, cols):
    return gather.table_to_numpy_2d(rows, cols, np_type=np.intc)

# A function to extract a list element at a given index
def get_predicted_class(data, idx):
    return data[idx]

# Use the learn function to train our neural network
learn.learn(
    table=iris,
    model_func=train_model,
    inputs=[learn.Input(["SepalLengthCM", "SepalWidthCM", "PetalLengthCM", "PetalWidthCM"], table_to_array_double), learn.Input(["Class"], table_to_array_int)],
    outputs=None,
    batch_size=150
)

# Use the learn function to create a new table that contains predicted values
iris_predicted_static = learn.learn(
    table=iris,
    model_func=predict_with_model,
    inputs=[learn.Input(["SepalLengthCM", "SepalWidthCM", "PetalLengthCM", "PetalWidthCM"], table_to_array_double)],
    outputs=[learn.Output("PredictedClass", get_predicted_class, "int")],
    batch_size=150
)
```

After training the model, you can open the Tensorboard dashboard with [http://localhost:6006](http://localhost:6006) and explore the gathered data.
The Scalars tab shows changes in the loss and metrics over the epochs. It can be used to track other scalar values such as learning rate and training speed:

![img](../assets/how-to/tensorboard-scalars-tf.png)

The Graphs tab shows your model’s layers. You can use this to check if the architecture of the model looks as intended.

![img](../assets/how-to/tensorboard-graphs-tf.png)

You can also use TensorBoard to check the distribution of the weights and biases over each epoch, visualize any vector representation (e.g., word embeddings and images), track the performance of every TensorFlow operation that has been executed, monitor hyperparameters and other cool things!

Hopefully, this will help you monitor and debug your training runs and ultimately build better models!

## Related documentation

- [How to install Python packages](./install-python-packages.md)
- [How to use deephaven.learn](./use-deephaven-learn.md)
- [How to use Python packages](./use-python-packages.md)
- [How to use TensorFlow](./use-tensorflow.md)
- [How to use PyTorch](./use-pytorch.md)
- [How to use TensorBoard with Deephaven and PyTorch](./use-tensorboard-with-pytorch.md)
- [How to use SciKit-Learn](./use-scikit-learn.md)
- [How to use variables and functions in query strings](./query-scope-how-to.md)
- [How to write data to an in-memory, real-time table](./dynamic-table-writer.md)
