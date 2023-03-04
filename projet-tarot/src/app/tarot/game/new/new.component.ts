import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Time } from 'app/models/time';
import { Player } from 'app/models/player';
import { Game } from 'app/models/game';
import { GameService } from 'app/services/game.service';
import { Router } from '@angular/router';
import { LoadingStatus } from 'app/models/loading-status';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {

  public status = LoadingStatus.LOADED;
  public loadingStatus = LoadingStatus;

  constructor(
    private gameService: GameService,
    private router: Router
  ) { }
  
  /**
   * S'active lors de la soumission du formulaire
   * @param pfForm le formulaire
   */
  onSubmit(pfForm: NgForm) {
    this.status = LoadingStatus.LOADING;
    // crée une nouvelle partie
    let time: Time = Time.getTime();
    let players: Player[] = [
      new Player(pfForm.value.player1, 0),
      new Player(pfForm.value.player2, 0),
      new Player(pfForm.value.player3, 0),
      new Player(pfForm.value.player4, 0)
    ];
    let game: Game = new Game(0, time, players);
    this.gameService.newGameParty(game).subscribe({
      next: (game) => this.router.navigateByUrl('/game/' + game.id),
      error: (error) => console.log(error)
    });
  }
}
