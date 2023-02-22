import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './tarot/game/game.component';
import { GameListComponent } from './tarot/game-list/game-list.component';
import { GameDetailsComponent } from './tarot/game-details/game-details.component';
import { HomeComponent } from './tarot/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { GameListItemComponent } from './tarot/game-list/game-list-item/game-list-item.component';
import { GameDetailsItemComponent } from './tarot/game-details/game-details-item/game-details-item.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameListComponent,
    GameDetailsComponent,
    HomeComponent,
    GameListItemComponent,
    GameDetailsItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
