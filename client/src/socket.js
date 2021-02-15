import io from "socket.io-client"

const ENDPOINT = "localhost:4000"

const socket = io(ENDPOINT)

export {socket}