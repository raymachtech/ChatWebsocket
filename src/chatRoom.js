"use strict";

const {getUserTopics,insertComment} = require("./chatController.js");

module.exports = (packetReceived, socket,wss)=>{
    console.log("received:", packetReceived);
    console.log(socket.uuid);
    // const { uuid } = socket;
    const { type,data } = packetReceived;
    switch (type) {
        case 'joinRoom':
            addToRoom(socket,data);
            break;
        case 'comment':
            receiveText(wss,data,packetReceived);
            break;
        default:
            console.log("unknown message received");
            console.log(packetReceived);
            break;
    }
};


let topicIdList = {};

async function addToRoom(socket,{userId}){
    // get all topicId in which user is subscribed
    // let userlist= {
    //     1:[4,5],
    //     2:[4,8]
    // };
    // let topicIds = userlist[userId]; //get from database
    let topics = await getUserTopics({userId});

    
    topics.forEach(topic => {
        console.log(topic.TopicID);
        let topicId = topic.TopicID;
        if(topicIdList[topicId]) topicIdList.push({userId,socket});
        else topicIdList[topicId] = [{userId,socket}];
    
    });
    console.log("topicroom");
    console.log(topicIdList);
    //then insert socket in all those topicId
}

async function receiveText(wss,data,packetReceived){
    const {userId,topicId,message,isPrivate} = data;
    insertComment({topicId, userId, message});
    if(isPrivate) broadcastToRoom(topicId, packetReceived);
    else broadcast(wss,packetReceived);
    // await insertComment({topicId,userId,message});

}

function broadcast(wss, data){
    wss.clients.forEach(function each(client) {
    //   // if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
    //   // }
    });
}

function broadcastToRoom(topicId,data){
    if(topicIdList[topicId]){
        topicIdList[topicId].forEach(user=>{
            const packet = JSON.stringify(data);
            user.socket.send(packet);
        });
    }
}