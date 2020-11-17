import {Lib} from "@oracle/bots-node-sdk";
import {Inject} from "@tsed/di";
import {BotComponent, OracleBotClient} from "../modules/oracle-bot";

@BotComponent()
export class MessageComponent implements Lib.IComponent {
  @Inject()
  private client: OracleBotClient;

  $onInit() {
    console.log('MessageComponent ====>', this.client)
  }

  public metadata(): Lib.IComponentMetadata {
    return {
      name: "cy2.message.component",
      supportedActions: ["chatContinue", "chatFinished"]
    };
  }

  public invoke(conversation: Lib.Conversation, done: () => void): void {
    this.sendMessage();
    conversation.transition();
    done();
  }

  sendMessage() {
    this.client.hello();
  }
}
