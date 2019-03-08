var express = require('express')
var  app = express()
var server = require('http').createServer(app);
 var port = process.env.PORT || 5000;



 console.log(`Listening on ${ port }`)







 
//set the template engine ejs
app.set('view engine', 'php')

//middlewares
app.use(express.static('pu2'))


//routes
app.get('/', (req, res) => {
	res.render('index.php')
})

//Listen on port 3000
server = app.listen(port)




//socket.io instantiation


var io = require("socket.io")(server)

//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('connectedUser', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('msg', (data) => {
        //broadcast the new message
        io.sockets.emit('msg', {cmd : data.cmd, data: data.data});
    })

    //listen on typing
    socket.on('re', (data) => {
    	io.sockets.emit('re', {token : data.token})
    })
	
	
	socket.on('msg', (data) => {
    	io.sockets.emit('msg', {e: data.e})
    })
	
})
