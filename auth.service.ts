import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth, private route: ActivatedRoute,
    private router: Router, private userService: UserService
  ) {
    this.user$ = afAuth.authState;
   }

  gLogin() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/' ;
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  login(email, password): Observable<any> {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/' ;
    localStorage.setItem('returnUrl', returnUrl);

    return Observable.fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
    );
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
        .switchMap(user => {
          // tslint:disable-next-line:curly
          if (user) return this.userService.get(user.uid);

          return Observable.of(null);
        });
  }
}
