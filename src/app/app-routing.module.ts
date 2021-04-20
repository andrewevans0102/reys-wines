import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { EditComponent } from './pages/edit/edit.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RecordComponent } from './pages/record/record.component';
import { RegisterComponent } from './pages/register/register.component';
import { ViewComponent } from './pages/view/view.component';
import {
    AngularFireAuthGuard,
    redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
    { path: 'landing', component: LandingComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'home-page',
        component: HomePageComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    {
        path: 'record',
        component: RecordComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    {
        path: 'view',
        component: ViewComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    {
        path: 'about',
        component: AboutComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    {
        path: 'edit/:id',
        component: EditComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
    },
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
