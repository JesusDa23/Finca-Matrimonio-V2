import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntradasService {

  entradas: any[] = [];
  total: number = 0

  constructor() { }

  agregarEntrada(entrada: any) {
    this.entradas.push(entrada);
  }

  obtenerEntradas(): any[] {
    return this.entradas;
  }



  setTotal(total: number){
    this.total = total
  }

  getTotal(){
    return this.total
  }
}
