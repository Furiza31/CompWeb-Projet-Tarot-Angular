import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from 'app/models/game';
import { Player } from 'app/models/player';
import { Round } from 'app/models/round';
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
    return this.http.get<Game[]>(this.gamePartyAPI);
  }

  getGameParty(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.gamePartyAPI}/${id}`);
  }

  getRounds(id: number): Observable<Round[]> {
    return this.http.get<Round[]>(`${this.gameRoundsAPI}?idGame=${id}`);
  }

  newGameParty(game: Game): Observable<Game> {
    return this.http.post<Game>(this.gamePartyAPI, game);
  }

  addRound(round: Round): Observable<Round> {
    return this.http.post<Round>(this.gameRoundsAPI, round);
  }

  updateGameParty(game: Game): Observable<Game> {
    return this.http.put<Game>(`${this.gamePartyAPI}/${game.id}`, game);
  }

  deleteRound(id: number): Observable<Round> {
    return this.http.delete<Round>(`${this.gameRoundsAPI}/${id}`);
  }

  deleteGameParty(id: number): Observable<Game> {
    return this.http.delete<Game>(`${this.gamePartyAPI}/${id}`);
  }
  
}
