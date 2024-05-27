import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservations';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = "http://loaclhost:3000";
  private reservations: Reservation[] = [];

  // constructor gets loaded before ngOnit lifeCycle hook, To handle al the instances of the variables created 
  constructor(private http: HttpClient){

  }

  //CRUD operations

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + "/reservations");
  }

  getReservation(id: string): Reservation | undefined { 
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation: Reservation): void  {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
  }

  deleteReservation(id: string): void{
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1); 
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === updatedReservation.id);
    this.reservations[index] = updatedReservation;
  }
}
