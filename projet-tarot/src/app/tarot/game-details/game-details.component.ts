import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingStatus } from 'app/models/loading-status';
import { Player } from 'app/models/player';
import { Round } from 'app/models/round';
import { GameService } from 'app/services/game.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  public rounds: Round[] = [];
  public players: Player[] = [];
  readonly loadingStatus = LoadingStatus;
  public status: LoadingStatus = LoadingStatus.LOADING;

  constructor(
    private gameService: GameService,
    public route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.gameService.getGameParty(id).subscribe({
      next: game => {
        this.players = game.players;
        this.gameService.getRounds(id).subscribe({
          next: rounds => {
            this.rounds = rounds;
            this.status = LoadingStatus.LOADED;
          },
          error: err => this.router.navigateByUrl('/home')
        });
      },
      error: err => this.router.navigateByUrl('/home')
    });
  }

}
