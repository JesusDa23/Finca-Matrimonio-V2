      import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CompartiCedulaService {


  productosRestaurante: []= [];


  setProductRestaurante(productosRestaurante:any,) {
    this.productosRestaurante = productosRestaurante;
  }


  getProductRestaurante(): any{
    return this.productosRestaurante
  }

}
