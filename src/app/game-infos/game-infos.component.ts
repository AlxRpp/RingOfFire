import { CommonModule } from '@angular/common';
import { Component, Input, input, OnChanges } from '@angular/core';
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
export class GameInfosComponent implements OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Thumbmaster', description: 'When a player draws the "9," they must touch their thumb to the table at any time. The last person to touch the table after the thumb master does so has to drink. ' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quizmaster', description: 'the player becomes the "quizmaster" and can ask any question. If anyone answers the question (even if its a silly or impossible question), they must drink. This rule applies regardless of the nature or difficulty of the question. ' },
    { title: 'Never have i ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
  ];

  title: string = "";
  description: string = "";


  @Input() card: string | undefined = ""
  // card=input.required();
  constructor() {

  }

  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description
    }

  }

}
