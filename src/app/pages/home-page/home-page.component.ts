import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup/popup.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    title = environment.title;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private popupService: PopupService
    ) {}

    ngOnInit(): void {}

    goToRecordPage() {
        this.router.navigateByUrl('/record');
    }

    goToViewPage() {
        this.router.navigateByUrl('/view');
    }

    goToAboutPage() {
        this.router.navigateByUrl('/about');
    }

    logout() {
        const dialogRef = this.popupService.showConfirmation(
            'Are you sure you want to logout?'
        );

        dialogRef.afterClosed().subscribe(async (result) => {
            // only actually logout if they say YES
            if (result === 'YES') {
                await this.afAuth
                    .signOut()
                    .then(() => {
                        this.router.navigateByUrl('/landing');
                    })
                    .catch((error) => {
                        this.popupService.showMessage(error.message);
                        return;
                    });
            }
        });
    }
}
