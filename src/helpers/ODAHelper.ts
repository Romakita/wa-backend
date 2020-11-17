import {WebhookClient} from "@oracle/bots-node-sdk/middleware";
import {Injectable, ProviderScope, ProviderType} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import {messageModelUtil} from "@oracle/bots-node-sdk/util";

@Injectable()
export class ODAHelper  {

    webhook: WebhookClient;
    bot:any;

    constructor(private app: PlatformApplication<Express.Application>)   {
        console.log("ODAHelper New Instance");

        

        this.bot = require('@oracle/bots-node-sdk');
        this.bot.init(this.app.raw, {
            logger: console,
        });
        this.bot.Middleware.customComponent(this.app.raw, {
            baseUrl: '/components',
            cwd: __dirname,
            register: [
                '../component/MessageComponent.ts'
            ]
        });

        const {WebhookClient} = this.bot.Middleware;

        const channel = {
            url: process.env.ODA_URL,
            secret: process.env.ODA_SECRET
        };
        this.webhook = new WebhookClient({channel: channel});
    }

    createMessage(message:any) : any{
        const MessageModel = this.webhook.MessageModel();
        return {
            userId: message.From,
            messagePayload: MessageModel.textConversationMessage(message.Body)
        };
    }

    sendRawMessage(message:string, userid:string){
        const MessageModel = this.webhook.MessageModel();
        return {
            userId: userid,
            messagePayload: MessageModel.textConversationMessage(message)
        };
    }

    convertMessage(message:any) : any{
       return  messageModelUtil.convertRespToText(message);
    }

    sendMessage(message:any){
        this.webhook.send(message);
    }

    test(){
        console.log("test");
    }


}