import { Injectable } from '@angular/core';
import { environment } from '../env/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  getErrorImage(): string {
    return this.getProductApiUrl+"/images/404-error.jpg"
  }

}
