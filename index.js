require('dotenv').config()
const express = require('express')
const servidor = express()

const http = require('http').Server(servidor)
const io = require('socket.io')(http)

servidor.set('view engine', 'ejs')

servidor.get('/', (req, res) => {
    res.render('home')
})

io.on('connection', (socket) => {
    console.log('Alguem se conectou', socket.id)
    socket.on('chat_message', (msg) => {
        io.emit('chat_message', msg)
    })
})

http.listen(process.env.SERVER_PORT, () => {
    console.log(`Subiu o servidor na porta: ${process.env.SERVER_PORT}`)
})