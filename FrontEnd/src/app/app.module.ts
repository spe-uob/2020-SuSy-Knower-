import { UnitService } from './unit.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';

import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NetworkGraphComponent } from './components/network-graph/network-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    NetworkGraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [UnitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
