import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AcademyData } from '../../../../interfaces/academy.interfaces';
import { AcademyProgramService } from '../../../services/academy-program.service';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-academy-dialog',
  templateUrl: './academy-dialog.component.html',
  styleUrls: ['./academy-dialog.component.scss']
})
export class AcademyDialogComponent implements OnInit {

  loader: boolean = false;
  clicked: boolean = false;
  message: string = '';
  academyFormUpdate!: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<AcademyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AcademyData,
    private readonly formBuilder: FormBuilder,
    private readonly academyProgramService: AcademyProgramService,
    private readonly messageService: MessagesService

  ){}

  ngOnInit(): void {
    this.academyFormUpdate = this.formBuilder.group({

      nombre_programa:[this.data.nombre_programa,[ Validators.required ]],

    });
  }

  DeletePopup() {

    if( this.academyFormUpdate.invalid ) {
      return;
    }
    else{
      this.loader = true;
      setTimeout(() => {
        this.academyProgramService.update(this.data.cod_programa,this.academyFormUpdate.value).subscribe({
          next: (resp) => this.messageService.openSnackBar(resp.mensaje),
          error: (e) => this.messageService.openSnackBar(e),
          complete: () => {
            this.loader = false;
            this.clicked = false;
            this.dialogRef.close( true );
          }
        })
      }, 500);
    }


  }
  ClosePopup() {
    this.dialogRef.close( false );
  }
}
