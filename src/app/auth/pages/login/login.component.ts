import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServicesService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loader: boolean = false;
  clicked: boolean = false;
  message: string = '';
  loginForm!: FormGroup;


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly _snackBar: MatSnackBar,
    private readonly authService: AuthServicesService
    ) { }

    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({

        correo_usuario:['',[ Validators.required, Validators.email ]],
        clave_usuario:['',[ Validators.required]],

      });
    }

  openSnackBar( message: string ): void {
    this._snackBar.open( message, 'Aceptar', {
      duration: 4000
    });
  }

  get correo_usuario() { return this.loginForm?.get('correo_usuario'); }

  get clave_usuario() { return this.loginForm?.get('clave_usuario'); }


  sendRegister(): void {
    if( this.loginForm.invalid ) { this.loginForm.markAllAsTouched(); return; }
    this.loader = true;
    this.clicked = true;
    this.authService.login( this.loginForm.value ).subscribe(
      resp => {
        this.loader = false;
        this.clicked = false;
      }
     )
  }
}
