import {Constant, Inject, Injectable, InjectorService, ProviderScope, ProviderType} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import {OracleBotClient} from "../services/OracleBotClient";
import {PROVIDER_TYPE_BOT_COMPONENTS} from "../registries/BotComponentsRegistry";

@Injectable()
export class OracleBotModule {
    
    @Inject()
    private app: PlatformApplication;
   
    @Inject()
    private injector: InjectorService;
     
    @Inject()
    private client: OracleBotClient
    
    @Constant("oracleBot.webhook", {})
    oracleBotWebhook: any;
    
    $beforeRoutesInit() { // or $afterInit
       this.injector.logger.info("OracleBotModule init...");
        
       this.client.bot.init(this.app.raw, {
          logger: this.injector.logger
       });
        
       this.client.bot.Middleware.customComponent(this.app.raw, {
           baseUrl: '/components',
           cwd: __dirname,
           register: this.getBotComponents()
       });
        
       const {WebhookClient} = this.client.bot.Middleware;
        
       this.client.webhook = new WebhookClient(this.oracleBotWebhook);
    }
  
    protected getBotComponents() {
      return [...this.injector.getProviders(PROVIDER_TYPE_BOT_COMPONENTS)].map((provider) => {
        return this.injector.get(provider.token)
      });
    }
}