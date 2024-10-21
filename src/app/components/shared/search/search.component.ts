import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DeviceService } from '../../../services/device/device.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl(); 
  suggestions: any[] = [];
  showSuggestions = false;

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTerm: string) => {
        if (searchTerm) {
          return this.deviceService.searchDevices(searchTerm).pipe(
            catchError(err => {
              console.error('Error occurred during search:', err);
              return of([]);
            })
          );
        } else {
          return of([]);
        }
      })
    ).subscribe((results: any[]) => {
      this.suggestions = results;
      this.showSuggestions = true;
    });
  }

  hideDropdown(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  showDropdown(): void {
    if (this.suggestions.length > 0) {
      this.showSuggestions = true;
    }
  }

  selectSuggestion(suggestion: any): void {
    this.searchControl.setValue(suggestion.name);
    this.showSuggestions = false;
  }

  onSearchChange(): void {
    if (!this.searchControl.value) {
      this.suggestions = [];
    }
  }
}
