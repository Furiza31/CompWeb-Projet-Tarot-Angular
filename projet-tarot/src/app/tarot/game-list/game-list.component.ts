import { Component, OnInit } from '@angular/core';
import { LoadingStatus } from 'app/models/loading-status';
import { Game } from 'app/models/game';
import { GameService } from 'app/services/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  // the observable
  public gamesObservable!: Observable<Game[]>;
  // varaible to dodge the loading time
  public games: Game[] = [];
  public gameSize: number = 0;

  // status of the loading
  public status: LoadingStatus = LoadingStatus.LOADING;
  readonly loadingStatus = LoadingStatus;

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gamesObservable = this.gameService.getGameParties();
    this.gamesObservable.subscribe({
      next: (i) => {
        this.status = LoadingStatus.LOADED
        this.gameSize = i.length;
        this.games = i;
      },
      error: () => this.status = LoadingStatus.ERROR
    });
  }

}
