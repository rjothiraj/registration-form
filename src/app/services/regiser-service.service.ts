import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
//import { RegisterUserModel } from '../models/registerUserModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RegiserServiceService {
  private userUrl = 'https://crud-operation-ff604-default-rtdb.firebaseio.com';
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/users.json').pipe(
      // tap(data => console.log('All', data)),
      // catchError(this.handleError)
      map((responseData) => {
        const postArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      }),
      catchError(this.handleError)
    );
  }

  postUser(user: User): Observable<User[]> {
    return this.http.post<User[]>(this.userUrl + '/users.json', user);
  }

  deleteUser(user: User): Observable<User[]> {
    return this.http.delete<User[]>(this.userUrl + '/users/' + user + '.json');
  }

  editUser(user:User): Observable<User[]> {
    console.log(user.id)
    return this.http.patch<User[]>(this.userUrl + '/users/' + user.id + '.json',user);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An Error Occured : ${err.error.message};`;
    } else {
      errorMessage = `Server Returned Code: ${err.status}, error message is ${err.message}`;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }
}
