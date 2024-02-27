## Kafka Concepts
1)Kafka cluster stores messages even if they were already consumed by one of the consumers.
2)Same messages may be read multiple times by different consumers.
3)Multiple consumers can read message from Kafka Topic in parallel.
4)Producers and consumers don't know about each other , they are just doing their own job , first producer don't know anything about the second producer or other consumers , same for other components.
5)Consumers don't care about the producers which has produced messages , they just consume messages.

## creating a topic
bin/kafka-topics.sh --create --topic demo_testing --bootstrap-server localhost:9092 --replication-factor 1 --partitions 4
NB: Whenever there are multiple partitions, consumption may not always happen in the same order

## replication factor represents number of brokers

## Reading messages from a consumer
bin/kafka-console-consumer.sh --topic hello_world  --from-beginning --bootstrap-server localhost:9092

## Reading messages from a consumer from a specific partition
bin/kafka-console-consumer.sh --topic hello_world  --from-beginning --bootstrap-server localhost:9092 --partition 2