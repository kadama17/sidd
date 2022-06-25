import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import Tutorial from 'src/app/models/tutorial';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = new Tutorial();
  submitted = false;
  nom= localStorage.getItem("equipemeent")

  constructor(private tutorialService: TutorialService, public router: Router) { }

  ngOnInit(): void {
    console.log
    this.tutorial.nom= this.nom
  }

  saveTutorial(): void {
    try{
      this.tutorialService.create(this.tutorial).then(() => {
        console.log('Created new item successfully!');
        localStorage.removeItem("equipemeent")

        this.submitted = true;
      });

    }
    catch(e){
      console.log(e)
    }
  }

  newTutorial(): void {
    this.router.navigate(['/']);

    this.submitted = false;
    this.tutorial = new Tutorial();    

  }
}
