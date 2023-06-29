import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeResource'
})
export class TypeResourcePipe implements PipeTransform {

  transform(value: number ): string | number {
    let typeResource: string = '';
    switch ( value ) {
      case 1:
        typeResource = 'Word'
        break;
      case 2:
        typeResource = 'PDF'
        break;
      case 3:
        typeResource = 'Excel';
        break
      default:
        break;
    }
    return typeResource;
  }

}
