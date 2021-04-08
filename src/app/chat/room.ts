import { Message } from "./message";

export interface Room {
    uuid: string;
    messages: Array<Message>;
}
