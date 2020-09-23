import {Pipe, PipeTransform} from '@angular/core';
import {Unit} from '../../../model/unit.enum';

@Pipe({name: 'unitPipe'})
export class UnitPipe implements PipeTransform {
  transform(value: string): string {
    switch (value){
        case Unit.Unit : {
            return '';
        }
        case Unit.TablesSpoon : {
            return 'Tables Spoon';
        }
        case Unit.TeaSpoon : {
            return 'Tea Spoon';
        }
        case Unit.Cup : {
            return 'Cup';
        }
        case Unit.g : {
            return 'g';
        }
        case Unit.kg : {
            return 'kg';
        }
        case Unit.ml : {
            return 'ml';
        }
        case Unit.cl : {
            return 'cl';
        }
        case Unit.l : {
            return 'l';
        }
        default:
            return 'NA';
    }
    return value;
  }
}
