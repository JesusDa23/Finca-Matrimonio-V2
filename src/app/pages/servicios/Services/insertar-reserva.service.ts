import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsertarReservaService {

  baseUrl = 'http://localhost:4000/api';
  private selectedServiceId: any;

  constructor(private http: HttpClient) { }

  insertarCliente(nuevaCliente:any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/cliente`, nuevaCliente)
  }

  insertarReserva(nuevaReserva:any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/reservas`, nuevaReserva)
  }

  idCard(id: number): void {
    this.selectedServiceId = id;
  }

  obtenerIdCard(): any {
    return this.selectedServiceId;
  }

}
