import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor(private http: HttpClient) { }
  get(id: string): Observable<any[]> {
    return this.http.get<any[]>(`/assets/json/dictionary.json`);
  }
}
