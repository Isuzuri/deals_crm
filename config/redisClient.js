const { createClient } = require("redis");

const client = createClient({
    url: 'redis://localhost:6379'
})

client.on('error', (err) => console.error('Redis error: ', err))

const connect = async () => {
    await client.connect()
    console.log('Redis connected')
}

connect()

module.exports = client;
