import { Component } from '@angular/core';
import { CatalogCoursesComponent } from '../../catalog-courses/catalog-courses.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-course-management',
  standalone: true,
  imports: [ CommonModule, CatalogCoursesComponent ],
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.scss'
})
export class CourseManagementComponent {
}
