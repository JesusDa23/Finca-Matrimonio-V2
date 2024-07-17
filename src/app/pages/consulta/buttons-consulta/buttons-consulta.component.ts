import { Component } from '@angular/core';
import { CompartiCedulaService } from '../../servicios/Services/compartirCedula.service';
import { BotonesConsultaService } from '../services/botones-consulta.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons-consulta',
  templateUrl: './buttons-consulta.component.html',
  styleUrl: './buttons-consulta.component.css'
})
export class ButtonsConsultaComponent {

  cedula: any = localStorage.getItem('cedula')

  constructor(private router: Router, private cancelarService: BotonesConsultaService) {}

  cancelarReserva() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: "¡Esta acción es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cancelar Reserva",
      cancelButtonText: "No cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.cancelarService.cancelarReserva(this.cedula).subscribe( data => {});
        this.cancelarService.cancelarrPedido(this.cedula).subscribe( data => {});
        this.cancelarService.cancelarCliente(this.cedula).subscribe( data => {});
        this.cancelarService.cancelarCamping(this.cedula).subscribe(data => {});
        localStorage.removeItem('cedula')

        swalWithBootstrapButtons.fire({
          title: "Reserva Cancelada!",
          text: "Tu reserva ha sido cancelada exitosamente",
          icon: "success"
        });

        this.router.navigate(['/consulta'])
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelación Abortada",
          text: "Tu reserva no ha sido cancelada",
          icon: "error"
        });
      }
    });
  }
}
