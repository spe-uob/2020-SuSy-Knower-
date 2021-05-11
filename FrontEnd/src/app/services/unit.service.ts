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
      return this.http.get<Unit[]>(`${this.apiServerUrl}/unit/all/`);
  }

  public getSubjects(school = null): Observable<Unit[]>{
    var extension = "/?school="+school;
    if(school){
      return this.http.get<Unit[]>(`${this.apiServerUrl}/unit/programmes_by_school${extension}`);
    }
    else{
      return this.http.get<Unit[]>(`${this.apiServerUrl}/unit/programmes_by_school`);
    }
  }
  public getSchools(faculty): Observable<Unit[]>{
    var extension = "/?school="+faculty;
    if(faculty){
      return this.http.get<Unit[]>(`${this.apiServerUrl}/unit/schools_by_faculty${extension}`);
    }
    else{
      return this.http.get<Unit[]>(`${this.apiServerUrl}/unit/schools_by_faculty`);
    }
    
  }
  public getFaculties(): Observable<Unit[]>{
    return this.http.get<Unit[]>(`${this.apiServerUrl}/unit/`);
  }
  public getTopics(subject): Observable<Unit[]>{
    return this.http.get<Unit[]>(`${this.apiServerUrl}/unit/`);
  }



}
