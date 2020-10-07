import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.User>;

  userId: string = '';
  constructor(private fAuth: AngularFireAuth) {
    this.user = fAuth.user;
  }

  signUp(email: string, password: string) {
    return this.fAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.fAuth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.fAuth.signOut();
  }
}
