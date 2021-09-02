import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntriesListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { MenuButtonComponent } from './menu/button.component';
import { ReloadButtonComponent } from './menu/reload.component';
import { EntriesListItemComponent } from './list/item.component';
import { FeedsListComponent } from './feeds/list.component';
import { FeedsListItemComponent } from './feeds/item.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuButtonComponent,
    ReloadButtonComponent,
    EntriesListComponent,
    EntriesListItemComponent,
    FeedsListComponent,
    FeedsListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
