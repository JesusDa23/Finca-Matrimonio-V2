import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrl: './platos.component.css'
})
export class PlatosComponent {
  
  @Input() platos: any[] = [];
  @Output() incrementarCantidad = new EventEmitter<number>();
  @Output() decrementarCantidad = new EventEmitter<number>();

  incrementar(index: number) {
    this.incrementarCantidad.emit(index);
  }

  decrementar(index: number) {
    this.decrementarCantidad.emit(index);
  }

}
