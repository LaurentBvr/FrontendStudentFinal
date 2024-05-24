import { UserService } from './../../service/api/user.service';
import { CommonModule } from '@angular/common';
import { CourseService } from './../../service/api/course.service';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CourseModel } from '../../models/course.model';
import { CourseComponent } from '../course/course.component';
import { Roles } from '../../constants/roles';

@Component({
  selector: 'app-catalog-courses',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatDividerModule, CourseComponent ],
  templateUrl: './catalog-courses.component.html',
  styleUrl: './catalog-courses.component.scss'
})
export class CatalogCoursesComponent implements OnInit {

  public coursesToShow: Array<CourseModel> = [];
  public role: Roles;

  constructor(
    private courseService: CourseService,
    private userService: UserService
  ) {}

  public async ngOnInit(): Promise<void> {
    this.role = this.userService.getCurrentUser().role;

    if (this.role == Roles.INSTRUCTOR) {
      this.coursesToShow = await this.getCoursesByInstructorId();
    }
    else if (this.role == Roles.STUDENT) {
      this.coursesToShow = await this.getCourses();
    }
  }

  private async getCourses(): Promise<Array<CourseModel>> {
    try {
      return await this.courseService.getCourses();
    }
    catch (error) {
      console.log(error);
      return [];
    }
  }

  private async getCoursesByInstructorId(): Promise<Array<CourseModel>> {
    try {
      return await this.courseService.getCoursesByInstructorId(this.userService.getCurrentUser().personId);
    }
    catch (error) {
      console.log(error);
      return [];
    }
  }
}
