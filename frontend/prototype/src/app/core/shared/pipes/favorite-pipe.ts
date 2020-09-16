import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'favoritepipe'})
export class FavoritePipe implements PipeTransform {
    transform(value: boolean): string {
        return value ? 'star' : 'star_outline';
    }
}
