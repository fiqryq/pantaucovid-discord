require('dotenv').config();

// Init Token
const {Client} = require('discord.js');
const client = new Client();
const axios = require('axios');
client.login(process.env.DISCORDJS_BOT_TOKEN)

// Command
const PREFIX = "/";

var positif = null;
let url = 'https://covid19.mathdro.id/api/countries/ID';

async function getUser() {
    try {
      const response = await axios.get(url);
      this.positif = response.data.confirmed.value;
    } catch (error) {
      console.error(error);
    }
  }

getUser();

client.on('ready', () =>{
    console.log(`${client.user.tag} has logged in`);
})

client.on('message',(message) => {
   if(message.author.bot) return;
   if(message.content.startsWith(PREFIX)){
       const CMD_NAME = message.content.substring(PREFIX.length);
       if (CMD_NAME === 'info'){
           message.reply('kasus : ', positif)
       }
   }
})