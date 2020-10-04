const fs = require("fs");
const botConfig = require("./botconfig.json");
const config = require("./config.json");
const Logger = require("./helpers/logger");
const Discord = require("discord.js");
const client = new Discord.Client();
//Create commands collection
client.commands = new Discord.Collection();
//Get all command files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
//Setup Commands
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", async () => {
    console.log(`${client.user.username} is now online.`);
});

client.login(botConfig.token).then();

client.on('message', message => {
    //Check if its a command
    if(message.content.charAt(0) !== botConfig.prefix) return;
    //Get only the command arguments
    let args = message.content.substring(1).split(" ");

    if(args[0] === "test"){
        //
    }
    if(args[0] === "ban") client.commands.get('ban').execute(message, args);
    if(args[0] === "unban") client.commands.get('unban').execute(message, args);
    if(args[0] === "tempban") client.commands.get('tempban').execute(message, args);
    if(args[0] === "mute") client.commands.get('mute').execute(message, args);
    if(args[0] === "unmute") client.commands.get('unmute').execute(message, args);
})