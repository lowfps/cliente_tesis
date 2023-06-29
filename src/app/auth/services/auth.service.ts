import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User,RUser } from '../../models/user.model';
import { Observable, of } from 'rxjs';
import { Auth } from '../../interfaces/user.interfaces';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  private urlApi: string = environment.apiUrl;
  private userLog!: User;
  private loggedUser: string | any;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  get userAuth() {
    return { ...this.userLog };
  }

  constructor(
    private readonly http: HttpClient,
    private router: Router,
  ) { }

  login( user:{ correo_usuario?: string | null; clave_usuario?: string | null } ): Observable<any> {
    const url  = `${this.urlApi}/usuarios/login`;
    return this.http.post<any>(url, user)
    .pipe(
      tap( resp => {
        if( resp.user[0].nombre_usuario ) {
          this.doLoginUser(resp.user[0], resp.token);
          if( resp.cod_rol == 2 ) {
            this.router.navigate(['/dashboard']);
          }
          else{
            this.router.navigate(['/dashboard']);
          }
        }
      }),
      map( resp => resp ),
      catchError( error => of( error.error ) )
    );
  }

  registerAuth( user: User ): Observable<any> {
    const url = `${this.urlApi}/usuarios/crear`;
    return this.http.post<Auth>(url, user)
    .pipe(
      tap( resp => {
        if( resp.user ) {
          this.doLoginRegister(resp.cod_usuario,resp.user, resp.token);
          this.router.navigate(['/dashboard']);
        }
      }),
      map( resp => resp ),
      catchError( error => of( error ) )
    );
  }

  checkLocalStorage() {
    localStorage.getItem('')
  }

  logout() {
    this.doLogoutUser();
    return true;
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN) || '' ;
  }

  private doLoginUser(user: User, tokens:any) {
    this.loggedUser = user.nombre_usuario;
    this.userLog = new User(user.cod_usuario,user.cod_rol, user.nombre_usuario, user.correo_usuario);
    this.storeTokens(tokens);
    this.storeCodUser(user.cod_usuario)
  }
  private doLoginRegister(cod_usuario: any, nombre_usuario: any, tokens:any){
    this.loggedUser = nombre_usuario;
    this.userLog = new RUser(cod_usuario,nombre_usuario);
    this.storeTokens(tokens);
    this.storeCodUser(cod_usuario)


  }

  private doLogoutUser(){
    this.loggedUser = null;
    this.removeTokens();
    this.removeCodUser();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: any) {
    localStorage.setItem(this.JWT_TOKEN, tokens);
    localStorage.setItem(this.REFRESH_TOKEN, tokens);
  }

  private storeCodUser(codUser: any) {
    localStorage.setItem('cod_usuario', codUser);
  }

  private removeCodUser() {
    localStorage.removeItem('cod_usuario');
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
