import http from "http"
import app from "./app.js"
import getServerPort from "./utils/getServerPort.js"

const server = http.createServer(app)

const PORT = getServerPort()

server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT} 😃`);
})