import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseProducts } from '../interfaces/response-products';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl: String = environment.baseUrl
  
  constructor(private http: HttpClient) {
  }

  getProducts(){
    return this.http.get<ResponseProducts>(`${this.baseUrl}/api/products`);
  }
}
