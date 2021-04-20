import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
    title = environment.title;
    constructor(private router: Router) {}

    ngOnInit(): void {}

    goToLoginPage() {
        this.router.navigateByUrl('/login');
    }

    goToRegisterPage() {
        this.router.navigateByUrl('/register');
    }
}
