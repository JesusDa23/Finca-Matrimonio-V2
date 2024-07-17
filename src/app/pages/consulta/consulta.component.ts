import { Component, Input, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultarPedidoService } from './services/consultar-pedido.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.css'
})
export class ConsultaComponent {
  
  dataPedido:any;
 
  constructor(private formBuilder: FormBuilder, private consultaService: ConsultarPedidoService,private router: Router){}

  numeroIdentificacion: FormGroup = this.formBuilder.group({
    cedula: ['', [Validators.required]],
  })
  
  enviarConsulta(){

  const cedula = this.numeroIdentificacion.value.cedula;
  localStorage.setItem('cedula', cedula )

  this.consultaService.obtenerDatosCliente(cedula).subscribe(data => {
    if (data.data === null ){
      Swal.fire({
        icon: 'info',
        title: 'No tiene reservas disponibles',
        html: '¿Desea realizar una nueva reserva? <a href="/servicios" class="alert-link">Click aquí</a>',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/servicios']);
        }
      });
    } else {
      this.router.navigate(['/mostrar']);
    }
  })
  

}


}
