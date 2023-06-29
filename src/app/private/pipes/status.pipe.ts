import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: number ): string | number {
    let status = '';
    switch (value) {
      case 1:
        status = "Activo";
        break;
      case 2:
        status = "Primera solicitud";
        break;
      case 3:
        status = "En proceso";
        break;
      case 4:
        status = "Renovación";
        break;
      case 5:
        status = "Pendiente renovación";
        break;
      default:
        status = 'Sin fecha'
        break;
    }
    return status;
  }

}
