import { Injectable } from '@angular/core';
import { UuidService } from '../UuidService';
import { User } from './user';
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    currentUser: User;

    constructor(
        uuid: UuidService
    ) {
        const customConfig: Config = {
            dictionaries: [adjectives, animals],
            separator: ' ',
            length: 2,
            style: 'capital',
        };

        this.currentUser = {
            uuid: uuid.generate(),
            nickname: uniqueNamesGenerator(customConfig),
        };
    }
}
