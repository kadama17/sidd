import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TutorialService } from './services/tutorial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "SYSTEME DE DEMANDE D'INTERVENTION";
  isLoggedIn: boolean;                  // {1}

  constructor(private fs: TutorialService,
    private router: Router){
      if(localStorage.getItem('user')){
        console.log('true')
        this.isLoggedIn= true;
      }
      else this.isLoggedIn=false;

  }

  ngOnInit() {
      
    
  }

  logout(){
    this.fs.logout()
    localStorage.removeItem("user")
    window.location.replace("/signin");



  }

}
