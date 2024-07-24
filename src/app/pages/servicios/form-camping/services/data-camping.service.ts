import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataCampingService {

  baseUrl: String = environment.baseUrl

  constructor(private http:HttpClient) { }
  obtenerDatos(){
    return this.http.get(`${this.baseUrl}/api/camping`)
  }

  envioPedidoCamping(dataCamping:any){
    return this.http.post(`${this.baseUrl}/api/pedidocamping`, dataCamping)
  }
}
