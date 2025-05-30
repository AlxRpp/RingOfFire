import { CommonModule } from '@angular/common';
import { Component, input, Input,} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,
    
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  name = input.required<string>();
  playerActive = input.required<boolean>();




  constructor(){
     console.log(this.playerActive);
    
 }
}
