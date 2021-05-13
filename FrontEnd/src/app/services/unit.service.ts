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

  public getSubjects(school = null): Observable<String[]>{
    var extension = "/?school="+school;
    if(school){
      return this.http.get<String[]>(`${this.apiServerUrl}/unit/programmes${extension}`);
    }
    else{
      return this.http.get<String[]>(`${this.apiServerUrl}/unit/programmes`);
    }
  }
  public getSchools(faculty = null): Observable<String[]>{
    var extension = "/?school="+faculty;
    if(faculty){
      return this.http.get<String[]>(`${this.apiServerUrl}/unit/schools${extension}`);
    }
    else{
      return this.http.get<String[]>(`${this.apiServerUrl}/unit/schools`);
    }
    
  }
  public getFaculties(): Observable<String[]>{
    return this.http.get<String[]>(`${this.apiServerUrl}/unit/faculties`);
  }
  public getTopics(subject): Observable<String[]>{
    return this.http.get<String[]>(`${this.apiServerUrl}/unit/faculties`);
  }


}
