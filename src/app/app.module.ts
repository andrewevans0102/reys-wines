import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ViewComponent } from './pages/view/view.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RecordComponent } from './pages/record/record.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageComponent } from './components/message/message.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShareComponent } from './components/share/share.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EditComponent } from './pages/edit/edit.component';
import { StarsComponent } from './components/stars/stars.component';
import { ProgressComponent } from './components/progress/progress.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        LoginComponent,
        RegisterComponent,
        AboutComponent,
        LandingComponent,
        ViewComponent,
        PageNotFoundComponent,
        RecordComponent,
        MessageComponent,
        ConfirmationComponent,
        ShareComponent,
        EditComponent,
        StarsComponent,
        ProgressComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireAuthGuardModule,
        AngularFireStorageModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            registrationStrategy: 'registerImmediately',
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
