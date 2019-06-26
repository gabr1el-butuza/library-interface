import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BooksComponent } from './books/books.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FeedbackComponent } from './feedback/feedback.component';
import {Router, RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BookComponent } from './books/book/book.component';
import { BookTextFilterPipe } from './shared/book-text-filter.pipe';
import { RegisterComponent } from './register/register.component';


import { ModalModule } from 'ngx-bootstrap/modal';
import {NgbButtonsModule} from "@ng-bootstrap/ng-bootstrap";
import { PdfViewerModule } from 'ng2-pdf-viewer';



const appRoutes : Routes = [
  {
    path:'',
    component:BooksComponent,
    pathMatch:'full'
  },
  {
    path:'books',
    component: BooksComponent
  },
  {
    path:'feedback',
    component:FeedbackComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BooksComponent,
    NotFoundComponent,
    FeedbackComponent,
    BookComponent,
    BookTextFilterPipe,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgbButtonsModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
