import { Component, Input } from '@angular/core';
import { Game } from 'app/models/game';

@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.css']
})
export class GameListItemComponent {
  @Input()
  public game:Game = new Game();

  constructor() { }
}
