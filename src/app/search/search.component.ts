import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/Rx';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BooksService } from '../books.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
    formats: Object[];
    form: FormGroup;
    books: Object[];

    constructor( private booksService: BooksService, private router: Router, private activateRoute: ActivatedRoute ) {}

    ngOnInit() {
        this.booksService.getData('formats')
            .subscribe(formats => {
                this.formats = formats;
            });

        this.activateRoute.queryParams.subscribe((searchParam: Params) => {
            this.booksService.search(searchParam)
                .subscribe((books) => {
                    this.books = books;
                });
        });

        // validation form
        this.form = new FormGroup({
            author: new FormControl(),
            title: new FormControl(),
            isbn: new FormControl(),
            formatId: new FormControl(),
            pageMin: new FormControl(),
            pageMax: new FormControl(),
            priceMin: new FormControl(),
            priceMax: new FormControl()
        });
    }

    addQueryParam() {
        for (const prop in this.form.value) {
            if (this.form.value[prop] == false) {
                delete this.form.value[prop];
            }
        }

        this.router.navigate(['/search'], { queryParams: this.form.value });
    }

}
