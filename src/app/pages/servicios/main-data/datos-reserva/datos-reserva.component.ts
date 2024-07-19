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

  
  
}
