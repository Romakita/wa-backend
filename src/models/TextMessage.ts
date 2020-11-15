import { MessageModel } from './MessageModel';

export class TextMessage implements MessageModel {
    payload: any;
    text: string;
    type: string;
    userId:string;


}