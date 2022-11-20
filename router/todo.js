const express=require("express");
const path = require("path");
const db=require("../data/database");
const mongodb = require("mongodb");
const { request } = require("http");
const { response } = require("express");
const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get("/",async (request,response)=>{
    const data=await db.getDb().collection("tasks").find().toArray();
    response.render("index",{datas:data});
});

router.post("/",async (request,response)=>{

    const task = request.body.todo;

    const newTask={
        task: task,
        date: new Date()
    };

    const data = await db.getDb().collection("tasks").insertOne(newTask);

    response.redirect("/");
});

router.get("/data/:id/edit",async(request,response)=>{

    const dataId = new ObjectId(request.params.id);
    const data=await db.getDb().collection("tasks").findOne({_id:dataId});

    response.render("edit",{id:dataId,taskPrev:data});
});

router.post("/data/:id/update",async (request,response)=>{

    const dataId = new ObjectId(request.params.id);
    const dataUpdate=await db.getDb().collection("tasks").updateOne({_id:dataId},{$set:{task:request.body.todo}});

    response.redirect("/");
});

router.get("/data/:id/delete",async (request,response)=>{

    const dataId = new ObjectId(request.params.id);
    const dataResult= db.getDb().collection("tasks").deleteOne({_id: dataId});

    response.redirect("/");
});

router.get("/data/:id/view",async(request,response)=>{
    
    const dataId = new ObjectId(request.params.id);
    const data=await db.getDb().collection("tasks").findOne({_id:dataId});

    data.humanReadableDate = data.date.toLocaleDateString("en-US",{
        year:"numeric",
        day:"numeric",
        month:"long",
        weekday:"long"
    });

    data.date=data.date.toISOString();

    response.render("view",{data:data});
});

module.exports=router;