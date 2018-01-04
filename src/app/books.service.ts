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

}
