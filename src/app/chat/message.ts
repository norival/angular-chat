export interface Message {
    uuid: string;
    content: string;
    createdAt: Date;
    senderUuid: string;
    recipientUuid: string;
    channelUuid: string;
    unread: boolean;
}
