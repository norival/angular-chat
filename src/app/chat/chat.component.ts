import { Component, OnInit } from '@angular/core';
import { Channel } from './channel';
import { ChatService } from './chat.service';
import { Message } from './message';
import { User } from './user';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    users: Array<User>;
    channels: Array<Channel>;
    messages: Array<Message>;

    constructor(
        private chatService: ChatService
    ) { }

    ngOnInit(): void {
        this.chatService.userUpdates.subscribe(users => {
            this.users = users;
        });

        this.chatService.incomingMessages.subscribe(message => {
            this.messages.push(message);
        });

        this.chatService.channelUpdates.subscribe(channels => {
            this.channels = channels;
        });
    }

}
