import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SegmentVideoService } from "src/app/services/segment-video.service";

@Component({
  selector: "app-segment-video",
  templateUrl: "./segment-video.component.html",
  styleUrls: ["./segment-video.component.scss"],
})
export class SegmentVideoComponent implements OnInit {
  segmentSettings = ["Interval Duration"];
  showInterval = false;
  segmentVideos = [];
  showLoading: boolean = false;

  videoUrlPattern = "(https)://.*.mp4$";

  constructor(
    private formBuilder: FormBuilder,
    private segmentVideoService: SegmentVideoService
  ) {}

  ngOnInit() {}

  /** segment video form */
  segmentVideoForm = this.formBuilder.group({
    videoUrl: [
      null,
      [Validators.required, Validators.pattern(this.videoUrlPattern)],
    ],
    segmentSetting: [null, Validators.required],
    interval: [null, Validators.required],
  });

  /** getters/setter for form */
  get videoUrl() {
    return this.segmentVideoForm.get("videoUrl");
  }
  get segmentSetting() {
    return this.segmentVideoForm.get("segmentSetting");
  }
  get interval() {
    return this.segmentVideoForm.get("interval");
  }

  /** Segment video form submission */
  onSegmentVideoFormSubmit(): void {
    this.showLoading = true;
    this.segmentVideoService
      .segmentVideo(this.segmentVideoForm.value)
      .subscribe((data) => {
        console.log(data);
        this.segmentVideos = data["interval_videos"];
        this.showLoading = false;
      });
  }

  /** On segment setting change event listener */
  onSettingChange(): void {
    console.log("setting changed...");
    console.log(this.segmentSetting.value);
    this.showInterval =
      this.segmentSetting.value === "Interval Duration" ? true : false;
  }
}
