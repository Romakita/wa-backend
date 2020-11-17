import {Injectable, ProviderScope, ProviderType} from "@tsed/di";

@Injectable({
    scope: ProviderScope.INSTANCE,
    type: ProviderType.SERVICE
})
export class TwilioHelper {

     client;

    constructor() {
        console.log("TwilioHelper New Instance");
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