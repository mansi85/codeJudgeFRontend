import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SegmentVideoService } from "src/app/services/segment-video.service";

@Component({
  selector: "app-combine-video",
  templateUrl: "./combine-video.component.html",
  styleUrls: ["./combine-video.component.scss"],
})
export class CombineVideoComponent implements OnInit {
  combineVideoUrl = "";
  /** Combine video form */
  combineVideoForm = this.formBuilder.group({
    segments: this.formBuilder.array([]),
    width: [null, Validators.required],
    height: [null, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private segmentVideoService: SegmentVideoService
  ) {}

  ngOnInit() {}

  /** Add video form */
  buildAddVideoForm(): FormGroup {
    const addVideoForm = this.formBuilder.group({
      video_url: [null, Validators.required],
      start: [null, Validators.required],
      end: [null, Validators.required],
    });
    return addVideoForm;
  }

  /** getters/setters */
  get segments() {
    return this.combineVideoForm.get("segments") as FormArray;
  }
  get height() {
    return this.combineVideoForm.get("height");
  }
  get width() {
    return this.combineVideoForm.get("width");
  }
  get video_url() {
    return this.segments.get("video_url");
  }
  get start() {
    return this.segments.get("start");
  }
  get end() {
    return this.segments.get("end");
  }

  /** Add video segment */
  addVideoSegment(): void {
    this.segments.push(this.buildAddVideoForm());
    console.log("After adding ele");
    for (let i = 0; i < this.segments.length; i++) {
      console.log(this.segments.at(i).value);
    }
  }

  /** Delete video segment */
  removeVideoSegment(index: number): void {
    this.segments.removeAt(index);
    console.log("After removing ele");
    for (let i = 0; i < this.segments.length; i++) {
      console.log(this.segments.at(i).value);
    }
  }

  /** Combine segmented videos */
  onCombineVideoFormSubmit(): void {
    console.log(this.combineVideoForm.value);
    this.segmentVideoService
      .combineVideo(this.combineVideoForm.value)
      .subscribe((data) => {
        console.log(data);
        this.combineVideoUrl = data["video_url"];
      });
  }

  /** To enable/disable comabine video button */
  isCombineVideoDisabled(): boolean {
    if (
      this.combineVideoForm.valid &&
      this.combineVideoForm.get("height").value > 0 &&
      this.combineVideoForm.get("width").value > 0
    ) {
      return false;
    } else {
      return true;
    }
  }
}
