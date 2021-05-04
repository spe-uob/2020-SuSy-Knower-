import { environment } from './../environments/environment';
import { Unit } from './unit';
 import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class UnitService {
    private apiServerUrl = environment.api_base_Url;

    constructor(private http: HttpClient){}

    public getUnits(): Observable<Unit[]>{
        return this.http.get<Unit[]>(`${this.apiServerUrl}/unit/all`);
    }

    /*public getString(): Observable<string>{
        return this.http.get<string>(`${this.apiServerUrl}/unit/index`);
    }*/

    /*public addUnit(unit: Unit): Observable<Unit>{
        return this.http.post<Unit>(`${this.apiServerUrl}/unit/add`,unit);
    }

    public updateUnit(unit: Unit): Observable<Unit>{
        return this.http.put<Unit>(`${this.apiServerUrl}/unit/update`,unit);
    }

    public delteUnit(unitId: number): Observable<Unit>{
        return this.http.delete<Unit>(`${this.apiServerUrl}/unit/delete/${unitId}`);
    }*/


} 