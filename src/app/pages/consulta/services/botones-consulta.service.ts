import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BotonesConsultaService {


    baseUrl: String = environment.baseUrl

    constructor(private http: HttpClient) {}
  
    cancelarrPedido(cedula: any): Observable<any> {
      return this.http.delete(`${this.baseUrl}/api/pedidos/${cedula}`);
    }

    cancelarReserva(cedula: any): Observable<any> {
      return this.http.delete(`${this.baseUrl}/api/reservas/${cedula}`);
    }

    cancelarCliente(cedula: any): Observable<any> {
      return this.http.delete(`${this.baseUrl}/api/cliente/${cedula}`);
    }

    cancelarCamping(cedula: any): Observable<any> {
      return this.http.delete(`${this.baseUrl}/pedidoscamping/${cedula}`);
    }
}