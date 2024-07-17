import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CafeService {

  urlApi = 'http://localhost:4000/api/cafe'
  urlApi2 = 'http://localhost:4000/api/pedidocafe'

  constructor(private http: HttpClient) { }

  obtenerCafe(){
    return this.http.get(`${this.urlApi}`)
  }

  getCafeById( id: any ) {
    return this.http.get(`${this.urlApi}/${ id }`)
  }

  enviarPedidoCafe(pedido:any){
    return this.http.post<any>(`${this.urlApi2}`,pedido)

  }

}
