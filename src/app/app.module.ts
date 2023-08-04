import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BooksComponent } from './pages/books/books.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import { BookComponent } from './components/book/book.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AddEditBookComponent } from './components/add-edit-book/add-edit-book.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: '', pathMatch: 'full', redirectTo: '/books' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    PurchaseComponent,
    PageNotFoundComponent,
    AuthorCardComponent,
    BookComponent,

    AddEditBookComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
