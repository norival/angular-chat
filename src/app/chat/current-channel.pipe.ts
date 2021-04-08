import { Pipe, PipeTransform } from '@angular/core';
import { Message } from './message';

@Pipe({
    name: 'currentChannel'
})
export class CurrentChannelPipe implements PipeTransform {

    transform(messages: Array<Message>, currentChannel: string): Array<Message> {
        return messages.filter(msg => msg.channelUuid === currentChannel);
    }

}
