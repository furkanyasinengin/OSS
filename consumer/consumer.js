const { Kafka } = require("kafkajs");

const topic_name = "Logs";

createConsumer();

async function createConsumer() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_docker",
      brokers: ["kafka:9092"]
    });

    const consumer = kafka.consumer({
      groupId: "ornek"
    });

    console.log("consumer.js Connecting...");
    await consumer.connect();
    console.log("consumer.js Bağlantı başarılı.");

    await consumer.subscribe({
      topic: topic_name,
      fromBeginning: true
    });

    await consumer.run({
      eachMessage: async result => {
        console.log(
          `Gelen Mesaj ${result.message.value}`
        );
      }
    });
  } catch (error) {
    console.log("consumer.js Bir Hata Oluştu", error);
  }
}
