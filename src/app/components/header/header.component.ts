import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let {url} = val;
        url = url.split('/')[1];

        const currentActiveLink = document.querySelector('.active');
        currentActiveLink?.setAttribute('class', '');

        let newActiveLink = url ?
          document.querySelector(`#${url}-link`) :
          document.querySelector(`#home-link`);

        newActiveLink?.setAttribute('class', 'active');
      }
    });
  }

  ngOnInit(): void {
  }

}
