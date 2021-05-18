const { Kafka } = require("kafkajs");
const log_data = require("./logs.json");
const topic_name = process.argv[2] || "Logs2";
const partition = process.argv[3] || 0;

createProducer();

async function createProducer() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_docker",
      brokers: ["kafka:9092"]
    });

    const producer = kafka.producer();
    console.log("producer.js Producer'a bağlanılıyor..");
    await producer.connect();
    console.log("producer.js Bağlantı başarılı.");

    let messages = log_data.map(item => {
        return {
          value: JSON.stringify(item),
          
        };
      });
  
      const message_result = await producer.send({
        topic: "Logs",
        messages: messages
      });
    console.log("producer.js Gonderim işlemi başarılıdır", JSON.stringify(message_result));
    await producer.disconnect();
  } catch (error) {
    console.log("producer.js Bir Hata Oluştu", error);
   }// finally {
  //   process.exit(0);
  // }
  
}
