import {Injectable} from "@tsed/di";
import {WebhookClient} from "@oracle/bots-node-sdk/middleware";
const OracleBot = require('@oracle/bots-node-sdk');

@Injectable()
export class OracleBotClient {
    webhook: WebhookClient;
    bot: any = OracleBot;

    hello() {
       console.log('hello');
    }
}