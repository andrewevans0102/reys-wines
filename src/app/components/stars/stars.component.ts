import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-stars',
    templateUrl: './stars.component.html',
    styleUrls: ['./stars.component.scss'],
})
export class StarsComponent implements OnInit {
    @Output() outputStars = new EventEmitter<boolean[]>();
    stars = [false, false, false, false, false];

    constructor() {}

    ngOnInit(): void {}

    fillStars(star: number, fill: boolean) {
        for (let i = 0; i < this.stars.length; i++) {
            if (i <= star) {
                this.stars[i] = true;
            } else if (i > star) {
                this.stars[i] = false;
            }
        }
        this.outputStars.emit(this.stars);
    }
}
