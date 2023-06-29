import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServicesService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  loader: boolean = false;
  clicked: boolean = false;
  message: string = '';

  registerForm = this.formBuilder.group({

    cod_rol:[1],
    nombre_usuario:['',[ Validators.required ]],
    correo_usuario:['',[ Validators.required, Validators.email ]],
    clave_usuario:['',[ Validators.required]],

  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _snackBar: MatSnackBar,
    private readonly authService: AuthServicesService
  ) { }


  openSnackBar( message: string ): void {
    this._snackBar.open( message, 'Aceptar', {
      duration: 4000
    });
  }

  fieldNotValid( value:string): boolean {
    if ( this.registerForm.get( value )?.invalid && this.registerForm.touched ){
      return true;
		}
		else{
      return false;
		}
	}
  sendRegister(): void {
    if( this.registerForm.invalid ) { this.registerForm.markAllAsTouched(); return; }
    this.loader = true;
    this.clicked = true;
    this.authService.registerAuth( this.registerForm.value ).subscribe(
      resp => {
        this.loader = false;
        this.clicked = false;
      }
     )
  }

}
