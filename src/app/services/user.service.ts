import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDto } from '../dtos/user/register.dto';
import { LoginDto } from '../dtos/user/login.dto';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private  registerApiUrl = `${environment.apiUrl}/users/register`;
  private loginApiUrl = `${environment.apiUrl}/users/login`;
  private apiHeader ={ headers: this.createHeaders()}
  constructor(private http: HttpClient) { }

  register(registerDto : RegisterDto):Observable<any>{
    return this.http.post(this.registerApiUrl,registerDto,this.apiHeader);
  }

  login(loginDto:LoginDto):Observable<any>{
    return this.http.post(this.loginApiUrl,loginDto,this.apiHeader);
  }
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
}
