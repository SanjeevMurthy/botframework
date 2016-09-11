var express=require('express');
var builder=require('botbuilder');

var app=express();
app.listen(3030,function(){
    console.log('App running on port 3030');
});

//Create Chat bot
var connector=new builder.ChatConnector({
    appId:'917fa15f-e5ca-4c90-94d7-5bfea9899934',
    appPassword:'4mZRfjAq253ZGrVkAFozJ4E'
});

var bot=new builder.UniversalBot(connector);
var intents=new builder.IntentDialog();


app.post('/api/messages',connector.listen());
bot.dialog('/',intents);

intents.matches(/^change name/i, [
    function (session) {
        session.beginDialog('/profile');
    },
    function (session, results) {
        session.send('Ok... Changed your name to %s', session.userData.name);
    }
]);

intents.onDefault([
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    function (session, results) {
        session.send('Hello %s!', session.userData.name);
    }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);