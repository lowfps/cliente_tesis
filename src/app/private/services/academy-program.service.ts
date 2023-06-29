import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AcademyData } from '../../interfaces/academy.interfaces';
import { Message } from 'src/app/interfaces/message.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcademyProgramService {
  private urlApi: string = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
  ) { }

  create( data: any ): Observable<any> {
    return this.http.post( `${this.urlApi}/programa/create`, data );
  }

  findAll() {
    return this.http.get<{academy: AcademyData[]}>(`${this.urlApi}/programa`);
  }

  update( cod_programa: number, nombre_programa: string ): Observable<Message> {
    return this.http.put<Message>(`${this.urlApi}/programa/update/${cod_programa}`,nombre_programa);
  }
}
