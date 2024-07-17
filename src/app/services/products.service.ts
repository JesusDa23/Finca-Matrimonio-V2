import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseProducts } from '../interfaces/response-products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  constructor(private http: HttpClient) {
  }


  getProducts(){
    return this.http.get<ResponseProducts>('http://localhost:4000/api/products')
  }
}
