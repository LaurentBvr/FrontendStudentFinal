
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { API } from '../../constants/api'

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add header to interceptor for API
    const modifiedReq = this.modifyRequest(req);

    // Next handle
    return next.handle(modifiedReq).pipe(
      tap(),
      catchError((error: HttpErrorResponse) => {

        console.log("Error in interceptor: ", error);
        return throwError(() => new Error('Something bad happened; please try again later.'));

      })
    );
  }

  private modifyRequest(req: HttpRequest<any>): HttpRequest<any> {
    if (req.url && req.url.includes(API.API_URL)) {

      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

      return req.clone({ headers });
    }
    return req;
  }

}
