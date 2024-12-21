import { Component, Input } from '@angular/core';
import {Message,MessageService} from 'primeng/api';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent  {
  msgs1: Message[];
 @Input() message: Message;

  
  constructor(private messageService: MessageService) {
  }
  ngOnInit() {
      this.msgs1 = [
        this.message 
      ];
  }
  
}
