require('dotenv').config();

// Init Token
const {Client} = require('discord.js');
const client = new Client();
const axios = require('axios');
const moment = require('moment');
client.login(process.env.DISCORDJS_BOT_TOKEN)

// Command
const PREFIX = "#";

let url = 'https://covid19.mathdro.id/api/countries/ID';
let github = 'https://github.com/fiqryq';
let avatar = 'freepik';

client.on('ready', () =>{
    console.log(`${client.user.tag} has logged in`);
})

// Convert to number format
function numberFormat(number){
    return number.toLocaleString("id-ID");
}

// convert date format using moment
function convertStrDateToPattern(strDate , pattern, local){
    return moment(strDate).locale(local).format(pattern);
}

// what the fuck is this? i still code on response axioss wew.
async function getResponse() {
    try {
      const response = await axios.get(url);
      
        client.on('message',(message) => {
            if(message.author.bot) return;
            if(message.content.startsWith(PREFIX)){
                const CMD_NAME = message.content.substring(PREFIX.length);
                if (CMD_NAME === 'info'){
                    message.channel
                    .send('## Bot Info ##\n'
                    + 'Basic Command : \n' 
                    + '#info : untuk melihat info bot \n'
                    + '#positif : untuk melihat total kasus positif di indonesia \n'
                    + '#sembuh : untuk melihat total kasus sembuh di indonesia \n' 
                    + '#meninggal : untuk melihat total kasus meninggal di indonesia \n'
                    + '#kasus : untuk melihat total kasus corona indonesia \n'
                    + '--------------------------------------------------------------- \n' 
                    + 'Devloper bot : Fiqry choerudin \n'
                    + 'github : ' + github + '\n'
                    + 'avatar : ' + avatar + '\n'
                    + 'Data covid : ' + url);
                }
                if (CMD_NAME === 'positif'){
                    message.channel.send('🟡 Total kasus positif Indonesia : ' 
                    + numberFormat(response.data.confirmed.value))
                }
                if (CMD_NAME === 'sembuh'){
                    message.channel.send('🟢 Total kasus sembuh Indonesia : ' 
                    + numberFormat(response.data.recovered.value))
                }
                if(CMD_NAME === 'meninggal'){
                    message.channel.send('🔴 Total kasus meninggal Indonesia : ' 
                    + numberFormat(response.data.deaths.value))
                }
                if(CMD_NAME === 'kasus'){
                    message.channel
                    .send('⏱️ Update Kasus '
                    + convertStrDateToPattern(response.data.lastUpdate,'LLLL ','id-ID') + '\n'
                    + 'Total kasus positif Indonesia   : ' + numberFormat(response.data.confirmed.value) + '\n'
                    + 'Total kasus sembuh Indonesia    : ' + numberFormat(response.data.recovered.value) + '\n'
                    + 'Total kasus meninggal Indonesia : ' + numberFormat(response.data.deaths.value))
                }
            } 
        })

    } catch (error) {
      console.error(error);
    }
  }

getResponse();

