"use strict";
const DBInstance = require("./db.js");

module.exports = {

    async userInfo(req,res,next){
        try { 
            const { email} =req.query;
            const {sql,pool} = DBInstance.connection();
            let result = await pool.request()
                    .input('Email', sql.VarChar, email)
                    .execute('CrewMachCommunity.dbo.usp_GetUserInfo');
            // console.dir(result);
            let response = result.recordsets[0];
            res.status(200).send({response});
        } catch (error) {
            console.log(error);
        }
    },
    async addTopic(req,res,next){
        try { 
            const { userId, topicName, subtopic,isPrivate} =req.query;
            const {sql,pool} = DBInstance.connection();
            let result = await pool.request()
                    .input('UserId', sql.Int, userId)
                    .input('TopicName', sql.VarChar, topicName)
                    .input('TopicSubName', sql.VarChar, subtopic)
                    .input('IsPrivate', sql.Bit, isPrivate)
                    .execute('CrewMachCommunity.dbo.usp_Topic_Insert');
            // console.dir(result);
            let response = result.recordsets[0];
            res.status(200).send({response});
        } catch (error) {
            console.log(error);
        }
    },
    
    async softDeleteTopic(req,res,next){
        try { 
            const { userId, topicId} =req.query;
            const {sql,pool} = DBInstance.connection();
            let result = await pool.request()
                    .input('UserId', sql.Int, userId)
                    .input('TopicId', sql.Int, topicId)
                    .execute('CrewMachCommunity.dbo.usp_Delete_Topic');
            // console.dir(result);
            let response = result.recordsets[0];
            res.status(200).send({response});
        } catch (error) {
            console.log(error);
        }
    },
    
    async getTopic(req,res,next){
        try { 
            const { userId } =req.query;
            const {sql,pool} = DBInstance.connection();
            let result = await pool.request()
                    .input('UserId', sql.Int, userId)
                    .execute('CrewMachCommunity.dbo.usp_Get_TopicList');
            // console.dir(result);
            let response = result.recordsets[0];
            res.status(200).send({response});
        } catch (error) {
            console.log(error);
        }
    },

    async getComment(req,res,next){
        try { 
            const { topicId } =req.query;
            const {sql,pool} = DBInstance.connection();
            let result = await pool.request()
                    .input('TopicId', sql.Int, topicId)
                    .execute('CrewMachCommunity.dbo.usp_GetChatHistory');
            // console.dir(result);
            let response = result.recordsets[0];
            res.status(200).send({response});
        } catch (error) {
            console.log(error);
        }
    },

    async insertComment({topicId,userId,message}){
        try { 
            const {sql,pool} = DBInstance.connection();
            let result = await pool.request()
                    .input('TopicId', sql.Int, topicId)
                    .input('UserId', sql.Int, userId)
                    .input('Message', sql.Text, message)
                    .execute('CrewMachCommunity.dbo.usp_MessageHistory_Insert');
            // console.dir(result);
            console.log("comment Inserted");
        } catch (error) {
            console.log(error);
        }
    },
    async userInvite(req,res,next){
        try { 
            const { userIds, topicId} =req.query;
            const {sql,pool} = DBInstance.connection();
            let result = await pool.request()
                    .input('UserID', sql.VarChar, userIds)
                    .input('TopicId', sql.VarChar, topicId)
                    .input('ISActive', sql.Bit, 1)
                    .execute('CrewMachCommunity.dbo.GetMultipleUserValue');
            // console.dir(result);
            let response = result.recordsets[0];
            res.status(200).send({response});
        } catch (error) {
            console.log(error);
        }
    },
    async getUserList(req,res,next){
        try { 
            const {sql,pool} = DBInstance.connection();
            const { userId } = req.query;
            let result = await pool.request()
            .input('UserId', sql.Int, userId)
                    .execute('CrewMachCommunity.dbo.usp_GetUserList');
            // console.dir(result);
            let response = result.recordsets[0];
            res.status(200).send({response});
        } catch (error) {
            console.log(error);
        }
    },
    async getUserTopics({userId}){
        try { 
            console.log("r2")
            const {sql,pool} = DBInstance.connection();
            let result = await pool.request()
                    .input('UserId', sql.Int, userId)
                    .execute('CrewMachCommunity.dbo.usp_GetTopicID');
            
            let response = result.recordsets[0];
            console.dir(response);
            return response;
            // res.status(200).send({response});
        } catch (error) {
            console.log(error);
        }
    },


};