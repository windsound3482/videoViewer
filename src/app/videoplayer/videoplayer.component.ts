import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit{
  name = "Angular";
  constructor(private route: ActivatedRoute) {}
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef={} as ElementRef;
  isPlay: boolean = false;
  videopath:string="https://vjs.zencdn.net/v/oceans.mp4"
  ngOnInit(): void {
    this.videopath = "http://localhost:4200/api/multimedia/Video/"+this.route.snapshot.paramMap.get('videopath') as string
    console.log(this.videopath)
  }
  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }
  
}
