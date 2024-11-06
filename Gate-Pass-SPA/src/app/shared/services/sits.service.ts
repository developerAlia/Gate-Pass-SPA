import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SitsInfo } from '../models/sits/sitsInfo';

@Injectable({
  providedIn: 'root'
})
export class SitsService {
  baseUrl = environment.apiUrl + 'SITS/';
  constructor(private http: HttpClient) { }
  getSitsInfo(id: number): Observable<SitsInfo> {
    return this.http.get<SitsInfo>(this.baseUrl + 'SITSInfo/' + id + '/' + 0);
  }
}
