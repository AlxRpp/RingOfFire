import { CommonModule } from '@angular/common';
import { Component, Input,} from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  @Input() name:any ;


}
