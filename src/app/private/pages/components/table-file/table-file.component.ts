import { Component, Input, Output, ViewChild, AfterViewInit, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Recurso } from '../../../../interfaces/recurso.interfaces';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table-file',
  templateUrl: './table-file.component.html',
  styleUrls: ['./table-file.component.scss']
})
export class TableFileComponent implements AfterViewInit {
  displayedColumns: string[] = ['nombrepublico_recurso', 'tamanno', 'tipo_recurso', 'estado', 'date_time' , 'cod_programa', 'desc_recurso', 'actions'];

  @Input() dataSource = new MatTableDataSource<Recurso>([]);
  @Output() fileEvent = new EventEmitter<string>();
  @Output() recursoEvent = new EventEmitter<Recurso>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    const paginatorIntl = this.paginator._intl;
    paginatorIntl.nextPageLabel = '';
    paginatorIntl.previousPageLabel = '';
    paginatorIntl.lastPageLabel = '';
    paginatorIntl.firstPageLabel = '';
    paginatorIntl.itemsPerPageLabel = 'Registros por paginas:'

  }

  donwloadFile( docs : string ) {
    this.fileEvent.emit( docs  );
  }
  removeData( data: Recurso ) {
    this.recursoEvent.emit( data );
  }
  applySearch( event: Event ) {
    const userValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = userValue.trim().toLowerCase();
  }
}
