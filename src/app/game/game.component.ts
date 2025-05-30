import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { UserComponent } from "../user/user.component";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, UserComponent, UserComponent, MatButtonModule, MatIconModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  public game: Game
  animationPlayed = false;
  currentCard: string | undefined


  constructor() {
    this.game = new Game();
    console.log(this.game);

  }

  takeCard() {
    if (!this.animationPlayed) {
      this.currentCard = this.game.stack.pop()
      this.animationPlayed = true;

      if (this.currentCard !== undefined) {
        setTimeout(() => {
          this.game.playedCards.push(this.currentCard as string)
          this.animationPlayed = false
        }, 1000)
      } else {
        console.log("Stack is empty");
      }
    }
  }

}
