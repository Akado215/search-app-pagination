import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConstValues } from '../../environments/constants';


@Injectable({
  providedIn: 'root'
})
export class LoadUsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(page, searchParam): Observable<any>{
      if (searchParam.split('').length < ConstValues.MIN_SEARCH_CHARS){
        return this.http.get('https://swapi.dev/api/people/?page=' + page);
      } else {
        return this.http.get('https://swapi.dev/api/people/?search=' + searchParam);
      }
    }
}
