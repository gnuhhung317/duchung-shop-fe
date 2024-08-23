import { Injectable } from '@angular/core';
import { environment } from '../env/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private  getProductApiUrl = `${environment.apiUrl}/products`;
  private apiHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http:HttpClient) { }

  getProducts(page:number,limit:number,categoryId:number,keyword:string): Observable<any> {
    
    const param = new HttpParams().set('page',page).set('limit',limit).set('categoryId',categoryId).set('keyword',keyword);
    return this.http.get<any>(this.getProductApiUrl, {params:param, headers:this.apiHeader.headers});
  }
  getProductsByIds(idList:number[]){
    let ids = idList.join(",");
    return this.http.get<any>(this.getProductApiUrl+`/byIds`,{headers:this.apiHeader.headers,params:{ids}});
  }
  getProduct(id:number){
    
    return this.http.get<any>(this.getProductApiUrl+`/${id}`,this.apiHeader)
  }
  getProductImages(id:number){
    return this.http.get<any>(this.getProductApiUrl+`/${id}/images`);
  }
  getErrorImage(): string {
    return this.getProductApiUrl+"/images/404-error.jpg"
  }

}
