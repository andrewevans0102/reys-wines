import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { PopupService } from 'src/app/services/popup/popup.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StarsService } from 'src/app/services/stars/stars.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
    wineForm = new FormGroup({
        wineName: new FormControl(''),
        locationPurchased: new FormControl(''),
        winePicture: new FormControl(''),
        notes: new FormControl(''),
    });

    uploadPercent: Observable<number>;
    selectedFile = null;
    winePicture: Observable<any>;
    stars = [false, false, false, false, false];
    loginUID: string;
    saving = false;
    showPercent: number;
    imagePath: any;
    editID: string;
    winePictureFromOriginal: string;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private popupService: PopupService,
        private storageService: StorageService,
        private route: ActivatedRoute,
        private starsService: StarsService
    ) {
        afAuth.authState.subscribe(async (user) => {
            if (user !== null) {
                this.loginUID = user.uid;
                const routeParams = this.route.snapshot.paramMap;
                this.editID = routeParams.get('id');
                this.loginUID = user.uid;
                const wine = await this.storageService.retrieveWine(
                    this.loginUID,
                    this.editID
                );
                this.wineForm.controls.wineName.setValue(wine.data().wineName);
                this.wineForm.controls.locationPurchased.setValue(
                    wine.data().locationPurchased
                );
                this.wineForm.controls.notes.setValue(wine.data().notes);
                this.imagePath = await this.storageService
                    .getPhotoEditURL(wine.data().winePicture)
                    .toPromise();
                this.winePictureFromOriginal = wine.data().winePicture;
                this.stars = this.starsService.populateStars(
                    wine.data().rating
                );
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
            const savedWine = {
                id: this.editID,
                wineName: this.wineForm.controls.wineName.value,
                locationPurchased: this.wineForm.controls.locationPurchased
                    .value,
                rating: this.starsService.starsNumber(this.stars),
                notes: this.wineForm.controls.notes.value,
                winePicture: null,
                recorded: Date.now(),
            };
            if (this.selectedFile === null) {
                savedWine.winePicture = this.winePictureFromOriginal;
                await this.storageService.saveWine(savedWine, this.loginUID);
                this.back();
            } else {
                // when a file has been selected show the percentage and loading screen
                this.uploadPercent = this.storageService.saveWineWithPicture(
                    savedWine,
                    this.loginUID,
                    this.selectedFile,
                    this.showPercent
                );
            }
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
