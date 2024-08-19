import { Component, Input } from '@angular/core';
import { PersonModel } from '../../../../models/person.model';
import { UserService } from '../../../../service/api/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UserFormCreationComponent } from '../form/user-form-creation/user-form-creation.component';
import { UserFormUpdateComponent } from '../form/user-form-update/user-form-update.component';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from '../../../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '../../../../service/shared/snack-bar.service';

@Component({
  selector: 'app-tab-users',
  standalone: true,
  imports: [ CommonModule, MatTableModule, MatButtonModule, UserFormCreationComponent, UserFormUpdateComponent, MatIconModule ],
  templateUrl: './tab-users.component.html',
  styleUrl: './tab-users.component.scss'
})
export class TabUsersComponent {

  @Input() users: Array<PersonModel> = [];
  @Input() isStudents: Boolean;

  public displayedColumns: string[] = ['email', 'firstName', 'lastName', 'action'];

  public showOverlayCreationForm: boolean;
  public showOverlayUpdateForm: boolean;

  public userToUpdate: PersonModel;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {}

  public async onDelete(id: string): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmer la suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cet élément ?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteUserAfterConfirmation(id);
    });
  }

  public async deleteUserAfterConfirmation(id: string): Promise<void> {
    try {
      if (this.isStudents) {
        await this.userService.deleteStudentById(id);
        this.snackBarService.openSnackBar("L'étudiant a bien été supprimé !", "OK");
      }
      else {
        await this.userService.deleteInstructorById(id);
        this.snackBarService.openSnackBar("L'instructeur a bien été supprimé !", "OK");
      }

      this.users = this.users
        .filter((st: PersonModel) => st.personId != id);

    } catch (error) {
      this.snackBarService.openSnackBar("L'utilisateur n'a pas pu être supprimé !", "OK", null);
    }
  }

  public onUpdate(userToUpdate: PersonModel): void {
    this.showOverlayUpdateForm = true;
    this.userToUpdate = userToUpdate;
  }

  public onUserCreated(userCreated: PersonModel): void {
    if (userCreated) {
      this.showOverlayCreationForm = false;
      this.users.push(userCreated);
    }
  }

  public onUserUpdated(userUpdated: PersonModel): void {
    if (userUpdated) {
      this.showOverlayUpdateForm = false;

      this.users = this.users
        .filter((st: PersonModel) => st.personId != userUpdated.personId);

      this.users.push(userUpdated);
    }
  }
}
