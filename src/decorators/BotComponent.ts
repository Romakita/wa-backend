import {useDecorators} from "@tsed/core";
import {registerBotComponent} from "../registries/BotComponentsRegistry";

export function BotComponent(): ClassDecorator {
  return useDecorators(registerBotComponent);
}