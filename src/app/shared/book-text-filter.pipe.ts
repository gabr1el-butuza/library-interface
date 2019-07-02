import { Pipe, PipeTransform } from '@angular/core';
import {Book} from "../books/model/book";

@Pipe({
  name: 'bookTextFilter'
})
export class BookTextFilterPipe implements PipeTransform {

  transform(books: Book[], text: string): Book[] {
    if(text == null || text ===''){
      return books;
    }
    if(text){
      return books.filter( n=> {
        return n.title.search(new RegExp(text, 'i')) !== -1 ||
          n.text.search(new RegExp(text, 'i')) !== -1
      });
    }
    return books;
  }

}
