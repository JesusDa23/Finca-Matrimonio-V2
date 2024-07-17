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

  })


  
  enviarReserva (): void {
    if (this.mainData.valid !== null) {
      if (this.mainData.valid) {
          this.reservaService.insertarCliente(this.mainData.value).subscribe(
              response => {
                  if (response.ok) {
                      Swal.fire({
                          icon: 'success',
                          title: 'Datos guardados',
                          text: 'La reserva ha sido guardada exitosamente.'
                      }).then(() => {
                          localStorage.setItem( 'cedula', this.mainData.value.cedula )
                          this.router.navigate(['reservas']);
                      });
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
}}