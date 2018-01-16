import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BooksService } from '../books.service';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {
    formats: Object[] = [];
    countries: Object[] = [];
    cities: Object[] = [];
    publishers: Object[] = [];

    form: FormGroup;

    countryId = 1;
    cityId: 1;

    constructor(private booksService: BooksService) { }

    ngOnInit() {
        // get format
        this.booksService.getData('formats/').subscribe(formats => {
            this.formats = formats;
        });

        // get countries
        this.booksService.getData('countries/').subscribe(countries => {
            this.countries = countries;
        });

        // get cities
        this.booksService.getData('cities/').subscribe(cities => {
            this.cities = cities;
        });

        // get publishers
        this.booksService.getData('publishers/').subscribe(publishers => {
            this.publishers = publishers;
        });

        // validation form
        this.form = new FormGroup({
            author: new FormControl('', [Validators.required]),
            title: new FormControl('', [Validators.required]),
            isbn: new FormControl('', [Validators.required]),
            pages: new FormControl('', [Validators.required, this.isNumber]),
            formatId: new FormControl('1', []),
            description: new FormControl('', [Validators.required]),
            price: new FormControl('', [Validators.required, this.isNumber]),
            publisherId: new FormControl('10', [Validators.required]),
        });
    }

    onSubmit() {
        // Data from form fields
        const book = {
            'author': this.form.value.author,
            'title': this.form.value.title,
            'isbn': this.form.value.author,
            'pages': +this.form.value.pages,
            'publisherId': +this.form.value.publisherId,
            'formatId': +this.form.value.formatId,
            'description': this.form.value.description,
            'price': +this.form.value.price
        };

        // add book to server
        this.booksService.addBook(book)
            .subscribe(() => {
                this.form.reset();
            });
    }

    isNumber(control: FormControl) {
        if (isNaN(control.value)) {
            return {
                'error': true,
            };
        }
        return null;
    }
}
