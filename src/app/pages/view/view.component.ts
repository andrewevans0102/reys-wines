import { Component, OnInit } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup/popup.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
    originalWine = [];
    wineSaved = [];
    fileRoot = '';
    loginUID: string;
    sending = false;
    wineName = '';
    authToken = '';

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private popupService: PopupService,
        private storageService: StorageService
    ) {
        afAuth.authState.subscribe(async (user) => {
            this.loginUID = user.uid;
            this.originalWine = await this.storageService.retrieveWines(
                this.loginUID
            );
            this.wineSaved = this.originalWine;
            this.authToken = await user.getIdToken();
        });
    }

    ngOnInit(): void {}

    searchName(event) {
        this.wineName = event.target.value;
        if (this.wineName === '') {
            this.wineSaved = this.originalWine;
        } else {
            this.wineSaved = this.originalWine.filter((value) =>
                value.wineName
                    .toUpperCase()
                    .includes(this.wineName.toUpperCase())
            );
        }
    }

    show(id: string) {
        for (let i = 0; i < this.wineSaved.length; i++) {
            if (this.wineSaved[i].id === id) {
                this.wineSaved[i].show = !this.wineSaved[i].show;
                break;
            }
        }
    }

    async delete(wine: any) {
        try {
            const dialogRef = this.popupService.showConfirmation(
                'Are you sure you want to delete this wine?'
            );

            dialogRef.afterClosed().subscribe(async (result) => {
                // only actually delete if they say YES
                if (result === 'YES') {
                    await this.storageService.deleteWine(
                        wine.id,
                        this.loginUID
                    );
                    this.wineSaved = this.originalWine.filter(
                        (value) => value.id !== wine.id
                    );
                    this.originalWine = this.wineSaved;
                }
            });
        } catch (exception) {
            this.popupService.showMessage(exception);
        }
    }

    edit(wine: any) {
        this.router.navigateByUrl(`/edit/${wine.id}`);
    }

    async share(wine: any) {
        try {
            const dialogRef = this.popupService.showShare();

            dialogRef.afterClosed().subscribe(async (result) => {
                const phone = result.replace('+1', '');
                this.sending = true;
                const response = await this.storageService.sendWine(
                    wine,
                    this.loginUID,
                    phone,
                    this.authToken
                );
                this.sending = false;
                this.popupService.showMessage(response);
            });
        } catch (exception) {
            this.sending = false;
            this.popupService.showMessage(exception);
        }
    }

    back() {
        this.router.navigateByUrl('/home-page');
    }
}
