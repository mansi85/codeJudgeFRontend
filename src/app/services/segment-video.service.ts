import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SegmentVideoService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };
  constructor(private http: HttpClient) {}

  segmentVideo(videoParameters) {
    let segmentVideoUrl = environment.apiUrl + "/api/process-interval";
    let segmentVideoBody = {
      video_link: videoParameters.videoUrl,
      interval_duration: Number(videoParameters.interval),
    };
    return this.http
      .post(segmentVideoUrl, segmentVideoBody, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  combineVideo(videoParameters) {
    let combineVideoUrl = environment.apiUrl + "/api/combine-video";
    return this.http
      .post(combineVideoUrl, videoParameters, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError("Something bad happened; please try again later.");
  }
}
