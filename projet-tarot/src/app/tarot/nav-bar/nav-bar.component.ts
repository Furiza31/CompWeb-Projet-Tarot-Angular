import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationHistoryService } from 'app/services/navigation-history.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public idPartie: number|undefined = undefined;
  public previousUrl: string = '';
  public canGoBack: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private navigation: NavigationHistoryService
  ) { }

  /**
   * S'active au chargement du composant
   */
  ngOnInit(): void {

    let open = document.getElementById('open');
    let close = document.getElementById('close');
    let header = document.getElementById('header');

    open!.addEventListener('click', () => {
      header!.classList.toggle('active');
    });

    close!.addEventListener('click', () => {
      header!.classList.toggle('active');
    });

    // recupere l'id de la partie si il existe pour afficher le boutton du détail de la partie
    if (this.route.snapshot.params['id']) {
      this.idPartie = this.route.snapshot.params['id'];
    }
    // recupere l'url précédente pour afficher le boutton de retour si la regex suivante fonctionne
    // regex: "/game/[0-9]+"

    this.previousUrl = this.navigation.previousUrl();
    // test if the previous url is not undefined
    if (this.previousUrl != undefined) {
      this.canGoBack = this.navigation.previousUrl().match(/\/game\/[0-9]+/) ? true : false;
    }

  }

}
