import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Unit } from '../unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private apiServerUrl = environment.api_base_Url;

  constructor(private http: HttpClient){}

  public getUnits(): Observable<Unit[]>{
      return this.http.get<Unit[]>(`${this.apiServerUrl}/unit/all`);
  }
}
