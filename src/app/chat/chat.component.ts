import { Component, OnInit } from '@angular/core';
import { Channel } from './channel';
import { ChatService } from './chat.service';
import { Message } from './message';
import { User } from './user';
import { UserService } from './user.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    users: Array<User>;
    channels: Array<Channel>;
    messages: Array<Message>;
    currentChannel: string;

    constructor(
        private chatService: ChatService,
        public userService: UserService
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
