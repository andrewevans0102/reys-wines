import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PopupService } from 'src/app/services/popup/popup.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    // ios update 14.3 has bug where input field of type password will freeze safari
    // until a fix is pushed for this, taking in passwords in input type of text field
    // hidePassword = true;
    processing = false;
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl(''),
    });

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private popupService: PopupService
    ) {}

    ngOnInit() {}

    getEmailErrorMessage() {
        return this.loginForm.controls.email.hasError('required')
            ? 'You must enter a value'
            : this.loginForm.controls.email.hasError('email')
            ? 'Not a valid email'
            : '';
    }

    async loginUser() {
        try {
            this.processing = true;
            await this.afAuth.signInWithEmailAndPassword(
                this.loginForm.controls.email.value,
                this.loginForm.controls.password.value
            );
            this.processing = false;
            this.router.navigateByUrl('/home-page');
        } catch (error) {
            this.popupService.showMessage(error.message);
            this.processing = false;
            return;
        }
    }

    cancel() {
        this.router.navigateByUrl('/landing');
    }
}
