import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {
constructor(private viewportScroller: ViewportScroller){

}

scrollToSection(sectionId: string): void {
  this.viewportScroller.scrollToAnchor(sectionId);
}

}
 