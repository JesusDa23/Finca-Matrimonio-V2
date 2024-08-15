import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CafeService } from '../services/cafe.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-main-cafe',
  templateUrl: './main-cafe.component.html',
  styleUrl: './main-cafe.component.css'
})

export class MainCafeComponent {

  cafes: any;

  constructor(private router: Router, private cafeService: CafeService, private viewportScroller: ViewportScroller){}

  ngOnInit(){
    this.cafeService.obtenerCafe().subscribe( data => {
      this.cafes = data

    })
  }

  scrollToSection(sectionId: string): void {
    this.viewportScroller.scrollToAnchor(sectionId);
  }
}
