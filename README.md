# ANPR Traffic System

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.
## Features

### Real-time Dashboard
- Live Vehicle Recognition: The dashboard displays real-time data related to vehicle recognition.
- The data includes camera feed, timestamp, registration number, vehicle type, brand, color, and location.
- The application uses WebSockets with a real-time API to stream data continuously.
- Dynamic UI Updates: As new data is received, the list or chart displaying the vehicle information updates dynamically in real-time.
### Device Management Component
- Device CRUD Functionality: Users can add, edit, delete, and view details of devices.
- Each device includes fields for name, model, serial number, IP address, location, and status.
Reactive Forms:
- Angular’s reactive forms are used for creating and editing devices, providing a more flexible and scalable approach.
- The forms are validated both client and server side, ensuring required fields are filled in before submission.
- API Integration:
- The application uses Angular’s HttpClient to interact with Node.js Express API with MySQL DB for device data management.
- Users can fetch, create, update, and delete devices using this interface.
### Device Search Component
- Search as You Type: Users can search for devices using an input field that fetches search suggestions from an API.
- Dropdown Search Suggestions: A dropdown list with suggestions appears below the input field.
- Debouncing: Basic debouncing is implemented to prevent excessive API calls while the user is typing.
- Search Result Display: When a user selects a suggestion from the dropdown, the details of the selected device are displayed.
## Demo

https://www.youtube.com/watch?v=TmDV1KO1VP8 or directly via http://grandtm.website



