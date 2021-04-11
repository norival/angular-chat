import { Pipe, PipeTransform } from '@angular/core';
import { Channel } from './chat/channel';
import { User } from './chat/user';

@Pipe({
    name: 'channelName'
})
export class ChannelNamePipe implements PipeTransform {

    transform(uuid: string, channels: Channel[], users: User[]): unknown {
        const channel = channels.find(ch => ch.uuid === uuid);

        if (channel) {
            return channel.name;
        }

        return users.find(u => u.uuid === uuid)?.nickname;
    }

}
