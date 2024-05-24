import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonModel } from '../../models/person.model';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { PersonCreationModel } from '../../models/person.creation.model';
import { PersonUpdateModel } from '../../models/person.update.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlAPI: string = "http://localhost:5151/api"

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  public setCurrentUser(currentUser: PersonModel): void {
    this.currentUserSubject.next(currentUser);
  }

  public getCurrentUser(): PersonModel {
    return this.currentUserSubject.value;
  }

  public async getStudents(): Promise<Array<PersonModel>> {
    const url: string = `${this.urlAPI}/Student`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { headers, responseType: 'json' }));
      return respons as Array<PersonModel>;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async creatStudent(email: string, firstName: string, lastName: string, password: string): Promise<PersonModel> {
    const url: string = `${this.urlAPI}/Student/`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

    const personToCreat: PersonCreationModel = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    }

    try {
      const personCreated: any = await firstValueFrom(this.http.post(url, personToCreat, { headers, responseType: 'json' }));
      return personCreated as PersonModel
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async updateStudent(id: string, email: string, firstName: string, lastName: string, password: string): Promise<PersonModel> {
    const url: string = `${this.urlAPI}/Student/${id}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

    const personToUpdate: PersonUpdateModel = {
      personId: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    }

    try {
      const personCreated: any = await firstValueFrom(this.http.put(url, personToUpdate, { headers, responseType: 'json' }));
      return personCreated as PersonModel;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async deleteStudentById(id: string): Promise<void> {
    const url: string = `${this.urlAPI}/Student/${id}`;

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

    try {
      await firstValueFrom(this.http.delete(url, { headers, responseType: 'json' }));
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }
}
