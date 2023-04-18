import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { BlockUIService } from '../../shared/services/block-ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    protected blockUIService: BlockUIService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.loginWithRedirect();
  }

  logout() {
    this.authService.logout({
      logoutParams: {
        returnTo: document.location.origin,
      },
    });
  }
}
