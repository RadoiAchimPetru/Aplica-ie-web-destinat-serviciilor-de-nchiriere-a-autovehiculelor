import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from '../../../../../environment';


@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss']
})
// chat-bot.component.ts
export class ChatBotComponent {
  open = false;
  draft = '';
  msgs: {role:'user'|'bot', text:string}[] = [];

  constructor(private http: HttpClient, private msg: NzMessageService) {}

  send() {
    const q = this.draft.trim();
    if (!q) { return; }
    this.msgs.push({ role:'user', text:q });
    this.draft = '';

    const token = localStorage.getItem('token');

    this.http.post<{answer:string}>(`${environment.apiBase}/chat`, { message: q },token                        
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {} )
        .subscribe({
          next: r => this.msgs.push({ role:'bot', text: r.answer }),
          error: _ => this.msg.error('Chat indisponibil.')
        });
  }
}
