import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'app/models/game';
import { Round } from 'app/models/round';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-game-details-graphic-item',
  templateUrl: './game-details-graphic-item.component.html',
  styleUrls: ['./game-details-graphic-item.component.css']
})
export class GameDetailsGraphicItemComponent implements OnInit {

  public graph: any;
  @Input()
  public rounds: Round[] = [];
  @Input()
  public game: Game = new Game();

  constructor() { }

  createGraph() {
    let colors = ["#EB5353", "#F9D923", "#36AE7C", "#187498"];
    let labels: string[] = [];
    // order rounds by round number
    this.rounds.sort((a, b) => a.roundNumber - b.roundNumber);
    this.rounds.forEach(round => {
      labels.push("round " + round.roundNumber);
    });
    let datasets = [];
    for (let i = 0; i < this.game.players.length; i++) {
      let backgroundColor = colors[i];
      let label = this.game.players[i].name;
      let data: any = [];
      this.rounds.forEach(round => {
        data.push(round.scores[i]);
      });
      datasets.push({
        label: label,
        data: data,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        fill: false,
        lineTension: 0,
        pointRadius: 7,
        pointHoverRadius: 10,
      });
    }
    this.graph = new Chart('canvas', {
      type: 'line',
      data: {// values on X-Axis
        labels: labels,
        datasets: datasets
      },
      options: {
        color: 'white',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Scores',
            color: 'white'
          }
        },
        scales: {
          x: {
            display: true,
            grid: {
              color: 'grey'
            },
            title: {
              display: true,
              text: 'Rounds',
              color: 'white'
            }
          },
          y: {
            display: true,
            grid: {
              color: 'grey'
            },
            title: {
              display: true,
              text: 'Scores',
              color: 'white'
            }
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.createGraph();
  }

}
