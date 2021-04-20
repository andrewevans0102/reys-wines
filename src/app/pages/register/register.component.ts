import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { PopupService } from 'src/app/services/popup/popup.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    // ios update 14.3 has bug where input field of type password will freeze safari
    // until a fix is pushed for this, taking in passwords in input type of text field
    // hidePassword = true;

    registerForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
    });

    constructor(
        private afAuth: AngularFireAuth,
        private firestore: AngularFirestore,
        private router: Router,
        private popupService: PopupService,
        private storageService: StorageService
    ) {}

    ngOnInit() {}

    getEmailErrorMessage() {
        return this.registerForm.controls.email.hasError('required')
            ? 'You must enter a value'
            : this.registerForm.controls.email.hasError('email')
            ? 'Not a valid email'
            : '';
    }

    async registerUser() {
        try {
            // create user with authentication service
            // on success this will also sign in this user to the current session
            const authResponse = await this.afAuth.createUserWithEmailAndPassword(
                this.registerForm.controls.email.value,
                this.registerForm.controls.password.value
            );
            await this.storageService.createProfile(
                authResponse.user.uid,
                this.registerForm.controls.firstName.value,
                this.registerForm.controls.lastName.value
            );
            this.popupService.showMessage(
                "You've been successfully registered!  You'll be logged in now"
            );
            this.router.navigateByUrl('/home-page');
        } catch (error) {
            this.popupService.showMessage(error.message);
            return;
        }
    }

    cancel() {
        this.router.navigateByUrl('/landing');
    }
}
