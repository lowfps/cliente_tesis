import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { MessagesService } from '../../services/messages.service';


@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.scss']
})
export class EditFileComponent {
  textArea!: boolean;
  loader: boolean = false;
  clicked: boolean = false;
  uploadForm!: FormGroup;
  message: string = '';
  cod_recurso: string = '';
  file?: File;


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly activatedroute: ActivatedRoute,
    private readonly uploadService: UploadService,
    private readonly messageService:MessagesService

  ) { }

  ngOnInit(): void {
    this.activatedroute.params
    .pipe(
      switchMap( ({ cod_programa }) => this.uploadService.getDocumentoById( cod_programa ) )
    ).subscribe({
      next: (resp: any ) => {
        console.log(resp[0]);
        this.cod_recurso = resp[0].cod_recurso
        this.uploadForm = this.formBuilder.group({
          nombrepublico_recurso:[resp[0].nombrepublico_recurso,[ Validators.required ]],
          estado:[resp[0].estado,[ Validators.required ]],
          desc_recurso:[resp[0].desc_recurso, Validators.required ]
        });
      },
      error: (e) => this.messageService.openSnackBar(e),
    });
  }

  hasSpaceTextArea( text: string ) {
    return this.textArea = text.indexOf(' ') >= 0;

  }

  onselectFile( event: any): void {

    if ( event.target.files ) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = ( e:any ) => {
        this.file = event.target.files[0];
      }
    }
  }

  updateRegister(): void {
    if( this.uploadForm.invalid ) { this.uploadForm.markAllAsTouched(); return; }
    // this.loader = true;
    // this.clicked = true;
    // console.log(this.uploadForm.value);

    this.uploadService.update( this.cod_recurso, this.uploadForm.value, this.file ).subscribe({
      next: (v) => this.messageService.openSnackBar('Registro actualizado'),
      error: (e) => this.messageService.openSnackBar(e),
      complete: () => {
        this.loader = false;
        this.clicked = false;
      }
    });
  }

  fieldNotValid( value:string): boolean {
    if ( this.uploadForm.get( value )?.invalid && this.uploadForm.touched ){
      return true;
		}
		else{
      return false;
		}
	}


}
