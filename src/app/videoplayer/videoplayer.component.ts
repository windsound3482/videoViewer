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
  PID:string=''
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id') as string
    this.PID=decodeURIComponent(id)
    console.log(decodeURIComponent(id))
    this.service.getVideo("",this.PID).then((data) => {
      console.log(data)
      if (data.error)
        return
      
      this.videopath = "http://localhost:4200/api/multimedia/"+data.data.fileName
      this.videoname = data.data.fileName
      this.getComments();
      console.log(this.videoname)
    })
 
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
