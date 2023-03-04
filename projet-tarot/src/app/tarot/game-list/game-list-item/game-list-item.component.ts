import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'app/models/game';
import { LoadingStatus } from 'app/models/loading-status';
import { GameService } from 'app/services/game.service';
import { GameListComponent } from '../game-list.component';

@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.css']
})
export class GameListItemComponent {
  @Input()
  public game:Game = new Game();

  @Input()
  public parent: GameListComponent|undefined = undefined;
  private loadingStatus = LoadingStatus;

  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  delete(pfId: number) {
    if (confirm("Voulez-vous vraiment supprimer cette partie ?")) {
      this.parent!.status = this.loadingStatus.LOADING;
      this.gameService.getRounds(pfId).subscribe({
        next: rounds => {
          rounds.forEach(round => {
            this.gameService.deleteRound(round.id).subscribe({
              next: () => {},
              error: err => {
                this.parent!.error = true;
                console.error(err);
              }
            });
          });
          this.gameService.deleteGameParty(pfId).subscribe({
            next: () => this.router.navigateByUrl('/home').then(() => this.router.navigateByUrl('/games/list')),
            error: err => {
              this.parent!.error = true;
              console.error(err);
            }
          });
        },
        error: err => {
          this.parent!.error = true;
          console.error(err);
        }
      });
    }
  }
}
