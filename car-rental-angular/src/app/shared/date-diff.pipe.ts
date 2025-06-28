import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateDiff' })
export class DateDiffPipe implements PipeTransform {
  transform(start: Date, end: Date): number {
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.round((end.getTime() - start.getTime()) / msPerDay) + 1;
  }
}
