import {Injectable, ProviderScope, ProviderType} from "@tsed/di";

@Injectable({
    type: ProviderType.SERVICE,
    scope: ProviderScope.SINGLETON
})
export class TwilioHelper {

     client;

    constructor() {
        this.client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    sendMessage(message:string, receiver:string){
        this.client.messages
            .create({
                body: message,
                from: process.env.TWILIO_USER_NUMBER,
                to: receiver
            })
           // .then(message => console.log(message.sid))
            .done();
    }

}