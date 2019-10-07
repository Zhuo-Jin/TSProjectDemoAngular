
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule , RoutingComponents} from './app.routing.module';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { IntercepterService } from './Shared/intercepter.service';
import { ProjectService } from './Shared/project.service';
import { ContactService } from './Shared/contact.service';
import { MatDialogModule } from '@angular/material';
import { BsDatepickerModule } from 'ngx-bootstrap';

import { DatePipe } from '@angular/common';
import { DialogMessageBoxComponent } from './dialog-message-box/dialog-message-box.component';
import { UpsertContactComponent } from './Contact/upsert-contact/upsert-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    RoutingComponents,
    DialogMessageBoxComponent,
    UpsertContactComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BsDatepickerModule.forRoot(),
  ],
  entryComponents: [
    DialogMessageBoxComponent,
    UpsertContactComponent,
  ],
  providers: [
    ProjectService,
    ContactService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IntercepterService,
      multi:true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
    