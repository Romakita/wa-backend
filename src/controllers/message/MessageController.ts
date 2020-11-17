import {BodyParams, Controller, Post, ProviderScope, Scope} from "@tsed/common";
import {TwilioHelper} from "../../helpers/TwilioHelper";
import {ODAHelper} from "../../helpers/ODAHelper";
import {CardMessage} from '../../models/CardMessage';
import {TextMessage} from '../../models/TextMessage';
import { MCHelper } from '../../helpers/MCHelper';
import { Lib } from '@oracle/bots-node-sdk';


@Controller("/messages")
@Scope(ProviderScope.SINGLETON)
export class MessageController {

    constructor(private mcHelper:MCHelper,private twilioHelper: TwilioHelper, private odaHelper: ODAHelper) {
        console.log("MessageController New Instance");

    }

    @Post("/twilioResponse")
    twilioResponse(@BodyParams() body: any) {
        this.odaHelper.sendMessage(this.odaHelper.createMessage(body));
    }

    @Post("/odaResponse")
    odaResponse(@BodyParams('messagePayload') m: CardMessage | TextMessage, @BodyParams("userId") userId: string) {
       // this.twilioHelper.sendMessage(this.odaHelper.convertMessage(m), userId);
       console.log("response");
    }

    @Post("/webResponse")
    webResponse(@BodyParams("message") message:string,@BodyParams("conversation") conversation: Lib.Conversation) {
        this.mcHelper.sendMessage(conversation);
    }

}
