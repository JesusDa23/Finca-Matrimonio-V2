import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CafeService } from '../services/cafe.service';

@Component({
  selector: 'app-main-cafe',
  templateUrl: './main-cafe.component.html',
  styleUrl: './main-cafe.component.css'
})

export class MainCafeComponent {

  cafes: any;

  constructor(private router: Router, private cafeService: CafeService){}

  ngOnInit(){
    this.cafeService.obtenerCafe().subscribe( data => {
      this.cafes = data

    })
  }
}
