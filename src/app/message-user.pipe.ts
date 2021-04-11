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

        const user = users.find(u => u.uuid === uuid);

        if (user) {
            return user.nickname;
        }

        return 'Deleted user';
    }

}
