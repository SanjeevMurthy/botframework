var builder = require('botbuilder');

// Create bot and bind to console
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

var model='https://api.projectoxford.ai/luis/v1/application?id=c413b2ef-382c-45bd-8ff0-f76d60e2a821&subscription-key=2a310f5fd0a6462a82916afb0ab8fbb3&q=';
var recognizer=new builder.LuisRecognizer(model);
var dialog=new builder.IntentDialog({recognizers:[recognizer]});

bot.dialog('/',dialog);

// Add intent handlers
// dialog.matches('builtin.intent.alarm.set_alarm',builder.DialogAction.send('Creating Alarm'));
// dialog.matches('builtin.intent.alarm.delete_alarm',builder.DialogAction.send('Deleting Alarm'));
// dialog.onDefault(builder.DialogAction.send('Sorry!! I didnt understand !!'));.

dialog.matches('builtin.intent.alarm.set_alarm',[
    function(session,args,next){
        //resolve and store any entities sent from Luis
        var title=builder.EntityRecognizer.findEntity(args.entities,'builtin.alarm.title');
        var time=builder.EntityRecognizer.resolveTime(args.entities);
        var alarm=session.dialogData.alarm ={
            title:title ? title.entity:null,
            timestamp:time ? time.getTime() : null 
        };

        //prompt for title
        if(!alarm.title){
            builder.Prompts.text(session,'What would you like to call your alarm ?');
        }else{
            next();
        }
    },
    function(session,results,next){
        var alarm=session.dialogData.alarm;
        if(results.response){
            alarm.title=results.response;
        }
        //promt for time
        if(alarm.title && !alarm.timestamp){
            builder.Prompts.time(session,'What time would you like to set the alarm for ?');
        }else{
            next();
        }
    },
    function(session,results){
        var alarm=session.dialogData.alarm;
        if(results.response){
            var time=builder.EntityRecognizer.resolveTime([results.response]);
            alarm.timestamp=time ? time.getTime() : null;
        }

        if(alarm.title && alarm.timestamp){
            //save address of who to notify and write to scheduler
            alarm.address=session.message.address;
            alarms[alarm.title]=alarm;

            //send confirmation to user
            var date=new Date(alarm.timestamp);
            var isAM=date.getHours() < 12;
            // session.send('Creating alarm named "%s" for %d%d%d%d:%02d%s',
            //                 alarm.title,
            //                 date.getMonth()+1,
            //                 date.getDate(),
            //                 date.getFullYear(),
            //                 isAM ? date.getHours():date.getHours()-12,
            //                 date.getMinutes(),
            //                 isAM ? 'am':'pm');
            session.send('Creating alarm named "%s" for %d/%d/%d %d:%02d%s',
                alarm.title,
                date.getMonth() + 1, date.getDate(), date.getFullYear(),
                isAM ? date.getHours() : date.getHours() - 12, date.getMinutes(), isAM ? 'am' : 'pm');
        }else{
            session.send('OK.. no problem !!');
        }
    }
]);

dialog.matches('builtin.intent.alarm.delete_alarm', [
    function (session, args, next) {
        // Resolve entities passed from LUIS.
        var title;
        var entity = builder.EntityRecognizer.findEntity(args.entities, 'builtin.alarm.title');
        if (entity) {
            // Verify its in our set of alarms.
            title = builder.EntityRecognizer.findBestMatch(alarms, entity.entity);
        }
        
        // Prompt for alarm name
        if (!title) {
            builder.Prompts.choice(session, 'Which alarm would you like to delete?', alarms);
        } else {
            next({ response: title });
        }
    },
    function (session, results) {
        // If response is null the user canceled the task
        if (results.response) {
            delete alarms[results.response.entity];
            session.send("Deleted the '%s' alarm.", results.response.entity);
        } else {
            session.send('Ok... no problem.');
        }
    }
]);

dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand. I can only create & delete alarms."));

// Very simple alarm scheduler
var alarms = {};
setInterval(function () {
    var now = new Date().getTime();
    for (var key in alarms) {
        var alarm = alarms[key];
        if (now >= alarm.timestamp) {
            var msg = new builder.Message()
                .address(alarm.address)
                .text("Here's your '%s' alarm.", alarm.title);
            bot.send(msg);
            delete alarms[key];
        }
    }
}, 15000);
