import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultarPedidoService {

  
  baseUrl = 'http://localhost:4000/api'
    
  constructor(private http: HttpClient) {
   }

  obtenerDatosCliente(cedula:string){
    return this.http.get<any>(`${this.baseUrl}/cliente/${cedula}`)
   }

  obtenerDatosReserva(cedula:string){
    return this.http.get<any>(`${this.baseUrl}/reservas/${cedula}`)
  }
    
  obtenerDatosPedidos(cedula:string){
    return this.http.get<any>(`${this.baseUrl}/pedidos/${cedula}`)
  }

  obetnerDatosCamping(cedula:string){
    return this.http.get<any>(`${this.baseUrl}/pedidocamping/${cedula}`)
  }

  
}
