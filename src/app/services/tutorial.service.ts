import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import Tutorial from '../models/tutorial';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {
  public signedIn: Observable<any>;


  private dbPath = '/tutorials';

  tutorialsRef: AngularFireList<Tutorial> = null;
  userData: any;

  constructor(private db: AngularFireDatabase,
 public auth: AngularFireAuth) {
    this.tutorialsRef = db.list(this.dbPath);
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } 
    });
    
    this.signedIn = new Observable((subscriber) => {
      this.auth.onAuthStateChanged(subscriber);
      console
  });
  }
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  async signIn(email: string, password: string) {
    try {
        if (!email || !password) throw new Error('Invalid email and/or password');
        await this.auth.signInWithEmailAndPassword(email, password);
        return true;
    } catch (error) {
        console.log('Sign in failed', error);
        return false;
    }
}

async signUp(email: string, password: string) {
  try {
      if (!email || !password) throw new Error('Invalid email and/or password');
      await this.auth.createUserWithEmailAndPassword(email, password);
      return true;
  } catch (error) {
      console.log('Sign up failed', error);
      return false;
  }
}

async logout(){
  console.log('logout')
  await this.auth.signOut();
}

  getAll(): AngularFireList<Tutorial> {
    return this.tutorialsRef;
  }

  create(tutorial: Tutorial): any {
    return this.tutorialsRef.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.tutorialsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.tutorialsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.tutorialsRef.remove();
  }

  
}
