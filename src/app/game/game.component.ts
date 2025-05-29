import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  public game: Game
  animationPlayed = false;


  constructor() {
    this.game = new Game();
    console.log(this.game);
    
  }



  takeCard() {
    this.animationPlayed = true;
  }
}
