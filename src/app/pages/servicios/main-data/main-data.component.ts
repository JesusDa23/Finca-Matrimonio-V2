import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InsertarReservaService } from '../Services/insertar-reserva.service';
import { CardServiceComponent } from '../card-service/card-service.component';
import { Router } from '@angular/router';
import { CompartiCedulaService } from '../Services/compartirCedula.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-data',
  templateUrl: './main-data.component.html',
  styleUrl: './main-data.component.css'
})
export class MainDataComponent {


  constructor(
    private formBuilder: FormBuilder,
    private reservaService: InsertarReservaService,
    private router: Router,
    private sharedDataService: CompartiCedulaService
  ){
  }


  mainData: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    cedula: ['', [Validators.required]],
    email: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    fechaReserva: ['', [Validators.required]],
    horaLlegada: ['', [Validators.required]],
    cantidadPersonas: ['', [Validators.required, Validators.min(1)]],
    // estado: ['', [Validators.required]],

  })



  
  enviarReserva (): void {
    if (this.mainData.valid !== null) {
      if (this.mainData.valid) {

          this.reservaService.insertarCliente(this.mainData.value).subscribe(
              response => {
                  if (response.ok) {
                    localStorage.setItem('cedula', this.mainData.get('cedula')?.value);
                    this.mostrarOtroForm();
                  } else {
                      Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Hubo un problema al guardar la reserva. Por favor, inténtelo de nuevo.'
                      });
                  }
              }
          );
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Formulario inválido',
              text: 'Por favor, revise los datos ingresados.'
          });
      }
  }
}

// gestiona tu reserva




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