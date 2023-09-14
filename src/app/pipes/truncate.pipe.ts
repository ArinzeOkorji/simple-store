import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string): string {
    const result = value.length > 20 ? value.slice(0, 20) + '...' : value;
    return result;
  }

}
