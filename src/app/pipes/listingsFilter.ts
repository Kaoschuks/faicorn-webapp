import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'listingsFilter'
})
export class ListingsFilterPipe implements PipeTransform {

    transform(items: any[], minTerm: Number, maxTerm: Number): any {
        if (!items || !minTerm || !maxTerm) {
            // console.log('Filter Works: ', minTerm, maxTerm);
            // console.log(items.filter(product => {
            //     return product.price >= minTerm
            //         && product.price <= maxTerm
            // }))
            return items;
        }

        return console.log('Filter Works: ', minTerm, maxTerm), items.filter(product => {
            return product.price >= minTerm
                && product.price <= maxTerm
        });    
    }
}