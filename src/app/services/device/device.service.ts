import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private apiUrl = environment.apiUrl + 'devices';

  constructor(private http: HttpClient) {}

  getDevices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDeviceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createDevice(device: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, device);
  }

  updateDevice(id: number, device: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, device);
  }

  deleteDevice(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  searchDevices(query: string): Observable<any[]> {
    const url = `${this.apiUrl}/search/v1?q=${query}`;
    return this.http.get<any[]>(url);
  }

}
