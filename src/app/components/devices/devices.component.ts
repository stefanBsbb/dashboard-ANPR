import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from '../../services/device/device.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
  devices: any[] = [];
  paginatedDevices: any[] = [];
  deviceForm: FormGroup;
  editMode = false;
  currentDeviceId: number | null = null;
  isFormOpen = false;
  deleteConfirmOpen = false;
  confirmedDeleteDeviceId: number | null = null;
  showSidebar = false;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0; 


  constructor(private fb: FormBuilder, private deviceService: DeviceService, private router: Router) {
    this.deviceForm = this.fb.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      ipAddress: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', [Validators.required, Validators.pattern('(active|inactive)')]],
    });
  }

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getDevices().subscribe((data) => {
      this.devices = data;
      this.updatePagination();
    });
  }
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
  openForm(): void {
    this.isFormOpen = true;
  }

  closeForm(): void {
    this.isFormOpen = false;
    this.resetForm();
  }

  closeFormOutside(event: MouseEvent): void {
    this.closeForm();
  }
  confirmDelete(id: number): void {
    this.deleteConfirmOpen = true;
    this.confirmedDeleteDeviceId = id;
  }

  closeDeleteConfirm(): void {
    this.deleteConfirmOpen = false;
    this.confirmedDeleteDeviceId = null;
  }
  onSubmit(): void {
    if (this.deviceForm.invalid) {
      return;
    }

    if (this.editMode) {
      this.deviceService.updateDevice(this.currentDeviceId!, this.deviceForm.value).subscribe(() => {
        this.loadDevices();
        this.resetForm();
      });
    } else {
      this.deviceService.createDevice(this.deviceForm.value).subscribe(() => {
        this.loadDevices();
        this.resetForm();
      });
    }
    this.closeForm();
  }

  editDevice(device: any): void {
    this.openForm();
    this.editMode = true;
    this.currentDeviceId = device.id;
    this.deviceForm.patchValue(device);
  }

  deleteDevice(id: number): void {
    this.deviceService.deleteDevice(id).subscribe(() => {
      this.loadDevices();
    });
  }

  resetForm(): void {
    this.deviceForm.reset();
    this.editMode = false;
    this.currentDeviceId = null;
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.devices.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    this.paginatedDevices = this.devices.slice(startIndex, endIndex);
  }

  onItemsPerPageChange(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
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
