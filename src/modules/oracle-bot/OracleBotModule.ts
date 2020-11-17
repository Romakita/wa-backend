import {PlatformApplication} from "@tsed/common";
import {Constant, Inject, Injectable, InjectorService} from "@tsed/di";
import {PROVIDER_TYPE_BOT_COMPONENTS} from "./registries/BotComponentsRegistry";
import {OracleBotClient} from "./services/OracleBotClient";

@Injectable()
export class OracleBotModule {
  @Constant("oracleBot.webhook", {})
  oracleBotWebhook: any;

  @Inject()
  private app: PlatformApplication;

  @Inject()
  private injector: InjectorService;

  @Inject()
  private client: OracleBotClient;

  $beforeRoutesInit() {
    this.injector.logger.info("OracleBotModule init...");

    this.client.bot.init(this.app.raw, {
      logger: this.injector.logger
    });

    this.client.bot.Middleware.customComponent(this.app.raw, {
      baseUrl: "/components",
      cwd: __dirname,
      register: this.getBotComponents()
    });

    const {WebhookClient} = this.client.bot.Middleware;

    this.client.webhook = new WebhookClient(this.oracleBotWebhook);
  }

  protected getBotComponents() {
    return [...this.injector.getProviders(PROVIDER_TYPE_BOT_COMPONENTS)].map((provider) => {
      return this.injector.get(provider.token);
    });
  }
}