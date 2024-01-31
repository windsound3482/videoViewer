import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { DatabaseService} from '../database.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PasswordDialogComponent } from "../dialog/password-dialog/password-dialog.component";

@Component({
  selector: 'app-videoplayer',
  templateUrl: './videoplayer.component.html',
  styleUrls: ['./videoplayer.component.css']
})
export class VideoplayerComponent implements OnInit{
  name = "Angular";
  constructor(private route: ActivatedRoute,
    private service: DatabaseService,
    public dialog: MatDialog
   ) {}
  value=""
  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef={} as ElementRef;
  isPlay: boolean = false;
  currentVideo:any={fileName:""}
  videopath:string="https://vjs.zencdn.net/v/oceans.mp4"
  fileName=''
  vertified=false
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id') as string
    this.currentVideo.PID=decodeURIComponent(id)
    console.log(decodeURIComponent(id))
    this.service.getVideo("",this.currentVideo.PID).then((data) => {
      console.log(data)
      
      if (data.error)
        return
      this.currentVideo=data.data
      this.videopath = "http://localhost:4200/api/multimedia/"+this.currentVideo.fileName
      this.fileName=this.currentVideo.fileName.split('/').pop()

      this.getComments();
      console.log(this.currentVideo)
    })
 
  }
  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }

  sendComment(){
    let videonamePath=this.currentVideo.fileName.split('/')
    videonamePath.splice(-1)
    this.service.uploadComment(videonamePath.join('/'),this.currentVideo.fileName,
    {
      date: new Date().toLocaleString(),
      value:this.value}).then((data)=>{
        this.value='';
        this.getComments();
    })
  }

  comments:any;

  getComments(){
    console.log(this.currentVideo.fileName)
    this.service.getVideoComment(this.currentVideo.fileName).then((data)=>{
      this.comments=data
    });

  }

  deleteComment(date:string){
    this.service.deleteComment(this.currentVideo.fileName,date).then((data)=>{
      this.getComments();
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(PasswordDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result)
        this.vertified=true;
    });
  }

  updateOppo(oppo:string,oppoValue:string){
    this.service.uploadOppo(oppo,this.currentVideo.PID,oppoValue).then((data)=>{
      this.vertified=false;
    })
  }



 
}
