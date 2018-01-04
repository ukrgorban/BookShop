import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-showcase',
    templateUrl: './showcase.component.html',
    styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {
    books = [];

    constructor(private booksService: BooksService, private router: Router) { }

    ngOnInit() {
        // get books
        this.booksService.getData('books/').subscribe(books => {
            this.books = books;
        });
    }

    goAddBooksPage(e) {
        e.preventDefault();
        this.router.navigate(['/book/new']);
    }
}
