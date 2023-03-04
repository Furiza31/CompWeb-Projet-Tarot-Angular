import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameDetailsComponent } from './tarot/game-details/game-details.component';
import { GameListComponent } from './tarot/game-list/game-list.component';
import { GameComponent } from './tarot/game/game.component';
import { NewComponent } from './tarot/game/new/new.component';
import { HomeComponent } from './tarot/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'games/list',
    component: GameListComponent
  },
  {
    path: 'details/:id',
    component: GameDetailsComponent
  },
  {
    path: 'new/game',
    component: NewComponent
  },
  {
    path: 'game/:id',
    component: GameComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
