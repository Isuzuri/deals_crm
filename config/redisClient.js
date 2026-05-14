const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

const connect = async () => {
  try {
    await client.connect();
    console.log("Redis connected");
  } catch (err) {
    console.error("Redis connection failed:", err);
  }
};

connect();

module.exports = client;
