import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { CustomerComponent } from './components/customer.component';
import { HomeComponent } from './components/home.component';
import { DatePipe } from '@angular/common';
import { CustomerService } from './Service/customer.service'

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule],
    declarations: [AppComponent, CustomerComponent, HomeComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, CustomerService, DatePipe],
    bootstrap: [AppComponent]

})
export class AppModule { }
