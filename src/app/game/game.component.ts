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
import { collection, Firestore, onSnapshot, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { UserMobileComponent } from "../user-mobile/user-mobile.component";



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    UserComponent,
    UserMobileComponent,
    UserComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    GameInfosComponent,
    UserMobileComponent
],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  firestore = inject(Firestore)
  public game!: Game
  gameId: string = ""
  //Dialog
  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor(private route: ActivatedRoute) {
    // console.log(this.game);
  }


  ngOnInit() {
    this.newGame()
    this.addGame(this.game.toJson());
    this.route.params.subscribe((params) => {
      this.gamesList(params['id']);
      this.gameId = params['id']
    })
  }


  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (!this.game.animationPlayed) {
      this.game.currentCard = this.game.stack.pop();
      this.game.animationPlayed = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      if (this.game.currentCard !== undefined) {
        setTimeout(() => {
          this.game.playedCards.push(this.game.currentCard as string)
          this.game.animationPlayed = false
          this.saveGame();
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
        this.saveGame();
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
      this.game.currentCard = currentGame.data().currentCard;
      this.game.animationPlayed = currentGame.data().animationPlayed;
    })
  }


  async addGame(game: any) {
    await addDoc(this.getGamesRef(), game)
  }


  async saveGame() {
    const gameRef = doc(this.getGamesRef(), this.gameId)
    await updateDoc(gameRef, this.game.toJson())
  }
}
