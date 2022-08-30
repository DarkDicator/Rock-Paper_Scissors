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

let player1 = {}
let player2 = {}

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
    socket.on('action', (action, id) => {            
        if(player1.id === id){
            player1.action = action
        }else{
            player2.action = action
        }
        if(player1.action && player2.action){
            const winner = rps(player1.action, player2.action)
            console.log(winner)
            io.emit('winner', winner)        
        }
        
    })

    socket.on('join-create', async (room) => {
        socket.join(room)
        //console.log(socket)
        const roster = (await io.in(room).fetchSockets()).map(socket => socket.id)
        if(roster.length == 2) io.to(room).emit('ready')
        console.log(roster)

        // if(player1.id){
        //     player2.id = id
        // }else{
        //     player1.id = id
        // }
        // console.log(player1.id)
        // console.log(player2.id)
    })
    
})


