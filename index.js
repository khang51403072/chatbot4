import { METHODS } from 'http';

'use strict'
let token = "EAADNmxtKabABAPp5k21aV6VQZAQNK7DLO0HMC8wLxQrLZBXCUJZC8nlFFITVCxEf8uPNEY3FqfZBs2KgTq6HgpsFZC2rt4z6mI43AT2NPHIASQD9wjcAD8272NccKLBYxPhTK3PcXs0BU4nvQg19ZCdGAxd1jByKxoZAml4nyl07gZDZD"
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.get('/', function(req, res){
    res.send("Hi iam chat bot")
})


//facebook

app.get('/webhook', function(req,res){
    if(req.query['hub.verify_token'] === 'blondiebytes'){
        res.send(req.query['hub.challenge'])
    }
    res.send("Wrong token")
})


app.post('/webhook/',function(req,res){
    let messaging_events = req.body.entry[0].messaging
    for(let i =0; i< messaging_events.length;i++){
        let event = messaging_events[i]
        let sender = event.sender.id
        if(event.message && event.message.text){
            let text  = event.message.text
            sendText(sender, "Test echo: " + text.substring(0,100))

        }
    }
    res.sendStatus(200)
})
function sendText(sender, text)
{
    let messageData = {text:text}
    request({
        url: "https://graph.facebook.com/v2.6/messages"
        qs: {access_token: token}
        METHODS: "POST"
        json: {
            recipient: {id,sender},
            message: messageData
      }, function(error, respone, body){
          if(error){
              console.log("sending error")
          }else if (respone.body.error)
          {
              console.log("respone body error")
          }

      }
      })
}
app.listen(app.get('port'),function(){
    console.log("running: port")
})