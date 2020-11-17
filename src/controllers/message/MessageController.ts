import {Lib} from "@oracle/bots-node-sdk";
import {BodyParams, Controller, Inject, Post, ProviderScope, Scope} from "@tsed/common";
import {MCHelper} from "../../helpers/MCHelper";
import {TwilioHelper} from "../../helpers/TwilioHelper";
import {CardMessage} from "../../models/CardMessage";
import {TextMessage} from "../../models/TextMessage";
import {OracleBotClient} from "../../modules/oracle-bot";

@Controller("/messages")
@Scope(ProviderScope.SINGLETON)
export class MessageController {
  @Inject()
  private oracleBotClient: OracleBotClient;

  @Inject()
  private twilioHelper: TwilioHelper;

  @Inject()
  private mcHelper: MCHelper;

  $onInit() {
    console.log('====>MessageController', this.oracleBotClient)
  }

  @Post("/twilioResponse")
  twilioResponse(@BodyParams() body: any) {
    this.oracleBotClient.sendMessage(this.oracleBotClient.createMessage(body));
  }

  @Post("/odaResponse")
  odaResponse(@BodyParams("messagePayload") m: CardMessage | TextMessage, @BodyParams("userId") userId: string) {
    // this.twilioHelper.sendMessage(this.odaHelper.convertMessage(m), userId);
    console.log("response");
  }

  @Post("/webResponse")
  webResponse(@BodyParams("message") message: string, @BodyParams("conversation") conversation: Lib.Conversation) {
    this.mcHelper.sendMessage(conversation);
  }
}
