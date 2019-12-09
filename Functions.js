var Functions = {};
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

Functions.manda = function(msg, user) {
  var msgmod;

  if (user !== 'MasterBotProgram') {
    if (msg.length > 7 && msg.slice(8, 15) !== "!Mmanda") {
      msgmod = msg.slice(8);

    }else if (msg.slice(8) === ""){
      msgmod = "Não me madaram mandar nada";

    }else if (msg.length > 7 && msg.slice(8, 15) === "!Mmanda") {
      msgmod = "Achou que ia me enganar né? ACHOU ERRADO OTÁRIO";

    }

  }else {
    msgmod = "Achou que ia me enganar né? ACHOU ERRADO OTÁRIO";
  }

  return msgmod;
}

Functions.help = function(author) {
  author.send('Olá');
  author.send('Os comandos são: !Mmanda "Oque você quer mandar sem as aspas", !Mligado e !Mhelp');
  author.send('"!Mmanda": eu mando o que você escrever na frente');
  author.send('"!Mligado": eu falo "ligado", é bom para testar se estou funcionando no momento');
  author.send('"!Mkick"(comando de uso de administrador): eu chuto a bunda de alguém');
  author.send('"!Mban"(comando de uso de administrador): eu bano pessoas. (você pode colocar uma quantidade de dias de banimento)')
  author.send('"!Mhelp": eu mando os meus comandos e funcionalidades na sua DM');
  return author + ', enviei no seu pv os meus comandos.';


}

Functions.kick = function(msg) {
  const mseg = msg;
  if (mseg.member.permissions.has("ADMINISTRATOR")) {
    const user = mseg.mentions.users.first();

    if (user) {
      const member = mseg.guild.member(user);

      if (member && !(member.permissions.has("ADMINISTRATOR"))) {
        member.createDM().then((DMChannel) => {
          DMChannel.send(`Você foi kickado por ${mseg.author}`).then(() => {
            member.kick().then(() => {
              mseg.reply(`o usuário ${'@' + user.tag} foi kickado`);

            }).catch(err => {
              mseg.reply(`o usuário ${'@' + user.tag} não pode ser kickado`);

            });

          });
        });
      }
    }
  }else {
    mseg.reply('Você não é um administrador');

  }
}

Functions.ban = function(msg) {
  const mseg = msg;
  const days = msg.content.slice(6, 8);
  if (mseg.member.permissions.has("ADMINISTRATOR")) {
    const user = mseg.mentions.users.first();

    if (user) {
      const member = mseg.guild.member(user);

      if (member && !(member.permissions.has("ADMINISTRATOR"))) {
        member.createDM().then((DMChannel) => {
            if (parseInt(days) < 11) {
              DMChannel.send(`Você foi banido por ${mseg.author} por ${days} dias`).then(() => {
                member.ban(parseInt(days)).then(() => {
                  mseg.reply(`o usuário ${'@' + user.tag} foi banido por ${days} dias`);

                }).catch(err => {
                  mseg.reply(`o usuário ${'@' + user.tag} não pode ser banido`);

                });
              });
            }else {
              DMChannel.send(`Você foi banido por ${mseg.author}`).then(() => {
                member.ban().then(() => {
                  mseg.reply(`o usuário ${'@' + user.tag} foi banido`);

                }).catch(err => {
                  mseg.reply(`o usuário ${'@' + user.tag} não pode ser banido`);

                });
              });
            }
          });
        }else {
          mseg.reply('Você não é um administrador');
        }
      }
    }
  }



module.exports = Functions;
