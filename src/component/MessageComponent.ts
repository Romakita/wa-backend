import { Lib } from '@oracle/bots-node-sdk';
import {Inject, Injectable} from "@tsed/di";
import {BotComponent} from "../decorators/BotComponent";
import {OracleBotClient} from "../services/OracleBotClient"

@BotComponent()
export class MessageComponent implements Lib.IComponent {
   @Inject()
   private client: OracleBotClient;

    public metadata(): Lib.IComponentMetadata {
        return {
            name: 'cy2.message.component',
            supportedActions: ['chatContinue', 'chatFinished']
        }
    }

    public invoke(conversation: Lib.Conversation, done: () => void): void {
        this.sendMessage();
        conversation.transition();
        done();
    }

    sendMessage(){
        this.client.hello();
    }
}