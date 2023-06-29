import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { MessagesService } from '../../services/messages.service';
import { AcademyProgramService } from '../../services/academy-program.service';
import { UploadMessage } from '../../../interfaces/upload.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  loader: boolean = false;
  clicked: boolean = false;
  message: string = '';
  textArea!: boolean;
  file?: File;
  uploadForm!: FormGroup;
  dataAcademySelect: any = [];


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly uploadService: UploadService,
    private readonly showMessages: MessagesService,
    private readonly academyService: AcademyProgramService,
    private readonly router: Router,

  ) { }

  ngOnInit(): void {
    this.academyService.findAll().subscribe({
      next: (resp) => {
        this.dataAcademySelect = resp;
      },
      error: (e) => this.showMessages.openSnackBar(e),
      complete: () => {
        this.uploadForm = this.formBuilder.group({
          cod_proceso: [1, [Validators.required]],
          nombrepublico_recurso:['',[ Validators.required ]],
          estado:['',[ Validators.required ]],
          cod_programa:['',[ Validators.required ]],
          desc_recurso:['', [Validators.required]]
        });
      }
    })
  }

  hasSpaceTextArea( text: string ) {
    return this.textArea = text.indexOf(' ') >= 0;

  }

  fieldNotValid( value:string): boolean {
    if ( this.uploadForm.get( value )?.invalid && this.uploadForm.touched ){
      return true;
		}
		else{
      return false;
		}
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

  sendRegister(): void {
    if( this.uploadForm.invalid ) { this.uploadForm.markAllAsTouched(); return; }

    if( this.textArea ) {

      this.loader = true;
      this.clicked = true;
      this.uploadService.createDocs( this.uploadForm.value, this.file ).subscribe({
        next: (v) => {},
        error: (error: UploadMessage ) => {
          if (error.status === 401 ) this.showMessages.openSnackBar( `Extensiones Permitidas Word - Excel - PDF` );
          this.loader = false;
          this.clicked = false;
        },
        complete: () => {
          this.showMessages.openSnackBar( `Registro guardado exitosamente` );
          this.loader = false;
          this.clicked = false;
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard');
          }, 1000);
        }
      });
    }
  }
}
