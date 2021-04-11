import { Component, OnInit } from '@angular/core';
import { UserService } from './chat/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Notdiscord';

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
    }
}
