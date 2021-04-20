import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { PopupService } from 'src/app/services/popup/popup.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Router } from '@angular/router';
import { Wine } from 'src/app/models/wine';
import { StarsService } from 'src/app/services/stars/stars.service';

@Component({
    selector: 'app-record',
    templateUrl: './record.component.html',
    styleUrls: ['./record.component.scss'],
})
export class RecordComponent implements OnInit {
    wineForm = new FormGroup({
        wineName: new FormControl(''),
        locationPurchased: new FormControl(''),
        winePicture: new FormControl(''),
        notes: new FormControl(''),
    });

    uploadPercent: Observable<number>;
    selectedFile = null;
    winePicture: Observable<any>;
    selectedWine: Observable<any>;
    stars = [false, false, false, false, false];
    loginUID: string;
    saving = false;
    showPercent: number;
    imagePath: any;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private popupService: PopupService,
        private storageService: StorageService,
        private starsService: StarsService
    ) {
        afAuth.authState.subscribe((user) => {
            if (user !== null) {
                this.loginUID = user.uid;
            } else {
                this.loginUID = null;
            }
        });
    }

    ngOnInit(): void {}

    uploadFile(event) {
        this.selectedFile = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = (_event) => {
            this.imagePath = reader.result;
        };
    }

    async recordWine() {
        try {
            this.saving = true;
            const rateStars = this.starsService.starsNumber(this.stars);
            const savedWine: Wine = {
                id: null,
                wineName: this.wineForm.controls.wineName.value,
                locationPurchased: this.wineForm.controls.locationPurchased
                    .value,
                rating: rateStars,
                notes: this.wineForm.controls.notes.value,
                winePicture: null,
                recorded: Date.now(),
            };

            // when a file has been selected show the percentage and loading screen
            this.uploadPercent = this.storageService.saveWineWithPicture(
                savedWine,
                this.loginUID,
                this.selectedFile,
                this.showPercent
            );
        } catch (error) {
            this.popupService.showMessage(error.message);
        }
    }

    back() {
        this.router.navigateByUrl('/home-page');
    }

    fillStars(event: any) {
        this.stars = event;
    }
}
