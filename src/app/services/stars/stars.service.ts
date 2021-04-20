import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StarsService {
    constructor() {}

    starsNumber(stars: boolean[]): number {
        let rateStars = 0;
        stars.forEach((star) => {
            if (star) {
                rateStars = rateStars + 1;
            }
        });
        return rateStars;
    }

    populateStars(rating: number): boolean[] {
        // populate stars
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(true);
            } else {
                stars.push(false);
            }
        }
        return stars;
    }
}
