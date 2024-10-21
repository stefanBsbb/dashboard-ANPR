import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = environment.apiUrl + 'vehicles';

  constructor(private http: HttpClient) {}


  getVehicles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


}
