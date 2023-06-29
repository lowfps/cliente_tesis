import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { AcademyProgramService } from '../../services/academy-program.service';
import { AcademyData } from '../../../interfaces/academy.interfaces';
import { MessagesService } from '../../services/messages.service';
import { MatDialog } from '@angular/material/dialog';
import { AcademyDialogComponent } from '../components/academy-dialog/academy-dialog.component';


@Component({
  selector: 'app-academy-program',
  templateUrl: './academy-program.component.html',
  styleUrls: ['./academy-program.component.scss']
})
export class AcademyProgramComponent implements OnInit, AfterViewInit {
  loader: boolean = false;
  clicked: boolean = false;
  message: string = '';
  displayedColumns: string[] = ['cod_programa', 'nombre_programa', 'fechacreacion_programa','actions'];
  dataSource = new MatTableDataSource<AcademyData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly AcademyService: AcademyProgramService,
    private readonly showMessages: MessagesService,
    public dialog: MatDialog,

  ) { }

  academyForm = this.formBuilder.group({
    nombre_programa:['',[ Validators.required ]],
    fechacreacion_programa:['',[ Validators.required ]],
  });

  ngOnInit(): void {
    this.getProgram();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
    paginatorIntl.lastPageLabel = '';
    paginatorIntl.firstPageLabel = '';
    paginatorIntl.itemsPerPageLabel = 'Registros por paginas:'

  }

  getProgram(): void {
    this.AcademyService.findAll().subscribe(

      (data: any) => {
        this.dataSource.data = data;
      }
    )
  }

  sendRegister(): void {
    if( this.academyForm.invalid ) { this.academyForm.markAllAsTouched(); return; }
    this.loader = true;
    this.clicked = true;
    this.AcademyService.create( this.academyForm.value ).subscribe({
      next: (resp) => this.showMessages.openSnackBar(resp.mensaje),
      error: (e) => this.showMessages.openSnackBar(e),
      complete: () => {
        this.loader = false;
        this.clicked = false;
        this.academyForm.patchValue({
          nombre_programa: '',
          fechacreacion_programa:''
        });
        this.getProgram();
      }
    });
    this.loader = false;
    this.clicked = false;
  }

  showInfoProgram( data: AcademyData ): void {

    const dialog = this.dialog.open(AcademyDialogComponent, {
      width:'600px',
      data
    });
    dialog.afterClosed().subscribe( result => {
      console.log(result);
      if ( result === true ) {
        this.getProgram();
      }
    });
  }

  fieldNotValid( value:string ): boolean {
    if ( this.academyForm.get( value )?.invalid && this.academyForm.touched ){
      return true;
		}
		else{
      return false;
		}
	}
}
