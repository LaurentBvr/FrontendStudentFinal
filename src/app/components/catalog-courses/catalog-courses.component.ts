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
import { MatIconModule } from '@angular/material/icon';
import { CourseFormEditionComponent } from './form/course-form-edition/course-form-edition.component';
import { CourseFormCreationComponent } from './form/course-form-creation/course-form-creation.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../service/shared/snack-bar.service';
import { InscriptionModel } from '../../models/inscription.model';
import { InscriptionService } from '../../service/api/inscription.service';

@Component({
  selector: 'app-catalog-courses',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatDividerModule, CourseComponent, MatIconModule, CourseFormCreationComponent, CourseFormEditionComponent ],
  templateUrl: './catalog-courses.component.html',
  styleUrl: './catalog-courses.component.scss'
})
export class CatalogCoursesComponent implements OnInit {

  public coursesToShow: Array<CourseModel> = [];
  public role: Roles;
  public roleType: typeof Roles = Roles;
  public isStudent: boolean;
  public isInstructor: boolean;
  public isAdmin: boolean;
  public showOverlayCreationForm: boolean;
  public showOverlayUpdateForm: boolean;
  public courseToUpdate: CourseModel;

  public inscriptionsStudent: Array<InscriptionModel> = [];
  public inscriptions: Array<InscriptionModel> = [];

  constructor(
    private courseService: CourseService,
    private userService: UserService,
    public dialog: MatDialog,
    private snackBarService: SnackBarService,
    private inscriptionService: InscriptionService,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.role = this.userService.getCurrentUser().role;

    this.isStudent = this.role == this.roleType.STUDENT;
    this.isInstructor = this.role == this.roleType.INSTRUCTOR;
    this.isAdmin = this.role == this.roleType.ADMIN;

    if (this.role == Roles.INSTRUCTOR) {
      this.coursesToShow = await this.getCoursesByInstructorId();
      await this.getInscriptions();
    }
    else if (this.role == Roles.STUDENT) {
      this.coursesToShow = await this.getCourses();
      await this.getInscriptionsStudent()
    }
    else if (this.role == Roles.ADMIN) {
      this.coursesToShow = await this.getCourses();
      await this.getInscriptions();
    }

    // this.coursesToShow = [
    //     { "courseId": "8f83b93e-55d9-4942-be05-0323391c126a", "name": "Néerlandais", 'instructorName': "James",   "courseYear": 2  },
    //     { "courseId": "10fd38a2-22fa-4e73-aa7e-34a8ef239834", "name": "Géographie", 'instructorName': "James",    "courseYear": 4  },
    //     { "courseId": "b1d6e816-d93e-42fd-ba12-36c274222ba2", "name": "Mathématique", 'instructorName': "James",    "courseYear": 3  },
    //     { "courseId": "26929e85-b1b5-47ae-a7dc-5b8095dc5b60", "name": "Histoire", 'instructorName': "James",    "courseYear": 4  },
    //     { "courseId": "3640a216-bb84-4827-9bc2-ca9673c50cb3", "name": "Anglais", 'instructorName': "James",    "courseYear": 4  },
    //     { "courseId": "dcde56cf-0560-4508-834b-df543b61d3dd", "name": "Français", 'instructorName': "James", "courseYear": 1  }
    // ]
  }

  private async getCourses(): Promise<Array<CourseModel>> {
    try {
      return await this.courseService.getCourses();
    }
    catch (error) {
      this.snackBarService.openSnackBar("Les cours n'ont pas pu être chargé !", "OK", null);
      return [];
    }
  }

  private async getCoursesByInstructorId(): Promise<Array<CourseModel>> {
    try {
      return await this.courseService.getCoursesByInstructorId(this.userService.getCurrentUser().personId);
    }
    catch (error) {
      this.snackBarService.openSnackBar("Les cours n'ont pas pu être chargé !", "OK", null);
      return [];
    }
  }

  public async getInscriptions(): Promise<void> {
    try {
      this.inscriptions = await this.inscriptionService.getInscriptions();

    } catch (error) {
      this.snackBarService.openSnackBar("Désoler l'inscription est hors service pour le moment!", "OK", null)
    }
  }

  public async getInscriptionsStudent(): Promise<void> {
    try {
      this.inscriptionsStudent = await this.inscriptionService
        .getInscriptionByPersonId(this.userService.getCurrentUser().personId);

    } catch (error) {
      this.snackBarService.openSnackBar("Désoler l'inscription est hors service pour le moment!", "OK", null)
    }
  }

  public onCourseCreated(courseCreated: CourseModel): void {
    if (courseCreated) {
      this.showOverlayCreationForm = false;
      this.coursesToShow.push(courseCreated);
    }
  }

  public onCourseUpdated(courseUpdated: CourseModel): void {
    if (courseUpdated) {
      this.showOverlayUpdateForm = false;

      this.coursesToShow = this.coursesToShow
        .filter((course: CourseModel) => course.courseId != courseUpdated.courseId);

      this.coursesToShow.push(courseUpdated);
    }
  }

  public async onCourseToDelete(courseId: string): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmer la suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteCourseAfterConfirmation(courseId);
    });
  }

  public async deleteCourseAfterConfirmation(courseId: string): Promise<void> {
    if (courseId) {
      try {
        await this.courseService.deleteCourseById(courseId);

        this.coursesToShow = this.coursesToShow
          .filter((course: CourseModel) => course.courseId != courseId);

        this.snackBarService.openSnackBar("Le cours a bien été supprimé !", "OK")

      } catch (error) {
        this.snackBarService.openSnackBar("Le cours n'a pas pu être supprimé !", "OK", null);
      }
    }
  }

  public onCourseUpdate(course: CourseModel): void {
    this.showOverlayUpdateForm = true;
    this.courseToUpdate = course;
  }
}
