import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { PopupService } from '../popup/popup.service';
import { Router } from '@angular/router';
import { StarsService } from '../stars/stars.service';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor(
        private firestore: AngularFirestore,
        private storage: AngularFireStorage,
        private popupService: PopupService,
        private router: Router,
        private starsService: StarsService
    ) {}

    saveWineWithPicture(
        wine: any,
        loginUID: string,
        selectedFile: any,
        showPercent: number
    ) {
        if (wine.id === null) {
            wine.id = this.firestore.createId();
        }
        wine.winePicture = `${loginUID}/${wine.id}`;
        const task = this.storage.upload(wine.winePicture, selectedFile);
        task.snapshotChanges()
            .pipe(
                finalize(async () => {
                    this.saveWine(wine, loginUID);
                })
            )
            .subscribe();

        const saveTask = task.percentageChanges();
        saveTask.subscribe(
            (percentage) => {
                showPercent = Math.floor(percentage);
            },
            (error) => {
                this.popupService.showMessage(error.message);
            },
            () => {
                selectedFile = null;
                this.popupService.showMessage('Wine save was successful!');
                this.back();
            }
        );
        return saveTask;
    }

    async saveWine(wine, loginUID) {
        if (wine.id === null) {
            throw new Error('id was not found');
        }
        const wineDocument = this.firestore.doc<any>(`user/${loginUID}`);
        const wineCollection = wineDocument.collection<any>('wine');
        await wineCollection.doc(wine.id).set(wine);
    }

    getPhotoEditURL(winePicture) {
        return this.storage.ref(winePicture).getDownloadURL();
    }

    async deleteWine(wineId, loginUID) {
        const wineDocument = this.firestore.doc<any>(`user/${loginUID}`);
        const wineCollection = wineDocument.collection<any>('wine');
        await wineCollection.doc(wineId).delete();
        await this.storage.storage
            .ref()
            .child(`${loginUID}/${wineId}`)
            .delete();
    }

    async sendWine(wine, loginUID, sendNumber, authToken) {
        const downloadURL = await this.storage.storage
            .ref()
            .child(`${loginUID}/${wine.id}`)
            .getDownloadURL();
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
        };
        const shareRequest = {
            wineName: wine.wineName,
            locationPurchased: wine.locationPurchased,
            wineRating: this.starsService.starsNumber(wine.stars),
            downloadURL: downloadURL,
            phone: '+1' + sendNumber,
            notes: wine.notes,
            userId: loginUID,
        };
        const response = await axios.post(environment.share, shareRequest, {
            headers: headers,
        });
        const responseMessage = response.data;

        return responseMessage;
    }

    async retrieveWines(loginUID) {
        const wineDocument = this.firestore.doc<any>(`user/${loginUID}`);
        const wineCollection = wineDocument.collection<any>('wine', (ref) =>
            ref.orderBy('recorded', 'desc')
        );

        const wines = [];
        const wineResponse = await wineCollection.ref.get();
        wineResponse.forEach((w) => {
            const wine = {
                id: w.data().id,
                notes: w.data().notes,
                rating: w.data().rating,
                recorded: w.data().recorded,
                wineName: w.data().wineName,
                locationPurchased: w.data().locationPurchased,
                winePicture: this.storage
                    .ref(w.data().winePicture)
                    .getDownloadURL(),
                stars: this.starsService.populateStars(w.data().rating),
                show: false,
            };
            wines.push(wine);
        });

        return wines.sort((a, b) => {
            return b.recorded - a.recorded;
        });
    }

    async retrieveWine(loginUID: string, editID: string) {
        const wineDocument = this.firestore.doc<any>(`user/${loginUID}`);
        const wineCollection = wineDocument.collection<any>('wine');
        const wine = await wineCollection.ref.doc(editID).get();
        return wine;
    }

    async createProfile(loginUID: string, fName: string, lName: string) {
        const profileDocument = this.firestore.doc<any>(`user/${loginUID}`);
        const profileCollection = profileDocument.collection<any>('profile');
        await profileCollection.doc('/0/').set({
            firstName: fName,
            lastName: lName,
        });
    }

    back() {
        this.router.navigateByUrl('/home-page');
    }
}
