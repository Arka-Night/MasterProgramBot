const Discord = require('discord.js');
const Functions = require('./Functions.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;

console.log(Functions)

client.on('ready', () => {
  console.log(`Logado como ${client.user.tag}!, seu servidor tem ${client.users.array().length} usuários`);
});

client.on('message', msg => {
  txc = msg.channel;
  cmd = msg.content;
  user = msg.author.username;
  author = msg.author;
  let responseObject = {
    '!Mligado': "Estou ligado!",

  }

  if (user === "MasterBotProgram" && cmd.indexOf('Você não pode usar comandos aqui, use no chat "comandos-bot"') > -1) {
    mseg.delete(5000);

  }else if (!(user === "MasterBotProgram") && (txc.name === 'comandos-bot' || msg.member.permissions.has("ADMINISTRATOR"))) {
    if (cmd.startsWith("!M")){
      if (responseObject[cmd]) {
        txc.send(responseObject[cmd])

      }else if (cmd.startsWith('!Mmanda')) {
        txc.send(Functions.manda(cmd, user));

      }else if (cmd.startsWith('!Mkick')) {
        Functions.kick(msg);

      }else if (cmd.startsWith('!Mhelp')) {
        txc.send(Functions.help(author));

      }else {
        txc.send(Functions.help(author));

      }

    }


  }else if (!(user === "MasterBotProgram") && (txc.name !== 'comandos-bot' && cmd.slice(0, 2) === '!M' && !(msg.member.permissions.has("ADMINISTRATOR")))) {
    msg.delete();
    txc.send('Você não pode usar comandos aqui, use no chat "comandos-bot", ' + msg.author);

  }

});

client.login(TOKEN);
