import { Component, Input, viewChild } from '@angular/core';
import { DataCampingService } from './services/data-camping.service';
import Swal from 'sweetalert2';
import { CompartirSaldoService } from './services/compartirSaldo.service';
import { Router } from '@angular/router';
import { CompartiCedulaService } from '../Services/compartirCedula.service';

@Component({
  selector: 'app-form-camping',
  templateUrl: './form-camping.component.html',
  styleUrl: './form-camping.component.css'
})
export class FormCampingComponent {
  total:any = 0
  totalPagar: any = 0

  mostrarMenuActivo: boolean = false;
  menuVisible: boolean = false;

  datosCamping:any;
  data:any;

  campingParejas: number = 0
  campingFamiliar: number = 0
  opcionSeleccionada: any;
  productosRestaurante: any[] = []


  constructor(
    private datosDelServicio:DataCampingService,
    private enviarPedidoCampingService: DataCampingService,
    private router: Router,
  ){}

  ngOnInit(){
     this.datosDelServicio.obtenerDatos().subscribe(data => {
      this.datosCamping = data
      this.data = this.datosCamping.data
      this.campingParejas = this.datosCamping.data[0].precio
      this.campingFamiliar = this.datosCamping.data[1].precio

    })
      
  }


  mostrarMenu() {
    this.menuVisible = true;
    this.mostrarMenuActivo = true;
  }

  ocultarMenu() {
    this.menuVisible = false;
    this.mostrarMenuActivo = false;
  }


  sumar( totalRestaurante: any ) {
    this.total = totalRestaurante
  }

  recibirProductosRestaurante(productos:any){
    this.productosRestaurante = productos;
  }




  mostrarPrecioPareja(i: any) {
    if (i === 0) {
      this.totalPagar = this.total + this.campingParejas;
      this.opcionSeleccionada = 'Camping para Parejas'; // Guardar opción seleccionada
    } else {
      this.totalPagar = this.total + this.campingFamiliar;
      this.opcionSeleccionada = 'Camping Familiar'; // Guardar opción seleccionada
    }
  }


  enviarPedidoCamping() {
    const pedidoCamping = {
      productos: {
        dataCamping: this.opcionSeleccionada === 'Camping para Parejas' ? this.data[0] : this.data[1],
        dataRestaurante: this.productosRestaurante
      },
      total: this.totalPagar,
      cedula: localStorage.getItem('cedula')
    };

    this.enviarPedidoCampingService.envioPedidoCamping(pedidoCamping).subscribe(data => {
      if (data !== null) {
        Swal.fire({
          title: 'Reserva Exitosa',
          text: 'Su reserva ha sido realizada con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.router.navigate(['/servicios']);
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Hubo un problema al procesar su reserva. Por favor, inténtelo de nuevo más tarde.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }

}
