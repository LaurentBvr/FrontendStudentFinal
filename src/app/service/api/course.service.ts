import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CourseModel } from '../../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {

  private urlAPI: string = "http://localhost:5151/api"

  constructor(
    private http: HttpClient
  ) { }

  public async getCourses(): Promise<Array<CourseModel>> {
    const url: string = `${this.urlAPI}/Course`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { headers, responseType: 'json' }));
      return respons as Array<CourseModel>;
    }
    catch (error) {
      console.log('Error when get courses :', error);
      throw error;
    }
  }

  public async getCoursesByInstructorId(id: string): Promise<Array<CourseModel>> {
    const url: string = `${this.urlAPI}/Course/instructor/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

    try {
      const respons: any = await firstValueFrom(this.http.get(url, { headers, responseType: 'json' }));
      return respons as Array<CourseModel>;
    }
    catch (error) {
      console.log('Error when get courses by instructor id :', error);
      throw error;
    }
  }
}
