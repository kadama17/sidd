import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup;
  public signInFailed: boolean;
  public userAuth: Subscription;
  constructor(public fb: FormBuilder, public fs: TutorialService, public router: Router) {


    this.signInFailed = false;
    this.signInForm = this.fb.group({
        email: new FormControl('', [ Validators.required, Validators.email ]),
        password: new FormControl('', [ Validators.required, Validators.minLength(6) ])
    });

  }
 ngOnDestroy(): void {
        if (this.userAuth) this.userAuth.unsubscribe();
    }
  ngOnInit(): void {

  }
  async signIn(fg: FormGroup) {
    console.log(fg)
    try {
        this.signInFailed = false;
        if (!fg.valid) throw new Error('Invalid sign-in credentials');
        const result = await this.fs.signIn(fg.value.email, fg.value.password);
        console.log('that tickles', result);
        if (result)           window.location.replace("/interventions");

        else throw new Error('Sign-in failed');
    } catch (error) {
        console.log(error);
        this.signInFailed = true;
    }
}
}
