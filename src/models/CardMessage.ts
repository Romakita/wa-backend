import { Card } from '../entities/Card';
import { MessageModel } from './MessageModel';

export class CardMessage implements MessageModel {
    messagePayload: any;
text: string;
type: string;
layout:string;
userId:string;
cards:Card[];

}