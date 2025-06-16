import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  firestore = inject(Firestore)
  constructor(private router: Router) { }

  async newGame() {
    let game = new Game();
    await addDoc(this.getGamesRef(), game.toJson())
      .then((gameInfo:any) => {
        this.router.navigateByUrl("/game/" + gameInfo.id)
      })


  }


  getGamesRef() {
    return collection(this.firestore, 'games')
  }

  async addGame(game: any) {
    await addDoc(this.getGamesRef(), game)
  }
}

