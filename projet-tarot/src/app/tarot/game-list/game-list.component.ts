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
  // varaible to dodge the loading time insted of using "| async" -> async remake a request
  public games: Game[] = [];
  public gameSize: number = 0;
  public error: boolean = false;

  // status of the loading
  public status: LoadingStatus = LoadingStatus.LOADING;
  readonly loadingStatus = LoadingStatus;

  constructor(
    private gameService: GameService
  ) { }

  /**
   * S'active au chargement du composant
   */
  ngOnInit(): void {
    // recupere les partiees
    this.gamesObservable = this.gameService.getGameParties();
    this.gamesObservable.subscribe({
      next: (i) => {
        this.gameSize = i.length;
        this.games = i;
        this.status = LoadingStatus.LOADED
      },
      error: () => this.status = LoadingStatus.ERROR
    });
  }

}
