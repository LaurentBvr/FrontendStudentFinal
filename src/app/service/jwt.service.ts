import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor() {}

  public decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return this.decodeToken(token);
    }
    return null;
  }

  public getEmail(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.email : null;
  }

  public getRole(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.role : null;
  }

  public getsId(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.sId : null;
  }

  public getLastName(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.lastName : null;
  }

  public getFirstName(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.firstName : null;
  }
}
