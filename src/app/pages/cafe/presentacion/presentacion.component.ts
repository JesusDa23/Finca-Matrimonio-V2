import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CafeService } from '../services/cafe.service';


@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrl: './presentacion.component.css'
})

export class PresentacionComponent {
  @Input() title!: string
  @Input() image!: string
  @Input() description!: string

  cafes: any;

  constructor(private router: Router, private cafeService: CafeService){}

  ngOnInit(){
    
  }

}

