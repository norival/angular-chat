import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { CurrentChannelPipe } from './chat/current-channel.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { MessageUSerPipe } from './message-user.pipe';
import { ChannelNamePipe } from './channel-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    CurrentChannelPipe,
    SafeHtmlPipe,
    MessageUSerPipe,
    ChannelNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
