import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { QueryService } from "./query.service";
import { AppRoutingModule } from "./app.routing.module";
import { HomeComponent } from "./home/home.component";
import { CrudComponent } from "./crud/crud.component";
import { PracticeComponent } from "./practice/practice.component";

@NgModule({
  declarations: [
    AppComponent, HomeComponent, CrudComponent, PracticeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule
  ],
  providers: [QueryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

















