var express = require('express');
var builder = require('botbuilder');

//var app=express();

// var connector = new builder.ChatConnector({
//   appId:'917fa15f-e5ca-4c90-94d7-5bfea9899934',
//   appPassword:' 4mZRfjAq253ZGrVkAFozJ4E'
// });

var connector=new builder.ConsoleConnector().listen();

var bot = new builder.UniversalBot(connector);


//app.post('/api/messages', connector.listen());


// bot.dialog('/', function (session) {
//     session.send("Hello World");
// });

bot.dialog('/',[
  function(session,args,next){
    if(!session.userData.name){
      session.beginDialog('/profile');
    }else{
      next();
    }
  },
  function(session,results){
    console.log(JSON.stringify(results));
    session.send('Hello %s!',session.userData.name);
  }
]);

bot.dialog('/profile',[
  function(session){
    builder.Prompts.text(session,'Hi ! What is your name ?');
  },
  function(session,results){
    session.userData.name=results.response;
    session.endDialog();
  }
]);




// app.listen(8080,function(){
//   console.log("App running on port 8080");
// });
