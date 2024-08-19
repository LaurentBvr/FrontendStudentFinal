import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CourseModel } from '../../models/course.model';
import { CourseCreationModel } from '../../models/course.creation.model';
import { CourseUpdateModel } from '../../models/course.update.model';
import { API } from '../../constants/api'

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  constructor(
    private http: HttpClient
  ) { }

  public async getCourses(): Promise<Array<CourseModel>> {
    const url: string = `${API.API_URL}/Course`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json' }));
      return respons as Array<CourseModel>;
    }
    catch (error) {
      console.log('Error when get courses :', error);
      throw error;
    }
  }

  public async getCoursesByInstructorId(id: string): Promise<Array<CourseModel>> {
    const url: string = `${API.API_URL}/Course/instructor/${id}`;

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { responseType: 'json' }));
      return respons as Array<CourseModel>;
    }
    catch (error) {
      console.log('Error when get courses by instructor id :', error);
      throw error;
    }
  }

  public async creatCourse(name: string, courseYear: number): Promise<CourseModel> {
    const url: string = `${API.API_URL}/Course`;

    const courseToCreat: CourseCreationModel = {
      name: name,
      courseYear: courseYear
    }

    try {
      const respons: any = await firstValueFrom(this.http.post(url, courseToCreat, { responseType: 'json' }));
      return respons as CourseModel;
    }
    catch (error) {
      console.log('Error when creat courses :', error);
      throw error;
    }
  }

  public async updateCrouse(id: string, name: string, courseYear: number): Promise<CourseModel> {
    const url: string = `${API.API_URL}/Course/${id}`;

    const courseToEdit: CourseUpdateModel = {
      courseId: id,
      name: name,
      courseYear: courseYear
    }

    try {
      const respons: any = await firstValueFrom(this.http.put(url, courseToEdit, { responseType: 'json' }));
      return respons as CourseModel;
    }
    catch (error) {
      console.log('Error when edit courses :', error);
      throw error;
    }
  }

  public async deleteCourseById(id: string): Promise<void> {
    const url: string = `${API.API_URL}/Course/${id}`;

    try {
      await firstValueFrom(this.http.delete(url, { responseType: 'json' }));
    }
    catch (error) {
      console.log('Error when delete courses :', error);
      throw error;
    }
  }
}
