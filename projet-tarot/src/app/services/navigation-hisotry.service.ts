import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationHisotryService {

  private hisotry: string[] = [];

  constructor(
    private router: Router
  ) { }

  public init(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hisotry.push(event.urlAfterRedirects);
        if (this.hisotry.length > 2) {
          this.hisotry.shift();
        }
      }
    });
  }

  public previousUrl(): string {
    if (this.hisotry.length > 0) {
      return this.hisotry[this.hisotry.length - 2];
    }
    return '';
  }

  public back(): void {
    // èleve le dernier élément de l'historique
    let previous = this.hisotry.pop();
    if (this.hisotry.length > 0) {
      this.router.navigateByUrl(previous!);
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
