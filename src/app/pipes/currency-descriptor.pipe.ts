import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyDescriptor'
})
export class CurrencyDescriptorPipe implements PipeTransform {

  transform(value: {code: string, name: string}): string {
    return `${value.code} - ${value.name}`;
  }


}
