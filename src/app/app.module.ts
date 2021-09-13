import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { SegmentVideoService } from './services/segment-video.service';
import { MatCardModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { SegmentVideoComponent } from './components/segment-video/segment-video.component';
import { CombineVideoComponent } from './components/combine-video/combine-video.component';

@NgModule({
  declarations: [
    AppComponent,
    SegmentVideoComponent,
    CombineVideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  providers: [SegmentVideoService],
  bootstrap: [AppComponent],
  exports: [MatButtonModule,
    MatInputModule,

    MatSelectModule]
})
export class AppModule { }
