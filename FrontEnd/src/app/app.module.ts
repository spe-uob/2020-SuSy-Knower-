import { UnitService } from './services/unit.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NetworkComponent } from './network/network.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    NetworkComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [UnitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
