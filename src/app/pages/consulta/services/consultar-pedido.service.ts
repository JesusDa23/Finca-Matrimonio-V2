import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultarPedidoService {

  
  baseUrl: String = environment.baseUrl
    
  constructor(private http: HttpClient) {
   }

  obtenerDatosCliente(cedula:string){
    return this.http.get<any>(`${this.baseUrl}/api/cliente/${cedula}`)
   }

  obtenerDatosReserva(cedula:string){
    return this.http.get<any>(`${this.baseUrl}/api/reservas/${cedula}`)
  }
    
  obtenerDatosPedidos(cedula:string){
    return this.http.get<any>(`${this.baseUrl}/api/pedidos/${cedula}`)
  }

  obetnerDatosCamping(cedula:string){
    return this.http.get<any>(`${this.baseUrl}/api/pedidocamping/${cedula}`)
  }

  
}
