import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { TripsComponent } from './components/trips/trips.component';
import { AgentsComponent } from './components/agents/agents.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';
import { OnGoingTripsComponent } from './components/on-going-trips/on-going-trips.component';
import { AppHttpInterceptor } from './app-http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    TripsComponent,
    AgentsComponent,
    HeaderComponent,
    DashboardComponent,
    SignupComponent,
    OnGoingTripsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      closeButton: true,
    }),
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
