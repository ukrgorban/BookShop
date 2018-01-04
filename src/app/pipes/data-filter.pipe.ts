import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dataFilter',
    pure: true
})
export class DataFilterPipe implements PipeTransform {

    transform(data: any, prop: string, propValue: string) {
        return data.filter(item => item[prop] === propValue);
    }

}
