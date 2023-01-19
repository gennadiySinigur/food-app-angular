import { Component, OnInit } from '@angular/core';

import { BlockUIService } from '../../shared/services/block-ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(protected blockUIService: BlockUIService) { }

  ngOnInit(): void {
  }

}
