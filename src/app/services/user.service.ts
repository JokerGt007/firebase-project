import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable, of as observableOf } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  authState$: Observable<firebase.default.User | null> = this.afAuth.authState;

  displayName$: Observable<string | null> = this.authState$.pipe(
    map(user =>{
      return !user ? null : user.displayName;
    })
  );


  isAdmin$: Observable<boolean | null> = this.authState$.pipe(
    switchMap(user  => {
      return !user ? observableOf(false) : this.db.object<boolean>('/users/' + user.uid + '/isAdmin/').valueChanges();
    })
  );

  updateUser(user: firebase.default.User): void{
    this.db.object<User>('/users/' + user.uid)
    .update(
      {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        // isAdmin: false,
        photoUrl: user.photoURL
      }
    );
  }
}
