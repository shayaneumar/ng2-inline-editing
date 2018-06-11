import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number, trail: string): string {
    limit = limit || Infinity;
    trail = trail || '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}
