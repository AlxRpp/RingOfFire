import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-game-infos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './game-infos.component.html',
  styleUrl: './game-infos.component.scss'
})
export class GameInfosComponent {

}
