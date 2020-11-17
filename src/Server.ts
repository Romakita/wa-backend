import "@tsed/ajv";
import {PlatformApplication} from "@tsed/common";
import {Env} from "@tsed/core";
import {Configuration, Inject} from "@tsed/di";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/typeorm";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as methodOverride from "method-override";
import typeormConfig from "./config/typeorm";
import "./modules/oracle-bot"; // load module

export const rootDir = __dirname;

@Configuration({
  rootDir,
  oracleBot: {
    webhook: {
      channel: {
        url: process.env.ODA_URL,
        secret: process.env.ODA_SECRET
      }
    }
  },
  env: Env.DEV,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  mount: {
    "/v1": [
      `${rootDir}/controllers/**/*.ts`
    ]
  },
  componentsScan: [
    `${rootDir}/components/**/*.ts`, // load BotComponents
    `${rootDir}/services/**/*.ts`
  ],
  typeorm: typeormConfig,
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}
