import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  
  descripcion: any;

  constructor() { }

  setDescripcion(descripcion: string){
    this.descripcion = descripcion
  }

  getDescripcion(){
    return this.descripcion
  }
}
