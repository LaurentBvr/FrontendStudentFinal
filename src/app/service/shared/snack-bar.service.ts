import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  public openSnackBar(message: string, action: string, duration: number | null = (2 * 1000)) {
    if (duration) {
      this._snackBar.open(message, action, { duration: duration });
    }
    else {
      this._snackBar.open(message, action);
    }

  }
}
