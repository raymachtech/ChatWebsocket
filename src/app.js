"use strict";

const app = require('express')();
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
// const WebSocket = require('ws');
const { randomUUID } = require('crypto');

const server = createServer(app);
const wss = new WebSocketServer({server});

const DbInstance = require("./db.js");
const chatRoom = require("./chatRoom.js");

DbInstance.connect();

const {
  userInfo,addTopic,getTopic,softDeleteTopic,getComment,userInvite,getUserList,
  getInvitedUserList
} = require('./chatController.js');


app.get('/',(req,res)=>{ res.send("Welcome to websocket server")});

app.get('/userInfo',userInfo);
app.get('/addTopic',addTopic);
app.get('/softDeleteTopic',softDeleteTopic)
app.get('/getTopic',getTopic);
app.get('/getComment',getComment);
app.get('/userInvite',userInvite);
app.get('/getUserList',getUserList);
app.get('/getInvitedUserList',getInvitedUserList)


wss.on('connection', socket => {
    const uuid = randomUUID();
    socket.uuid = uuid;
    socket.send(`connected with id: ${uuid}`);
    console.log(`connected with id: ${uuid}`);
    // let data = {
    //   uuid: uuid,
    //   type: 'onConnect',
    //   message : 'Connected to server'
    // };
    // data = JSON.stringify(data);
    // console.log(data);
    // socket.send(data);

    socket.on('message',async  (dataReceived,isBinary) => {
      // console.log(JSON.parse(dataReceived.toString()).name);
      // let {topicId,userId,message} = JSON.parse(dataReceived.toString());

      chatRoom(JSON.parse(dataReceived.toString()),socket,wss);
      // console.log(1);
      // await insertComment({topicId,userId,message});

      // wss.clients.forEach(function each(client) {
      //   // if (client !== socket && client.readyState === WebSocket.OPEN) {
      //     client.send(dataReceived, { binary: isBinary });
      //   // }
      // });
        // const message = dataReceived
        // // const {uuid,type,message,roomId} = ;
        // socket.send(JSON.stringify({uuid,message}));
    });

    socket.on('close', () => {
      console.log(`connection closed: ${socket.uuid}`);
      // console.log(`room closed: ${socket.roomId}`);
      // destroy room
      // broadcast refresh room;
      
    });
  });

const PORT = 8070;
server.listen(PORT,()=> console.log(`listening to port ${PORT}`));
