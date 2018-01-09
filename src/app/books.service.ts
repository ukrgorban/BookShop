import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class BooksService {

    headers = new Headers({
        'x-auth-token': environment.authToken,
    });

    constructor(private http: Http) {}

    getData(pathname: string, headers: object = { headers: this.headers} ) {
        const url = environment.apiUrl + pathname;

        return this.http.get(url, headers)
            .map((response: Response) => response.json());
    }

    addBook(book: object) {
        const url = environment.apiUrl + 'books/';

        return this.http.post(url, book, { headers: this.headers})
            .map((response: Response) => response.json());
    }

    search(queryParams: {}) {
        const url = environment.apiUrl + 'books/';

        return this.http.get(url, { headers: this.headers})
            .map(books => {
                // filtering an array of books by queryParams
                const searchBooks = books.json().filter((book) => {

                    // checking the parameters for compliance with the book
                    const error = [];

                    for (const prop in queryParams) {

                        if (prop === 'formatId') {
                            if (+book[prop] !== +queryParams[prop]) {
                                error.push('err');
                            }
                        }

                        if (prop === 'author' || prop === 'title' || prop === 'isbn') {
                            const bookProp = book[prop].toLowerCase();
                            const searchParam = queryParams[prop].toLowerCase();

                            if (bookProp.indexOf(searchParam) === -1) {
                                error.push('err');
                            }
                        }

                        if (prop === 'pageMin') {
                            if (book['pages'] < +queryParams[prop]) {
                                error.push('err');
                            }
                        }

                        if (prop === 'pageMax') {
                            if (book['pages'] >= +queryParams[prop]) {
                                error.push('err');
                            }
                        }

                        if (prop === 'priceMin') {
                            if (book['price'] < +queryParams[prop]) {
                                error.push('err');
                            }
                        }

                        if (prop === 'priceMax') {
                            if (book['price'] >= +queryParams[prop]) {
                                error.push('err');
                            }
                        }
                    }

                    if (error.length === 0) {
                        return book;
                    }
                });

                return searchBooks;

            });
    }
}
