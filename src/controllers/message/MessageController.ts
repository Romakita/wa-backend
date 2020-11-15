import {BodyParams, Controller, Post, ProviderScope, Scope} from "@tsed/common";
import {TwilioHelper} from "../../helpers/TwilioHelper";
import {ODAHelper} from "../../helpers/ODAHelper";
import {CardMessage} from '../../models/CardMessage';
import {TextMessage} from '../../models/TextMessage';


@Controller("/messages")
@Scope(ProviderScope.SINGLETON)
export class MessageController {

    constructor(private twilioHelper: TwilioHelper, private odaHelper: ODAHelper) {

    }

    @Post("/twilioResponse")
    twilioResponse(@BodyParams() body: any) {
        this.odaHelper.sendMessage(this.odaHelper.createMessage(body));
    }

    @Post("/odaResponse")
    odaResponse(@BodyParams('messagePayload') m: CardMessage | TextMessage, @BodyParams("userId") userId: string) {
        this.twilioHelper.sendMessage(this.odaHelper.convertMessage(m), userId);
    }


}
