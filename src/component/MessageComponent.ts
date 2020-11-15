import {Lib} from '@oracle/bots-node-sdk';
import {TwilioHelper} from "../helpers/TwilioHelper";
import {ComponentAbstract} from "@oracle/bots-node-sdk/lib";
import {Injectable} from "@tsed/di";
import {ProviderScope, Scope} from "@tsed/common";

@Scope(ProviderScope.SINGLETON)
export class MessageComponent implements Lib.IComponent {

    constructor(private twilioHelper: TwilioHelper) {
    }

    public metadata(): Lib.IComponentMetadata {
        return {name: 'cy2.message.component'}
    }

    public invoke(conversation: Lib.Conversation, done: () => void): void {
        conversation.reply(conversation.text());
        //this.sendMessage(conversation.text());
        done();
    }

    public sendMessage(message: string) {
        this.twilioHelper.sendMessage(message, "+14155238886");
    }

}