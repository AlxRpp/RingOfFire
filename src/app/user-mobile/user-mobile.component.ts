import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-mobile',
  standalone: true,
  imports: [],
  templateUrl: './user-mobile.component.html',
  styleUrl: './user-mobile.component.scss'
})
export class UserMobileComponent {
  name = input.required<string>();
  playerActive = input.required<boolean>();


}
