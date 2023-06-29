import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UploadMessage } from '../../interfaces/upload.interfaces';
import { catchError } from 'rxjs/operators';

import { Recurso } from '../../interfaces/recurso.interfaces';
import { Message } from '../../interfaces/message.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private urlApi: string = environment.apiUrl;
  private id = localStorage.getItem('cod_usuario');
  private idUser = Number(this.id);

  constructor(
    private readonly http: HttpClient,
  ) { }


  createDocs( uploadData: any, file: any ): Observable<UploadMessage> {
    const url = `${this.urlApi}/recurso/create/${this.idUser}`;
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    formData.append("cod_proceso", uploadData.cod_proceso);
    formData.append("nombrepublico_recurso", uploadData.nombrepublico_recurso);
    formData.append("estado", uploadData.estado);
    formData.append("cod_programa", uploadData.cod_programa);
    formData.append("desc_recurso", uploadData.desc_recurso);
    return this.http.post<UploadMessage>(url, formData);
  }

  getDataDocs() {
    return this.http.get<{recurso:Recurso[]}>( `${this.urlApi}/recurso/${this.idUser}` );
  }

  getDownloadFile( file : string ) {
    let HTTPOptions = {
      headers: new HttpHeaders({'Accept': 'application/json; charset=UTF-8',}),
      observe: "response" as 'body',// to display the full response & as 'body' for type cast
      'responseType': 'blob' as 'json'
    }
    return this.http.get(`${this.urlApi}/recurso/file/${file}`, HTTPOptions);

    // return this.http.get(`${this.urlApi}/recurso/file/${file}`, {
    //   responseType: "blob" as 'json',
    //   headers: new HttpHeaders().append("Content-Type", "application/json"),
    //   observe: "response" as 'body'
    // } );
  }

  deleteDataFile( res: Recurso ) {
    return this.http.delete(`${this.urlApi}/recurso/${res.cod_recurso}/${res.nombreprivado_recurso}`);
  }

  update( cod_recurso: string, res: any, file?: any ): Observable<Message> {
    // console.log(res);
    const formData = new FormData();
    if ( file != undefined || file != null ) {
      formData.append("file", file, file.name);
    }
    formData.append("nombrepublico_recurso", res.nombrepublico_recurso );
    formData.append("estado", res.estado);
    formData.append("desc_recurso", res.desc_recurso);
    // Store form name as "file" with file data


    return this.http.put<Message>(`${this.urlApi}/recurso/update/${cod_recurso}`, formData);
  }

  getDocumentoById( id : string ) {
    console.log(id);
    return this.http.get<Recurso>(`${this.urlApi}/recurso/documento/${id}`);
  }
}
