import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrl: './bebidas.component.css'
})
export class BebidasComponent {
  @Input() bebidas: any[] = [];
  @Output() incrementarCantidad = new EventEmitter<number>();
  @Output() decrementarCantidad = new EventEmitter<number>();

  incrementar(index: number) {
    this.incrementarCantidad.emit(index);
  }

  decrementar(index: number) {
    this.decrementarCantidad.emit(index);
  }
}
