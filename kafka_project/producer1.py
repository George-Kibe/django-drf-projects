from time import sleep
from json import dumps
from kafka import KafkaProducer

topic_name = 'demo_testing'
producer = KafkaProducer(bootstrap_servers=['localhost:9092'], value_serializer=lambda x: dumps(x).encode('utf-8'))

data1 = {'name': 'John', 'age': 30, 'city': 'New York'}
data2 = {'name': 'Alex', 'age': 45, 'city': 'Brisbane'}
data3 = {'name': 'george', 'age': 26, 'city': 'Nairobi'}

# for e in range(1000):
#     data = {'number': e, 'name': 'John', 'age': 30, 'city': 'New York'}
#     producer.send(topic_name, value=data1, partition=1)
#     sleep(2)
    
#producer.send(topic_name, value=data1, partition=0)
producer.send(topic_name, value=data2, partition=0)
# producer.send(topic_name, value=data3, partition=0)
print("Done")