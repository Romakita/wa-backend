import {Lib} from '@oracle/bots-node-sdk';
import { Service } from '@tsed/di';

@Service()
export class MCHelper {


    constructor(){
        console.log("MCHelper New Instance");
    }

    sendMessage(conversation: Lib.Conversation){
                let c= new Lib.CustomComponentContext(conversation.getRequest());
                c.reply("HelloWorld" ,conversation.getRequest().message.channelConversation);
    }



}