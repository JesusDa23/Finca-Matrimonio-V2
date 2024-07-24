import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObtenerMenuService {


  baseUrl: String = environment.baseUrl
  constructor( private http: HttpClient  ) { }

  getMenu(){
    return this.http.get<any>(`${this.baseUrl}/api/menu`)
  }

  guardarSeleccion(seleccion: any) {
    return this.http.post<any>(`${this.baseUrl}/api/pedidos`, seleccion);
  }
}
