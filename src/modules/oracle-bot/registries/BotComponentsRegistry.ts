import {GlobalProviders, Provider, TypedProvidersRegistry} from "@tsed/di";

export const PROVIDER_TYPE_BOT_COMPONENTS = "BotComponent";

GlobalProviders.createRegistry(PROVIDER_TYPE_BOT_COMPONENTS, Provider, {
  injectable: true
});

export const registerBotComponent = GlobalProviders.createRegisterFn(PROVIDER_TYPE_BOT_COMPONENTS);