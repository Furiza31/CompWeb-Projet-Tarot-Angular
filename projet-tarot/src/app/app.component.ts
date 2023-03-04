import { Component } from '@angular/core';
import { NavigationHisotryService } from './services/navigation-hisotry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet-tarot';

  constructor(
    public navigation: NavigationHisotryService
  ) {
    this.navigation.init();
  }
}
