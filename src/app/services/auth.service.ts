import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: any;

  constructor(private afAuth: AngularFireAuth, private userService: UserService, private router: Router) { }

  async login(provider: any): Promise<void>{
    await this.afAuth.signInWithPopup(provider).then(
      credential => {
        if(credential){
          this.userService.updateUser(credential.user!);

          const returnUrl = localStorage.getItem('returnUrl');
          this.router.navigateByUrl(returnUrl || '/defaultRoute');
        }
      }
    );
  }

  logout(): void {
    this.afAuth.signOut();
    localStorage.clear();
  }
}
