import { Component, Input } from '@angular/core';
import { CourseModel } from '../../models/course.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatDividerModule ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent {

  @Input() course: CourseModel;

}
