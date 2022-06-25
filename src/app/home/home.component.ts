import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 usb = "usb";
 projecteur= "projecteur"
 rallonge="rallonge"
 marqueur = "marqueur"
 chaise = "chaise"
 ecran = "ecran"
 hdmi = "hdmi"
 hdmivga= "hdmi-vga" 
  constructor(   private router: Router ) { }

  ngOnInit(): void {

    if(!localStorage.getItem("user"))
    window.location.replace("/signin");
  
  }

  valueOnStore(value){
    console.log(value)
    localStorage.setItem("equipemeent", value)
    this.router.navigate(['/add']);

  }

  
}
