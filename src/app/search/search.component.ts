import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  formats: [{}];

  id: string;
  constructor(private booksService: BooksService, private route: ActivatedRoute) { }

  ngOnInit() {
      // get list formats
      this.booksService.getData('formats')
        .subscribe(formats => this.formats = formats);
      this.route.data.subscribe(res => {
           console.log(res);
      });
  }

}
