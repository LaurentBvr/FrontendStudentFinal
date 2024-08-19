import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PersonModel } from '../../models/person.model';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { PersonCreationModel } from '../../models/person.creation.model';
import { PersonUpdateModel } from '../../models/person.update.model';
import { API } from '../../constants/api'

@Injectable({
  providedIn: 'root'
})
export class UserService {


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
    const url: string = `${API.API_URL}/Student`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json' }));
      return respons as Array<PersonModel>;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async creatStudent(email: string, firstName: string, lastName: string, password: string): Promise<PersonModel> {
    const url: string = `${API.API_URL}/Student/`;

    const personToCreat: PersonCreationModel = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    }

    try {
      const personCreated: any = await firstValueFrom(this.http.post(url, personToCreat, { responseType: 'json' }));
      return personCreated as PersonModel
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async updateStudent(id: string, email: string, firstName: string, lastName: string, password: string): Promise<PersonModel> {
    const url: string = `${API.API_URL}/Student/${id}`;

    const personToUpdate: PersonUpdateModel = {
      personId: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    }

    try {
      const personCreated: any = await firstValueFrom(this.http.put(url, personToUpdate, { responseType: 'json' }));
      return personCreated as PersonModel;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async deleteStudentById(id: string): Promise<void> {
    const url: string = `${API.API_URL}/Student/${id}`;

    try {
      await firstValueFrom(this.http.delete(url, { responseType: 'json' }));
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getInstructors(): Promise<Array<PersonModel>> {
    const url: string = `${API.API_URL}/Instructor`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json' }));
      return respons as Array<PersonModel>;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async creatInstructor(email: string, firstName: string, lastName: string, password: string): Promise<PersonModel> {
    const url: string = `${API.API_URL}/Instructor/`;

    const personToCreat: PersonCreationModel = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    }

    try {
      const personCreated: any = await firstValueFrom(this.http.post(url, personToCreat, { responseType: 'json' }));
      return personCreated as PersonModel
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async updateInstructor(id: string, email: string, firstName: string, lastName: string, password: string): Promise<PersonModel> {
    const url: string = `${API.API_URL}/Instructor/${id}`;

    const personToUpdate: PersonUpdateModel = {
      personId: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    }

    try {
      const personCreated: any = await firstValueFrom(this.http.put(url, personToUpdate, { responseType: 'json' }));
      return personCreated as PersonModel;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async deleteInstructorById(id: string): Promise<void> {
    const url: string = `${API.API_URL}/Instructor/${id}`;

    try {
      await firstValueFrom(this.http.delete(url, { responseType: 'json' }));
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }
}
