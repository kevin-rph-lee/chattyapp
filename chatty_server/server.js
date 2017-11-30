// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid/v4');
let numberUsers = 0;
const clients = [];



// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });




// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.push(ws);

  //Sending a message to update user count
  clients.forEach((client) => {
      if (client.readyState == ws.OPEN) {
        client.send(JSON.stringify({type: "userCountUpdate", count: wss.clients.size}));
      }
  });


  ws.on('message', function incoming(data) {

    const message = JSON.parse(data);

    //Adding ID number
    message['id'] = uuid();
    if (message['type'] === 'postMessage'){
      message['type'] = 'incomingMessage';
    } else if (message['type'] === 'postNotification'){
      message['type'] = 'incomingNotification';
    } else {
      message['type'] = 'ERROR!';
    }

    //Sending message back
    clients.forEach((client) => {
      if (client.readyState == ws.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  });



  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', function(){
    console.log('Client disconnected');
    //Sending message to update the user count
    clients.forEach((client) => {
      if (client.readyState == ws.OPEN) {
        client.send(JSON.stringify({type: "userCountUpdate", count: wss.clients.size}));
      }
    });
  });
});