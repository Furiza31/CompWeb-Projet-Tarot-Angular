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
import { GameDetailsGraphicItemComponent } from './tarot/game-details/game-details-graphic-item/game-details-graphic-item.component';
import { FormsModule } from '@angular/forms';
import { NewComponent } from './tarot/game/new/new.component';
import { NavBarComponent } from './tarot/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameListComponent,
    GameDetailsComponent,
    HomeComponent,
    GameListItemComponent,
    GameDetailsGraphicItemComponent,
    NewComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
