
import { Component, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { ObtenerMenuService } from '../Services/obtener-menu.service';
import Swal from 'sweetalert2';
import { EntradasService } from './entradas/services/entradas.service';
import { EntradasComponent } from './entradas/entradas.component';
import { Router } from '@angular/router';
import { EventosService } from '../form-eventos/services/eventos.service';

@Component({
  selector: 'app-form-restaurante',
  templateUrl: './form-restaurante.component.html',
  styleUrl: './form-restaurante.component.css'
})
export class FormRestauranteComponent {
  menu: any[] = [];
  platos: any[] = [];
  bebidas: any[] = [];
  entradasSeleccionadas: any[] = [];
  productosRestaurante2: any;

  // Arreglo para almacenar las entradas seleccionadas
  @Input() mostrarBotonTotal: boolean = true
  @Output() saldoRestaurante = new EventEmitter<any>();
  @Input() mostrarBtnTotal: boolean = true
  @Output() actualizarTotal = new EventEmitter<number>(); // Evento para actualizar el total
  @ViewChild(EntradasComponent) entradasComponent!: EntradasComponent;


  @Output() productosRestaurante = new EventEmitter<any[]>();


  constructor(
    private obtenerMenuService: ObtenerMenuService,
    private router: Router,
    private eventoService: EventosService,
    private entradasService: EntradasService

  ) {}

  ngOnInit() {
    this.obtenerMenuService.getMenu().subscribe((data) => {
      this.menu = data.data.map((plato: any) => ({ ...plato, cantidad: 0 }));
      this.platos = this.menu.filter(item => item.type === 'plato');
      this.bebidas = this.menu.filter(item => item.type === 'bebida');
    });

  }

  incrementar(index: number) {
    if (index < this.platos.length) {
      this.platos[index].cantidad++;
    } else if (index < this.platos.length + this.bebidas.length) {
      const bebidaIndex = index - this.platos.length;
      this.bebidas[bebidaIndex].cantidad++;
    }
    this.actualizarTotal.emit(this.sumarPrecios());
    this.emitirProductosRestaurante()

  }

  decrementar(index: number) {
    if (index < this.platos.length) {
      if (this.platos[index].cantidad > 0) {
        this.platos[index].cantidad--;
      }
    } else if (index < this.platos.length + this.bebidas.length) {
      const bebidaIndex = index - this.platos.length;
      if (this.bebidas[bebidaIndex].cantidad > 0) {
        this.bebidas[bebidaIndex].cantidad--;
      }
    }
    this.actualizarTotal.emit(this.sumarPrecios());
    this.emitirProductosRestaurante()
  }

  sumarPrecios() {
    let total = 0;
    total += this.platos.reduce((acc, plato) => acc + (plato.price * plato.cantidad), 0);
    total += this.bebidas.reduce((acc, bebida) => acc + (bebida.price * bebida.cantidad), 0);
    return total;

  }

  guardarSeleccion(productosSeleccionados: any[]) {

    const pedido = {
      productos: productosSeleccionados,
      total: this.sumarPrecios() + this.entradasService.getTotal() ,
      cedula: localStorage.getItem('cedula'),
      descripcion: this.eventoService.getDescripcion()
    }


    this.obtenerMenuService.guardarSeleccion(pedido).subscribe(
      (data) => {
        Swal.fire({
          title: 'Reserva Exitosa',
          text: 'Su reserva ha sido realizada con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        localStorage.removeItem('cedula')
        this.router.navigate(['/servicios'])

      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Hubo un problema al procesar su reserva. Por favor, inténtelo de nuevo más tarde.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Cerrar'
        });
        console.error('Error al guardar la selección:', error);
      }
    );
  }

  obtenerProductosSeleccionados() {
    return [
      ...this.platos.filter(plato => plato.cantidad > 0).map(plato => ({
        nombre: plato.name,
        precio: plato.price,
        cantidad: plato.cantidad,
        tipo: 'plato'
      })),
      ...this.bebidas.filter(bebida => bebida.cantidad > 0).map(bebida => ({
        nombre: bebida.name,
        precio: bebida.price,
        cantidad: bebida.cantidad,
        tipo: 'bebida'
      })),
      ...this.entradasSeleccionadas
    ];
  }

  onPagar() {
    // Obtener productos seleccionados del restaurante
    const productosRestaurante = this.obtenerProductosSeleccionados();



    // Obtener productos seleccionados de las entradas
    const productosEntradas = this.entradasComponent.obtenerProductosSeleccionados();
    // Combinar ambos arreglos de productos
    const productosSeleccionados = [...productosRestaurante, ...productosEntradas];

    // Guardar la selección
    this.guardarSeleccion(productosSeleccionados, );
  }

  onPagar2(){
    const productosRestaurante = this.obtenerProductosSeleccionados();

    const productosSeleccionados = [...productosRestaurante ];

    if (productosSeleccionados.length === 0) {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Debe seleccionar al menos un producto antes de pagar.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Cerrar'
      });
      return;
    }

    this.guardarSeleccion(productosSeleccionados);

  }

  emitirProductosRestaurante() {
    const productosRestaurante = this.obtenerProductosSeleccionados();
    if (productosRestaurante.length > 0) {
      this.productosRestaurante.emit(productosRestaurante);
    }
  }

  // Método para recibir las entradas seleccionadas desde EntradasComponent
  recibirEntradasSeleccionadas(infoEntradas: any[]) {
    this.entradasSeleccionadas = infoEntradas;
    this.actualizarTotal.emit(this.sumarPrecios());
    this.emitirProductosRestaurante();
  }
}
