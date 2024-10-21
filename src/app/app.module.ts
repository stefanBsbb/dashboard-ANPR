import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CommonModule } from '@angular/common';
import { VehicleService } from './services/vehicle/vehicle.service';
import { VehicleWebSocketService } from './services/vehicle/vehicle-websocket.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevicesComponent } from './components/devices/devices.component';
import { environment } from '../environments/environments';
import { SearchComponent } from './components/shared/search/search.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
const config: SocketIoConfig = { url: environment.apiUrl, options: {} };


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DevicesComponent,
    SearchComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    SocketIoModule.forRoot(config)      
  ],
  providers: [
    VehicleService, 
    VehicleWebSocketService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
