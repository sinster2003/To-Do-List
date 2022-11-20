const express=require("express");
const path = require("path");
const db=require("./data/database");
const mongodb = require("mongodb");
const { request } = require("http");
const { response } = require("express");
const ObjectId = mongodb.ObjectId;
const todoRoutes=require("./router/todo");

const app=express();

app.use(express.urlencoded({extended:false}));

app.use(express.static("public"));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(todoRoutes);

db.getConnection().then(
    app.listen(3000)
);