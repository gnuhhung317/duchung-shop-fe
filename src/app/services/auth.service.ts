import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN = 'jwt_token';
  constructor() { }

  getToken() : string | null {
    return window.localStorage.getItem(this.TOKEN);
  }
  setToken(token: string) {
    localStorage.setItem(this.TOKEN, token);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN);
  }
}
