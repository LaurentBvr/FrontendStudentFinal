import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    public isLoggedIn = new BehaviorSubject<boolean>(false);
    public isLoggedIn$ = this.isLoggedIn.asObservable();

    constructor(
      private http: HttpClient
    ) { }


    public setIsLoggedIn(value: boolean): void {
      this.isLoggedIn.next(value)
    }

    public async login(email: string, password: string): Promise<any> {
      const url: string = `http://localhost:5151/api/Auth/login`;

      try {
        const response: any = await firstValueFrom(this.http.post(url, { email: email, password: password }, { responseType: 'json' }));

        this.isLoggedIn.next(true);

        return response;
      }
      catch (error) {
        console.log('Error when login :', error);
        throw error;
      }
    }
    public async validateToken(token: string): Promise<void>{
      const url: string = `http://localhost:5151/api/Auth/validate`;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      try {
        await firstValueFrom(this.http.get(url,{headers}));
        this.isLoggedIn.next(true);
      }
      catch (error) {
        console.log('Error when get validateToken :', error);
        throw error;
      }
    }
}
