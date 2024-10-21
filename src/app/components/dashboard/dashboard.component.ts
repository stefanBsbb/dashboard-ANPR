import { Component, OnInit } from '@angular/core';
import { VehicleWebSocketService } from '../../services/vehicle/vehicle-websocket.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicles: any[] = [];
  paginatedVehicles: any[] = [];
  itemsPerPage: number = 15;
  currentPage: number = 1;
  totalPages: number = 1;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  showSidebar = false;

  constructor(
    private vehicleWebSocketService: VehicleWebSocketService, private router: Router
  ) { }

  ngOnInit(): void {
    this.vehicleWebSocketService.getInitialVehicles().subscribe((initialVehicles) => {
      console.log('Initial vehicles received via WebSocket:', initialVehicles);
      this.vehicles = initialVehicles;
      this.updatePagination();
    });
    this.vehicleWebSocketService.getNewVehicleUpdates().subscribe((newVehicle) => {
      this.vehicles.push(newVehicle);
      this.updatePagination();
    });
  }


  updatePagination(): void {   
    const itemsPerPage = Number(this.itemsPerPage); 
    this.vehicles.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    this.totalPages = Math.ceil(this.vehicles.length / itemsPerPage);

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    const startIndex = (this.currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    this.paginatedVehicles = this.vehicles.slice(startIndex, endIndex);
  }



  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.updatePagination();
  }


  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }


  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
  navigateToDevices()
  {
    this.router.navigate(['/devices']).then(() => {
      window.location.reload();
    });
  }
  navigateToDashboard()
  {
    this.router.navigate(['/dashboard']).then(() => {
      window.location.reload();
    });
  }
}
