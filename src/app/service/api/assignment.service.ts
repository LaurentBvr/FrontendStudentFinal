import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../constants/api'
import { AssignmentModel } from '../../models/assignment.model';
import { firstValueFrom } from 'rxjs';
import { AssignmentUpdateModel } from '../../models/assignment.update.model'
import { AssignmentCreationModel } from '../../models/assignment.creation.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(
    private http: HttpClient
  ) { }

  public async getAssignmentsByCourseId(courseId: string): Promise<Array<AssignmentModel>> {
    console.log(courseId);

    const url: string = `${API.API_URL}/Assignment/byCourseId/${courseId}`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json' }));
      return respons as Array<AssignmentModel>;
    }
    catch (error) {
      console.log('Error when get assignments :', error);
      throw error;
    }
  }

  public async creatAssignment(title: string, courseId: string, totalGrade: number): Promise<AssignmentModel> {
    const url: string = `${API.API_URL}/Assignment/`;

    const assignmentToCreat: AssignmentCreationModel = {
      title: title,
      courseId: courseId,
      totalGrade: totalGrade
    }

    try {
      const assignmentCreated: any = await firstValueFrom(this.http.post(url, assignmentToCreat, { responseType: 'json' }));
      return assignmentCreated as AssignmentModel
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async updateAssignment(id: string, title: string, courseId: string, totalGrade: number): Promise<AssignmentModel> {
    const url: string = `${API.API_URL}/Assignment/${id}`;

    console.log(id);

    const assignmentToUpdate: AssignmentUpdateModel = {
      title: title,
      courseId: courseId,
      totalGrade: totalGrade
    }

    console.log(assignmentToUpdate);


    try {
      const assignmentUpdated: any = await firstValueFrom(this.http.put(url, assignmentToUpdate, { responseType: 'json' }));
      return assignmentUpdated as AssignmentModel;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async deleteStudentById(id: string): Promise<void> {
    const url: string = `${API.API_URL}/Assignment/${id}`;

    try {
      await firstValueFrom(this.http.delete(url, { responseType: 'json' }));
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }
}
