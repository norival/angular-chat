import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Message } from './message';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private socket: Socket;

    incomingMessages: Observable<Message>;
    userUpdates: Observable<Array<User>>;

    constructor() {
        this.socket = io(environment.SOCKET_ENDPOINT);

        // userlist update subscriber
        this.userUpdates = new Observable<Array<User>>(subscriber => {
            this.socket.on('userlist.update', users => subscriber.next(users));
        });

        this.incomingMessages = new Observable<Message>(subscriber => {
            this.socket.on('message', message => subscriber.next(message));
        });
    }

    /**
     * Send messages (public or private)
     */
    sendMessage(message: Message) {
        this.socket.emit('message', message);
    }

    /**
     * Update nickname on the server
     */
    updateNickname(user: User) {
        this.socket.emit('nickname.update', user);
    }
}
