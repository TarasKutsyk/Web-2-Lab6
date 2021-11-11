import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import {ApiConfig} from '../config';

interface Identified {
  _id?: string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService<T extends Identified> {
  baseUrl : string = ApiConfig.baseUrl;

  constructor(private http: HttpClient) {
  }

  getItems(route: string) {
    return this.http.get<T[]>(this.baseUrl + route);
  }

  addItem(item: T, route : string): Observable<T> {
    return this.http.post<T>(this.baseUrl + route, item)
  }

  editItem(item: T, route : string) {
    return this.http.put(this.baseUrl + route, {
      id: item._id,
      data: item
    });
  }

  deleteItem(item: T, route : string) {
    return this.http.delete(this.baseUrl + route, {body: {id: item._id}});
  }
}
