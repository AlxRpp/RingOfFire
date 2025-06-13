import { CommonModule } from '@angular/common';
import { Component, inject, model, OnInit, signal } from '@angular/core';
import { Game } from '../../models/game';
import { UserComponent } from "../user/user.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfosComponent } from "../game-infos/game-infos.component";
import { ActivatedRoute } from '@angular/router';
import { collection, Firestore, onSnapshot, addDoc, doc } from '@angular/fire/firestore';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    UserComponent,
    UserComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    GameInfosComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {

  public game: Game
  animationPlayed = false;
  currentCard: string | undefined
  //Dialog
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  firestore = inject(Firestore)


  constructor(private route: ActivatedRoute) {
    this.game = new Game();
    // console.log(this.game);
  }

  ngOnInit() {
    this.addGame(this.game.toJson());
    this.route.params.subscribe((params) => {
      this.gamesList(params['id']);
    })
  }


  takeCard() {
    if (!this.animationPlayed) {
      this.currentCard = this.game.stack.pop()
      this.animationPlayed = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
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


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {
      data: { name: this.name(), animal: this.animal() },
    });

    dialogRef.afterClosed().subscribe((name: string) => {

      if (name !== undefined) {
        this.game.players.push(name);
      }
    });
  }


  getGamesRef() {
    return collection(this.firestore, 'games')
  }


  gamesList(urlId: string) {
    return onSnapshot(doc(this.getGamesRef(), urlId), (currentGame: any) => {
      console.log("Game updated", currentGame.data().players);
      
      this.game.playedCards = currentGame.data().playedCards;
      this.game.stack = currentGame.data().stack;
      this.game.players = currentGame.data().players;
      this.game.currentPlayer = currentGame.data().currentPlayer;

    })
  }

  async addGame(game: any) {
    await addDoc(this.getGamesRef(), game)
  }
}
