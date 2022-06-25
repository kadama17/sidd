import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public signUpFailed: boolean;
  
  constructor(public fb: FormBuilder,
    public fs: TutorialService,
    public router: Router) { 
      this.signUpFailed = false;
     

      this.signUpForm = this.fb.group({
          email: new FormControl('', [ Validators.required, Validators.email ]),
          password: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
          confirm_password: new FormControl('', [ Validators.required, Validators.minLength(6) ]),

        
      }, { 
        validator: this.ConfirmedValidator('password', 'confirm_password')
      });
    }
    get f(){
      return this.signUpForm.controls;
    }

  ngOnInit(): void {
  }

    ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
            console.log(error)
        } else {
            matchingControl.setErrors(null);
        }
    }
}
  async signUp(fg: FormGroup) {
    console.log(fg)
    try {
        this.signUpFailed = false;
        if (!fg.valid) throw new Error('Invalid sign-in credentials');
        const result = await this.fs.signUp(fg.value.email, fg.value.password);
        console.log('that tickles', result);
          if (result)     
          window.location.replace("/signin");

          
        else throw new Error('Sign-in failed');
    } catch (error) {
        console.log(error);
        this.signUpFailed = true;
    }
}

}
