import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntradasService } from './services/entradas.service';
import { ObtenerMenuService } from '../../Services/obtener-menu.service';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.css'
})
export class EntradasComponent {
  menu: any[] = [];
  entradas: any[] = [];

  @Output() actualizarTotal = new EventEmitter<{ productos: any[], total: number }>(); // Emitir objeto con productos y total

  constructor(private menuService: ObtenerMenuService, private entradasService: EntradasService) {}

  ngOnInit() {
    this.menuService.getMenu().subscribe((data) => {
      this.menu = data.data.map((entrada: any) => ({ ...entrada, cantidad: 0 }));
      this.entradas = this.menu.filter(item => item.type === 'entrada');
    });
  }

  incrementar(index: number) {
    this.entradas[index].cantidad++;
    this.emitirActualizarTotal(); // Llamar a función para emitir la actualización
  }

  decrementar(index: number) {
    if (this.entradas[index].cantidad > 0) {
      this.entradas[index].cantidad--;
      this.emitirActualizarTotal(); // Llamar a función para emitir la actualización
    }
  }

  emitirActualizarTotal() {
    const entradasSeleccionadas = this.entradas.filter(entrada => entrada.cantidad > 0); // Filtrar solo las entradas seleccionadas
    const totalEntradas = entradasSeleccionadas.reduce((acc, entrada) => acc + (entrada.price * entrada.cantidad), 0);

    // Crear el objeto con la información detallada de las entradas y el total
    const infoEntradas = {
      productos: entradasSeleccionadas.map(entrada => ({
        nombre: entrada.name,
        precio: entrada.price,
        cantidad: entrada.cantidad,
        type: 'entrada' // Agregar el tipo para identificarlo como entrada
      })),
      total: totalEntradas
    };
    
    this.entradasService.setTotal(totalEntradas)
    this.actualizarTotal.emit(infoEntradas); // Emitir el evento con la información actualizada
  }

  obtenerProductosSeleccionados() {
    return this.entradas.filter(entrada => entrada.cantidad > 0).map(entrada => ({
      nombre: entrada.name,
      precio: entrada.price,
      cantidad: entrada.cantidad,
      type: 'entrada'
    }));
  }

}