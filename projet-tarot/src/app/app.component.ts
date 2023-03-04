import { Component } from '@angular/core';
import { NavigationHistoryService } from './services/navigation-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet-tarot';

  constructor(
    public navigation: NavigationHistoryService
  ) {
    this.navigation.init();
  }
}
