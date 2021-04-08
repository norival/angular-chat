import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Message } from './message';
import { Room } from './room';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    users: Array<User>;
    rooms: Array<Room>;
    messages: Array<Message>;
    private socket: Socket;

    constructor() {
        this.socket = io(environment.SOCKET_ENDPOINT);

        // userlist update subscriber
        new Observable<Array<User>>(
            subscriber => {
                this.socket.on('userlist.update', users => subscriber.next(users));
            }
        ).subscribe(users => this.users = users);

        // messages subscriber
        new Observable<Message>(
            subscriber => {
                this.socket.on('message', message => subscriber.next(message));
            }
        ).subscribe(message => {
            this.messages.push(message)
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
