import { Component, Input, OnInit } from '@angular/core';
import { Round } from 'app/models/round';

@Component({
  selector: 'app-game-details-item',
  templateUrl: './game-details-item.component.html',
  styleUrls: ['./game-details-item.component.css']
})
export class GameDetailsItemComponent implements OnInit {

  @Input()
  public round:Round = new Round(0, 0, []);

  constructor() { }

  ngOnInit(): void {
  }

}
