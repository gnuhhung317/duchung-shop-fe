import { Injectable } from '@angular/core';
import { environment } from '../env/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private  getCategoryApiUrl = `${environment.apiUrl}/categories`;
  private apiHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http:HttpClient) { }

  getCategories(): Observable<any> {
    
    return this.http.get<any>(this.getCategoryApiUrl, { headers:this.apiHeader.headers});
  }
 

}
