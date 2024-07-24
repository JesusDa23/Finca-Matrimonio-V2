import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsertarReservaService {

  baseUrl: String = environment.baseUrl
  private selectedServiceId: any;

  constructor(private http: HttpClient) { }

  insertarCliente(nuevaCliente:any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/cliente`, nuevaCliente)
  }

  // insertarReserva(nuevaReserva:any): Observable<any>{
  //   return this.http.post<any>(`${this.baseUrl}/reservas`, nuevaReserva)
  // }

  idCard(id: number): void {
    this.selectedServiceId = id;
  }

  obtenerIdCard(): any {
    return this.selectedServiceId;
  }

}
