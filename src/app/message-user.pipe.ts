import { Pipe, PipeTransform } from '@angular/core';
import { User } from './chat/user';

@Pipe({
    name: 'messageUSer'
})
export class MessageUSerPipe implements PipeTransform {

    transform(uuid: string, users: User[]): string {
        if (uuid === 'server') {
            return 'Skynet';
        }

        return users.filter(u => u.uuid === uuid)[0]?.nickname;
    }

}
