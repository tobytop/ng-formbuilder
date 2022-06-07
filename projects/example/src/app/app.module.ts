import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormbuilderModule } from 'formbuilder';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormbuilderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
