import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Channel } from './channel';
import { Message } from './message';
import { User } from './user';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private socket: Socket;

    incomingMessages: Observable<Message>;
    userUpdates: Observable<Array<User>>;
    channelUpdates: Observable<Array<Channel>>;

    constructor(
        private userService: UserService
    ) {
        this.socket = io(environment.SOCKET_ENDPOINT, {
            auth: {
                user: this.userService.currentUser,
            }
        });

        // userlist update subscriber
        this.userUpdates = new Observable<Array<User>>(subscriber => {
            this.socket.on('userlist.update', users => subscriber.next(users));
        });

        this.incomingMessages = new Observable<Message>(subscriber => {
            this.socket.on('message', message => subscriber.next(message));
        });

        this.channelUpdates = new Observable<Array<Channel>>(subscriber => {
            this.socket.on('channel.update', channels => subscriber.next(channels));
        });
    }

    /**
     * Send messages (public or private)
     */
    sendMessage(message: Message) {
        this.socket.emit('message', message);
    }
}
