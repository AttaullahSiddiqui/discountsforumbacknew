import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, retry, map } from "rxjs/operators";

import { UtilityService } from "./utility.service";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  constructor(
    private http: HttpClient,
    public utility: UtilityService,
    private route: Router
  ) {}

  getHeaders(isMultiPartFormData?: boolean): HttpHeaders {
    let options = {
      // 'Content-Type': 'application/json',
    };
    const headers = new HttpHeaders(options);
    return headers;
  }

  async get(url: string): Promise<Response> {
    try {
      let headers: HttpHeaders = this.getHeaders();
      let result = await this.http
        .get<any>(url, {
          observe: "response",
          headers: headers,
        })
        .toPromise();
      return {
        body: result.body,
        status: result.status,
        statusText: result.statusText,
      };
    } catch (error) {
      return Promise.reject(this.handleError(error));
    }
  }

  async post(url: string, data: any, options?: options): Promise<Response> {
    try {
      let headers: HttpHeaders;
      if (options && options.isMultiPartFormData) {
        headers = this.getHeaders(true);
      } else {
        headers = this.getHeaders();
      }
      let result = await this.http
        .post<any>(url, data, {
          observe: "response",
          headers: headers,
        })
        .toPromise();
      return {
        body: result.body,
        status: result.status,
        statusText: result.statusText,
      };
    } catch (error) {
      return Promise.reject(this.handleError(error));
    }
  }

  async put(url: string, data: any, options?: options): Promise<Response> {
    try {
      let headers: HttpHeaders;
      if (options && options.isMultiPartFormData) {
        headers = this.getHeaders(true);
      } else {
        headers = this.getHeaders();
      }
      let result = await this.http
        .put<any>(url, data, {
          observe: "response",
          headers: headers,
        })
        .toPromise();
      return {
        body: result.body,
        status: result.status,
        statusText: result.statusText,
      };
    } catch (error) {
      return Promise.reject(this.handleError(error));
    }
  }

  async delete(url: string): Promise<Response> {
    try {
      let headers: HttpHeaders = this.getHeaders();
      let result = await this.http
        .delete<any>(url, {
          observe: "response",
          headers: headers,
        })
        .toPromise();
      return {
        body: result.body,
        status: result.status,
        statusText: result.statusText,
      };
    } catch (error) {
      return Promise.reject(this.handleError(error));
    }
  }

  private handleError(error: HttpErrorResponse): Response {
    console.log(error);
    // if(error.status == 401){
    //   this.utility.removeToken();
    //   this.route.navigate(['/login']);
    // }
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error.message}`);
    }

    return {
      error: error.error,
      status: error.status,
      statusText: error.statusText,
    };
  }

  // get(url:string): Observable<HttpResponse<any>> {
  //   let options : HttpHeaders = this.getHeaders();
  //   return this.http.get<any>(environment.baseUrl+url, { observe: 'response', headers: options }).pipe(
  //     catchError( (error) => this.handleError(error))
  //   );
  // }

  // post(url:string, data: any): Observable<HttpResponse<any>> {
  //   let options : HttpHeaders = this.getHeaders();
  //   return this.http.post<any>(environment.baseUrl+url, data, { observe: 'response', headers: options }).pipe(
  //     catchError( (error) => this.handleError(error))
  //   );
  // }

  // put(url:string, data: any): Observable<HttpResponse<any>> {
  //   let options : HttpHeaders = this.getHeaders();
  //   return this.http.put<any>(environment.baseUrl+url, data, { observe: 'response', headers: options }).pipe(
  //     catchError( (error) => this.handleError(error))
  //   );
  // }

  // delete(url:string): Observable<HttpResponse<any>> {
  //   let options : HttpHeaders = this.getHeaders();
  //   return this.http.delete<any>(environment.baseUrl+url, { observe: 'response', headers: options }).pipe(
  //     catchError( (error) => this.handleError(error))
  //   );
  // }

  // private handleError(error: HttpErrorResponse) {
  //   // if(error.status == 401){
  //   //   this.utility.removeToken();
  //   //   this.route.navigate(['/login']);
  //   // }
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError({
  //     status : error.status,
  //     message : error.error.message
  //   });

  // };
}

export interface Response {
  error?: any;
  status: number;
  statusText: string;
  body?: any;
}

export interface options {
  isMultiPartFormData?: boolean;
}
