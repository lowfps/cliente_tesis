import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private readonly _snackBar: MatSnackBar,

  ) { }

  openSnackBar( message: string ): void {
    this._snackBar.open( message, 'Aceptar', {
      duration: 4000
    });
  }
}
