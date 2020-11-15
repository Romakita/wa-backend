import {WebhookClient} from "@oracle/bots-node-sdk/middleware";
import {Injectable} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import {messageModelUtil} from "@oracle/bots-node-sdk/util";

@Injectable()
export class ODAHelper  {

    webhook: WebhookClient;


    constructor(private app: PlatformApplication<Express.Application>) {
        const OracleBot = require('@oracle/bots-node-sdk');
        OracleBot.init(app.raw, {
            logger: console,
        });

        OracleBot.Middleware.customComponent(app.raw, {
            baseUrl: '/components',
            cwd: __dirname,
            register: [
                '../component/MessageComponent.ts'
            ]
        });

        const {WebhookClient, WebhookEvent} = OracleBot.Middleware;

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

    convertMessage(message:any) : any{
       return  messageModelUtil.convertRespToText(message);
    }

    sendMessage(message:any){
        this.webhook.send(message);
    }


}