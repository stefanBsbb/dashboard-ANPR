import { TestBed } from '@angular/core/testing';
import { VehicleWebSocketService } from './vehicle-websocket.service';

describe('VehicleWebsocketService', () => {
  let service: VehicleWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
