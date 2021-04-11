import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UuidService } from '../uuid.service';
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
    users: Array<User> = [];
    channels: Array<Channel> = [];
    messages: Array<Message> = [];
    currentChannel: string;
    inPrivateChat = false;

    // messageInput = new FormControl();
    messageForm = new FormGroup({
        message: new FormControl(),
    });

    constructor(
        private chatService: ChatService,
        public userService: UserService,
        private uuid: UuidService,
        private titleService: Title
    ) { }

    ngOnInit(): void {
        this.chatService.userUpdates.subscribe(users => {
            this.users = users;
        });

        this.chatService.incomingMessages.subscribe(message => {
            this.messages.push(message);
            // this.titleService.setTitle(`${this.titleService.getTitle()} (${this.getUnreadCount()})`);
        });

        this.chatService.channelUpdates.subscribe(channels => {
            this.channels = channels;

            if (!this.currentChannel) {
                this.currentChannel = this.channels.find(channel => channel.name === 'General').uuid;
            }
        });
    }

    setCurrentChannel(currentChannel: string) {
        this.currentChannel = currentChannel;

        const channel = this.channels.find(ch => this.currentChannel === ch.uuid);
        if (!channel) {
            this.inPrivateChat = true;

            return;
        }

        this.inPrivateChat = false;
    }

    onSendMessage() {
        const message: Message = {
            uuid: this.uuid.generate(),
            unread: false,
            content: this.messageForm.value.message,
            createdAt: new Date(),
            senderUuid: this.userService.currentUser.uuid,
            channelUuid: this.currentChannel,
            recipientUuid: this.inPrivateChat ? this.currentChannel : '',
        };

        this.messageForm.reset();
        this.chatService.sendMessage(message, this.inPrivateChat);
        this.messages.push(message);
    }

    get currentMessages() {
        this.setChannelRead(this.currentChannel);

        return this.messages.filter(msg => msg.channelUuid === this.currentChannel);
    }

    getUnreadCount(channelUuid: string = null) {
        if (!channelUuid) {
            return this.messages.filter(msg => msg.unread === true).length;
        }

        return this.messages.filter(msg => {
            return msg.channelUuid === channelUuid && msg.unread === true;
        }).length;
    }

    setChannelRead(channelUuid: string) {
        this.messages.map(msg => {
            if (msg.channelUuid === channelUuid) {
                msg.unread = false;
            }

            return msg;
        });
    }

}
