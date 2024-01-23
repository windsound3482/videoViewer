import { NgModule,} from '@angular/core';
import {UrlSegment,UrlSegmentGroup,Route,UrlMatchResult } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import { Routes, RouterModule } from '@angular/router';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
function filepathMatcher(segments: UrlSegment[], 
  group: UrlSegmentGroup, 
  route: Route) : UrlMatchResult  | null {
// match urls like "/files/:filepath" where filepath can contain '/'
    if (segments.length > 0) {
    // if first segment is 'files', then concat all the next segments into a single one
    // and return it as a parameter named 'filepath'
    if (segments[0].path == "Video") {
    return {
        consumed: segments,
        posParams: {
          videopath: new UrlSegment(segments.slice(1).join("/"), {})
        }
        };
      }
    }
  return null;
}
const routes: Routes = [
  { path: '', component: FileViewerComponent },
  { path: 'Video/:id', component: VideoplayerComponent },
  { path: '**', component: FileViewerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    VideoplayerComponent,
    FileExplorerComponent,
    FileViewerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
