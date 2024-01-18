import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { DatabaseService} from '../database.service';

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit{
  name = "Angular";
  constructor(private route: ActivatedRoute,
    private service: DatabaseService
   ) {}
  value=""
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef={} as ElementRef;
  isPlay: boolean = false;
  videopath:string="https://vjs.zencdn.net/v/oceans.mp4"
  videoname:string=""
  ngOnInit(): void {
    this.videopath = "http://localhost:4200/api/multimedia/Video/"+this.route.snapshot.paramMap.get('videopath') as string
    this.videoname = "Video/"+this.route.snapshot.paramMap.get('videopath') as string
    this.getComments();
    console.log(this.videoname)
  }
  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }

  sendComment(){
    let videonamePath=this.videoname.split('/')
    videonamePath.splice(-1)
    this.service.uploadComment(videonamePath.join('/'),this.videoname,
    {
      date: new Date().toLocaleString(),
      value:this.value}).then((data)=>{
        this.value='';
        this.getComments();
    })
  }

  comments:any;

  getComments(){
    console.log(this.videoname)
    this.service.getVideoComment(this.videoname).then((data)=>{
      this.comments=data
    });

  }

  deleteComment(date:string){
    this.service.deleteComment(this.videoname,date).then((data)=>{
      this.getComments();
    })
  }



 
}
