import { createClient } from 'redis';

const client = createClient({
    password: 'C2ND8qdWZstRhEuASTjiAp58m0R3bZJw',
    socket: {
        host: 'redis-11847.c56.east-us.azure.redns.redis-cloud.com',
        port: 11847
    }
});

console.log("yeah")


client.on('error', (err) => console.log(err))

if (!client.isOpen) {
    client.connect()
    console.log("yeah")
}

export { client }