import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = 'https://dummyjson.com';

  public get<T>(url: string): Observable<T> {
    return this._http.get<T>(`${this._baseUrl}${url}`);
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this._http.post<T>(`${this._baseUrl}${url}`, body);
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this._http.put<T>(`${this._baseUrl}${url}`, body);
  }

  public delete<T>(url: string): Observable<T> {
    return this._http.delete<T>(`${this._baseUrl}${url}`);
  }
  
}
