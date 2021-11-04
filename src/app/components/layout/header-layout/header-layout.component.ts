import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.css']
})
export class HeaderLayoutComponent implements OnInit {

  @Input() title: string = 'Overview'
  constructor() { }

  ngOnInit(): void {
  }

}
