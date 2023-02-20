import { Component, OnInit } from '@angular/core';
import { Game } from 'app/models/game';
import { GameService } from 'app/services/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  public games!: Observable<Game[]>;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.games = this.gameService.getGameParties();
  }

}
