import {  Component, OnInit } from '@angular/core';
import { ConsultarPedidoService } from '../services/consultar-pedido.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-pedido',
  templateUrl: './mostrar-pedido.component.html',
  styleUrl: './mostrar-pedido.component.css'
})
export class MostrarPedidoComponent implements OnInit {

  constructor(private consultaService: ConsultarPedidoService){}
  dataCliente:any;
  dataReserva:any;
  dataPedido: any;
  dataCamping: any;

  dataSoloCamping: any;
  dataRestauranteCamping: any;

  cedula:any = localStorage.getItem('cedula')


  nomostrarDataCamping = true

  ngOnInit(){
    this.enviarConsulta()
  }

   async enviarConsulta(){
     // Consultar los datos de camping primero para determinar qué conjunto de solicitudes realizar
    this.consultaService.obetnerDatosCamping(this.cedula).subscribe(async campingData => {
      this.dataCamping = campingData.data;

      if (this.dataCamping == null) {
        // Si los datos de camping son nulos, realizar las primeras consultas
        const data = await Promise.all([
          this.consultaService.obtenerDatosReserva(this.cedula),
          this.consultaService.obtenerDatosCliente(this.cedula),
          this.consultaService.obtenerDatosPedidos(this.cedula)
        ]);

        data[0].subscribe(data => {
          this.dataReserva = data.data;
        });
        data[1].subscribe(data => {
          this.dataCliente = data.data;
        });
        data[2].subscribe(data => {
          this.dataPedido = data.data;
        });

      } else {
        // Si los datos de camping no son nulos, realizar las otras consultas
        const data = await Promise.all([
          this.consultaService.obtenerDatosReserva(this.cedula),
          this.consultaService.obtenerDatosCliente(this.cedula),
        ]);

        data[0].subscribe(data => {
          this.dataReserva = data.data;
        });
        data[1].subscribe(data => {
          this.dataCliente = data.data;
        });

      }
    });
  }
  }


  



// Swal.fire({
//   icon: 'info',
//   title: 'No tiene reservas disponibles',
//   html: '¿Desea realizar una nueva reserva? <a href="/servicios" class="alert-link">Click aquí</a>',
//   showCancelButton: true,
//   cancelButtonText: 'Cancelar',
//   confirmButtonText: 'Aceptar',
//   confirmButtonColor: '#3085d6',
//   cancelButtonColor: '#d33'
// });