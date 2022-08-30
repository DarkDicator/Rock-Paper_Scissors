const io = require('socket.io')(4000, {
    cors: {
        origin: ['http://localhost:3000']
    }
})

function rps(p1, p2){
    if(p1 == p2) return "Draw"
    if(p1 == "Rock") return p2 == "Scissors" ? "Player 1 wins" : "Player 2 wins"
    if(p1 == "Paper") return p2 == "Rock" ? "Player 1 wins" : "Player 2 wins"
    if(p1 == "Scissors") return p2 == "Paper" ? "Player 1 wins" : "Player 2 wins"
}

let rooms = []

io.on('connection', socket => {
    console.log(socket.id)
    
    socket.on('join', () => {
        io.emit('join-game')
    })
    // async function users(){
    //     const clients = (await io.fetchSockets()).map(socket => socket.id)
    //     if (clients.length == 2){
    //         console.log("game start")
    //         io.emit('game-start')
    //     }
    // }    
    // users()
    socket.on('action', (action, player, roomId) => {
        currentRoom = rooms[rooms.findIndex(room => room.roomId === roomId)]
        console.log(currentRoom)
        if(player == "Player1"){
            currentRoom.player1Action = action
            console.log(currentRoom)
        }else{
            currentRoom.player2Action = action
            console.log(currentRoom)    
        }    
        
        if(currentRoom.player1Action && currentRoom.player2Action){
            console.log(rps(currentRoom.player1Action, currentRoom.player2Action))
            io.to(roomId).emit('winner', rps(currentRoom.player1Action, currentRoom.player2Action))
            delete currentRoom.player1Action
            delete currentRoom.player2Action
        }
        
        
        
    })

    socket.on('join-create', async (room) => {
        socket.join(room)
        //console.log(socket)
        const roster = (await io.in(room).fetchSockets()).map(socket => socket.id)
        if(roster.length == 2){
            io.to(socket.id).emit('player2')
            io.to(room).emit('ready')
            const roomObject = {
                roomId: room,
                player1: roster[0],
                player2: roster[1]
            }
            rooms.push(roomObject)            
            console.log(rooms.findIndex(i => i.roomId === room))
        }else{
            io.to(room).emit('player1')
        }       

        // if(player1.id){
        //     player2.id = id
        // }else{
        //     player1.id = id
        // }
        // console.log(player1.id)
        // console.log(player2.id)
    })
    
})


