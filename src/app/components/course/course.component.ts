import { InscriptionService } from './../../service/api/inscription.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CourseModel } from '../../models/course.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { Roles } from '../../constants/roles';
import { MatIconModule } from '@angular/material/icon';
import { AssignmentsComponent } from './assignments/assignments.component';
import { PersonModel } from '../../models/person.model';
import { UserService } from '../../service/api/user.service';
import { InscriptionCreationModel } from '../../models/inscrition.creation.model';
import { SnackBarService } from '../../service/shared/snack-bar.service';
import { InscriptionModel } from '../../models/inscription.model';
import { CourseService } from '../../service/api/course.service';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatMenuModule, MatIconModule, AssignmentsComponent ],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})
export class CourseComponent implements OnInit {

  @Input() course: CourseModel;

  @Output() courseToUpdate = new EventEmitter<CourseModel>();
  @Output() onCourseToDelete = new EventEmitter<string>();

  public inscriptionsStudent: Array<InscriptionModel> = [];
  public inscriptions: Array<InscriptionModel> = [];
  public isStudent: boolean;
  public isInstructor: boolean;
  public isAdmin: boolean;
  public openOverlay: boolean;
  public courseIdAssignmentSelected: string;
  public roleType: typeof Roles = Roles;
  public canRegister: boolean;
  public showInscription: boolean;
  public personIds: Array<string> = [];
  public showInscriptions: boolean;

  private currentUser: PersonModel;

  constructor (
    private inscriptionService: InscriptionService,
    private userService: UserService,
    private snackBarService: SnackBarService,
  ) {}

  public async ngOnInit(): Promise<void> {
    this.currentUser = this.userService.getCurrentUser();

    this.isStudent = this.currentUser.role == this.roleType.STUDENT;
    this.isInstructor = this.currentUser.role == this.roleType.INSTRUCTOR;
    this.isAdmin = this.currentUser.role == this.roleType.ADMIN;

    await this.getInscriptions();
    await this.getInscriptionsStudent();
  }

  public async getInscriptionsStudent(): Promise<void> {
    try {
      this.inscriptionsStudent = await this.inscriptionService
        .getInscriptionByPersonId(this.userService.getCurrentUser().personId);

      const inscriptionFound: InscriptionModel | undefined = this.inscriptionsStudent
        .find((i: InscriptionModel) => i.personId == this.currentUser.personId && i.courseId == this.course.courseId);

      this.showInscription = inscriptionFound != null;
      this.canRegister = inscriptionFound == null;

    } catch (error) {
      this.snackBarService.openSnackBar("Désoler l'inscription est hors service pour le moment!", "OK", null)
    }
  }

  public async getInscriptions(): Promise<void> {
    try {
      this.inscriptions = await this.inscriptionService.getInscriptions();

      const inscriptionsFiltered: Array<InscriptionModel> = this.inscriptions
        .filter((i: InscriptionModel) => i.courseId == this.course.courseId);

      this.personIds = inscriptionsFiltered.map((i: InscriptionModel) => i.personId);

    } catch (error) {
      this.snackBarService.openSnackBar("Désoler l'inscription est hors service pour le moment!", "OK", null)
    }
  }

  public onCoursUpdate(course: CourseModel): void {
    this.courseToUpdate.emit(course);
  }

  public onDeleteCourse(courseId: string): void {
    this.onCourseToDelete.emit(courseId)
  }

  public async registerStudent(courseIdSelected: string): Promise<void> {
    const inscriptionCreation: InscriptionCreationModel = {
      personId: this.currentUser.personId,
      courseId: courseIdSelected
    }

    try {
      await this.inscriptionService.registerStudent(inscriptionCreation);

      this.showInscription = true;
      this.canRegister = true;

      this.snackBarService.openSnackBar("Inscription réusie !", "OK")
    } catch (error) {
      this.snackBarService.openSnackBar("L'inscription a échoué !", "OK", null)
    }
  }
}
