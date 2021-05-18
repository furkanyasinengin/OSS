const  {Kafka}  = require("kafkajs");

createTopic();

async function createTopic() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_docker",
      brokers: ["kafka:9092"]
    });

    const admin = kafka.admin();
    console.log("topic.js Connecting...");
    
    await admin.connect();
    console.log("topic.js Connected, topic creating..");
    
    await admin.createTopics({
      topics: [
        {
          topic: "Logs",
          numPartitions: 1
        }
      ]
    });
    console.log("topic.js Topic created...");
    await admin.disconnect();
  } 
  
  catch (error) {
    console.log("topic.js Error",error);
  } 
  // finally {
  //   process.exit(0);
  // }
}
