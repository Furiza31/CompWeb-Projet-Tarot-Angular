import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationHistoryService {

  private history: string[] = [];

  constructor(
    private router: Router
  ) { }

  public init(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
        if (this.history.length > 2) {
          this.history.shift();
        }
      }
    });
  }

  public previousUrl(): string {
    if (this.history.length > 0) {
      return this.history[this.history.length - 2];
    }
    return '';
  }

  public back(): void {
    // èleve le dernier élément de l'historique
    let previous = this.history.pop();
    if (this.history.length > 0) {
      this.router.navigateByUrl(previous!);
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
