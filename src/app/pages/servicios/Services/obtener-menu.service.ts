import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObtenerMenuService {


  baseUrl = 'http://localhost:4000/api'
  constructor( private http: HttpClient  ) { }

  getMenu(){
    return this.http.get<any>(`${this.baseUrl}/menu`)
  }

  guardarSeleccion(seleccion: any) {
    return this.http.post<any>(`${this.baseUrl}/pedidos`, seleccion);
  }
}
