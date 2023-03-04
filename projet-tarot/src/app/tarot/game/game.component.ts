import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'app/models/game';
import { LoadingStatus } from 'app/models/loading-status';
import { Player } from 'app/models/player';
import { Round } from 'app/models/round';
import { Time } from 'app/models/time';
import { GameService } from 'app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public status: LoadingStatus = LoadingStatus.LOADING;
  public loadingStatus = LoadingStatus;
  public game: Game = new Game();
  public lastRoundNumber: number = 0;
  public preneur: Player = new Player();
  public petitBoutBool: boolean = false;
  public poigneeBool: boolean = false;
  public errorForm = false;
  public error = false;

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  /**
   * S'active au chargement du composant
   */
  ngOnInit(): void {
    // recupere la partie
    const id = this.route.snapshot.params['id'];
    this.gameService.getGameParty(id).subscribe({
      next: (game) => {
        this.game = game;
        this.gameService.getRounds(id).subscribe({
          next: (rounds) => {
            this.lastRoundNumber = rounds.length;
            this.status = LoadingStatus.LOADED;
          },
          error: (error) => this.router.navigateByUrl('/home')
        });
      },
      error: (error) => this.router.navigateByUrl('/home')
    });
  }

  /**
   * S'active lors de la soumission du formulaire
   * @param pfForm le formulaire
   * @returns void
   */
  onSubmit(pfForm: NgForm): void {
    this.error = false;
    for (let key in pfForm.value) {
      if (pfForm.value[key] == "") {
        this.errorForm = true;
        return;
      }
    }

    // calcule le score
    this.calcScore(pfForm);

    // create round
    const scores = this.game.players.map((player) => player.score);
    const round = new Round(0, this.game.id, this.lastRoundNumber, scores);
    
    // change la date de la partie
    this.game.time = Time.getTime();

    this.status = LoadingStatus.LOADING;

    // met a jour la partie et ajoute la manche
    this.gameService.addRound(round).subscribe({
      next: (round) => {
        this.gameService.updateGameParty(this.game).subscribe({
          next: (game) => {
            this.status = LoadingStatus.LOADED;
          },
          error: (error) => {
            this.status = LoadingStatus.LOADED;
            this.error = true
          } 
        });
      },
      error: (error) => {
        this.status = LoadingStatus.LOADED;
        this.error = true
      }
    });

    // reset form
    this.lastRoundNumber++;
    this.errorForm = false;
  }

  /**
   * Calcule le score et met a jour les joueurs de la partie
   * @param pfForm le formulaire
   */
  calcScore(pfForm: NgForm): void {
    // recupere les valeurs du formulaire et initialise les variables par defaut
    const points = pfForm.value.points;
    const bout = pfForm.value.bout;
    const diff = Math.abs(points - bout);
    const contrat = Number(pfForm.value.contrat);
    const preneur = Number(pfForm.value.preneur);
    const petitBout = (this.petitBoutBool) ? Number(pfForm.value.petitBout) : 0;
    const poignee = (this.poigneeBool) ?
                  ((pfForm.value.poigneeOwner == 0) ? Number(pfForm.value.poignee) : -Number(pfForm.value.poignee)) : 0;
    
    // verifie si le joueur est le preneur
    const isPreneur = (index: number) => index === preneur;

    // calcul du score
    const calcul = (25 + diff + petitBout) * contrat + poignee;

    this.game.players.forEach((player, index) => {
      const factor = (isPreneur(index)) ? 3 : -1;
      const score = (points - bout >= 0) ? calcul * factor : calcul * -factor;
      player.score += score;
    });
  }

}
