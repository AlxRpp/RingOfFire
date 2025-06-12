import { inject, Injectable } from '@angular/core';
import { collection, Firestore, onSnapshot, addDoc, doc } from '@angular/fire/firestore';
// import { GameComponent } from '../game/game.component';
// import { Game } from '../../../src/models/game.ts';


@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  firestore = inject(Firestore)
  // game = Game
  constructor() { 
    
  }


  getGamesRef() {
    return collection(this.firestore, 'games')
  }

  // gamesList() {
  //   return onSnapshot(this.getGamesRef(), (game) => {
  //     game.forEach(element => {
  //       // console.log("das ist mein game:", element.data());
  //     })
  //   })
  // }


  gamesList(urlId: string) {
    return onSnapshot(doc(this.getGamesRef(), urlId), (currentGame) => {

      console.log(currentGame.data());

    })
  }

  async addGame(game: any) {
    await addDoc(this.getGamesRef(), game)
  }
}
