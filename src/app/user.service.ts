import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor() {
    this.userSubject = new BehaviorSubject<any>(null);
    this.user = this.userSubject.asObservable();
  }

  setUser(user: any): void {
    this.userSubject.next(user);
  }

  getUser(): Observable<any> {
    return this.user;
  }
}
