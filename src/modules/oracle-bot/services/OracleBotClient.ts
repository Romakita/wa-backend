import {WebhookClient} from "@oracle/bots-node-sdk/middleware";
import {messageModelUtil} from "@oracle/bots-node-sdk/util";
import {Injectable} from "@tsed/di";

import OracleBot  from "@oracle/bots-node-sdk";

@Injectable()
export class OracleBotClient {
  webhook: WebhookClient;
  bot = OracleBot;

  createMessage(message: any): any {
    const MessageModel = this.webhook.MessageModel();
    return {
      userId: message.From,
      messagePayload: MessageModel.textConversationMessage(message.Body)
    };
  }

  sendRawMessage(message: string, userid: string) {
    const MessageModel = this.webhook.MessageModel();
    return {
      userId: userid,
      messagePayload: MessageModel.textConversationMessage(message)
    };
  }

  convertMessage(message: any): any {
    return messageModelUtil.convertRespToText(message);
  }

  sendMessage(message: any) {
    this.webhook.send(message);
  }

  hello() {
    console.log("hello");
  }
}