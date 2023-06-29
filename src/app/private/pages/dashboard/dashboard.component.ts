import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Recurso } from '../../../interfaces/recurso.interfaces';
import { UploadService } from '../../services/upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource = new MatTableDataSource<Recurso>([]);
  constructor(
    private recursoServices: UploadService,
    private readonly _snackBar: MatSnackBar,

  ){

  }
  ngOnInit(): void {
    this.getDataFiles();
  }

  getDataFiles(): void {
    this.recursoServices.getDataDocs().subscribe(

      (data: any) => {
        this.dataSource.data = data;
      }

    )
  }
  donwloadFileUser( file: any ) {
    // this.recursoServices.getDownloadFile( file ).subscribe(res => {

    //   window.open(window.URL.createObjectURL(res));
    // });
    this.recursoServices.getDownloadFile(file).subscribe((result:any) => {
      console.log(result.url);
      window.open(result.url);
      // console.log(result.headers.getAll('Content-Disposition'));
     }, err => {});
  }

  removeFileData( data: Recurso ) {
    this.recursoServices.deleteDataFile( data ).subscribe({
      next: (v) => console.log(v),
      error: (e) => this.openSnackBar(e),
      complete: () => {
        this.openSnackBar('Registro Eliminado')
        this.getDataFiles();
      }
    });
  }
  openSnackBar( message: string ): void {
    this._snackBar.open( message, 'Aceptar', {
      duration: 4000
    });
  }
}

