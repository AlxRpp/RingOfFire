import { inject, Injectable } from '@angular/core';
import { collection, Firestore, onSnapshot, addDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  firestore = inject(Firestore)

  constructor() { }
 
  
  getGamesRef(){
    return collection(this.firestore,'games')
  }

  gamesList(){
    return onSnapshot(this.getGamesRef(), (game) => {
      game.forEach(element =>{
        console.log("das ist mein game:", element.data());
      })
    })
  }

  async addGame(){
    await addDoc(this.getGamesRef(), {"test":"welt"})
    }
}
