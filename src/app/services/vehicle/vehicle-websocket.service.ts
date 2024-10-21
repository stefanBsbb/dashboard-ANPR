import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleWebSocketService {

  constructor(private socket: Socket) {}

  getInitialVehicles(): Observable<any[]> {
    return this.socket.fromEvent<any[]>('initial');
  }

  getNewVehicleUpdates(): Observable<any> {
    return this.socket.fromEvent<any>('new');
  }
}
