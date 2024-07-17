import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BotonesConsultaService {
    baseUrl = 'http://localhost:4000/api';

    constructor(private http: HttpClient) {}
  
    cancelarrPedido(cedula: any): Observable<any> {
      return this.http.delete(`${this.baseUrl}/pedidos/${cedula}`);
    }

    cancelarReserva(cedula: any): Observable<any> {
      return this.http.delete(`${this.baseUrl}/reservas/${cedula}`);
    }

    cancelarCliente(cedula: any): Observable<any> {
      return this.http.delete(`${this.baseUrl}/cliente/${cedula}`);
    }

    cancelarCamping(cedula: any): Observable<any> {
      return this.http.delete(`${this.baseUrl}/pedidoscamping/${cedula}`);
    }
}