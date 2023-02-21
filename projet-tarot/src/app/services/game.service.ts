import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from 'app/models/game';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  readonly gamePartyAPI = environment.tarotGameAPI + '/parties'
  readonly gameRoundsAPI = environment.tarotGameAPI + '/manche'

  constructor(
    private http:HttpClient
  ) { }

  getGameParties(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamePartyAPI)
  }
  
}