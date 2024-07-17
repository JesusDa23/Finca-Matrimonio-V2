import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsertarReservaService } from '../../Services/insertar-reserva.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-reserva',
  templateUrl: './datos-reserva.component.html',
  styleUrl: './datos-reserva.component.css'
})
export class DatosReservaComponent {
  
  constructor( private formBuilder: FormBuilder, private reservaService: InsertarReservaService, private router: Router){}

  cedulaCliente = localStorage.getItem('cedula')

  datosReserva: FormGroup = this.formBuilder.group({
    fechaReserva: ['', [Validators.required]],
    horaLlegada: ['', [Validators.required]],
    cantidadPersonas: ['', [Validators.required, Validators.min(1)]],
    estado: ['', [Validators.required]],
    cedula: this.cedulaCliente
  })


  enviarReserva(){
    this.reservaService.insertarReserva(this.datosReserva.value).subscribe( data => {
    })

    this.mostrarOtroForm()
  }

  mostrarOtroForm(): void {
    const selectedServiceId = this.reservaService.obtenerIdCard()

    if (selectedServiceId !== null) {
      switch (selectedServiceId) {
        case 1:
          this.router.navigate(['/restaurante']);
          break;
        case 2:
          this.router.navigate(['/eventos']);
          break;
        case 3:
          this.router.navigate(['/camping']);
          break;
        default:
          console.log('Service ID no coincide con 1, 2 o 3');
          break;
      }
    } else {
      console.log('No se ha seleccionado ningún servicio');
    }
  }
  
}
