import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'reys-wines';

    offline: boolean;

    // originally copied from okta tutorial at
    // https://developer.okta.com/blog/2019/01/30/first-angular-pwa#monitor-your-networks-status
    ngOnInit(): void {
        window.addEventListener(
            'online',
            this.onNetworkStatusChange.bind(this)
        );
        window.addEventListener(
            'offline',
            this.onNetworkStatusChange.bind(this)
        );
    }

    onNetworkStatusChange() {
        this.offline = !navigator.onLine;
        console.log('offline ' + this.offline);
    }
}
