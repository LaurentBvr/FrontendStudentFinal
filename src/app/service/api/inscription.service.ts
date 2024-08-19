import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../constants/api'
import { firstValueFrom } from 'rxjs';
import { InscriptionCreationModel } from '../../models/inscrition.creation.model';
import { InscriptionModel } from '../../models/inscription.model';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient) { }

  public async registerStudent(inscriptionToCreate: InscriptionCreationModel): Promise<InscriptionModel> {
    const url: string = `${API.API_URL}/Inscription`;

    try {
      const respons: any = await firstValueFrom(this.http.post(url, inscriptionToCreate, { responseType: 'json' }));
      return respons as InscriptionModel;
    } catch (error) {
      throw error;
    }
  }

  // public async getInscriptionByCourseId(courseId: string): Promise<Array<InscriptionModel>> {
  //   const url: string = `${API.API_URL}/Inscription/byCourseId/${courseId}`;

  //   try {
  //     const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json' }));
  //     return respons as Array<InscriptionModel>;
  //   }
  //   catch (error) {
  //     throw error;
  //   }
  // }

  public async getInscriptions(): Promise<Array<InscriptionModel>> {
    const url: string = `${API.API_URL}/Inscription`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json' }));
      return respons as Array<InscriptionModel>;
    }
    catch (error) {
      throw error;
    }
  }

  public async getInscriptionByPersonId(personId: string): Promise<Array<InscriptionModel>> {
    const url: string = `${API.API_URL}/Inscription/byPersonId/${personId}`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json' }));
      return respons as Array<InscriptionModel>;
    }
    catch (error) {
      throw error;
    }
  }
}
