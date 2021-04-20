import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
    @Input() showPercent: number;

    constructor() {}

    ngOnInit(): void {}
}
