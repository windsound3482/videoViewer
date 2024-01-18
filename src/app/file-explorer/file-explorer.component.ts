import { Component, Input, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';




interface FileElement {
  id?: string;
  isFolder: boolean;
  name: string;
  parent: string;
}

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})

export class FileExplorerComponent implements OnInit{
  constructor() {}

  @Input() fileElements: FileElement[]=[];
  @Input() canNavigateUp: boolean=false;
  @Input() path: string="";
  @Input() type: string='';
 

  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();

  //use click to select the file 
  @Output() checkoutFile = new EventEmitter<FileElement>();
  @Output() deleteCurrentFile = new EventEmitter<FileElement>();

  pictureHeight=200
  

  ngOnChanges(changes: SimpleChanges): void {
    this.onBoxResize
  }


  navigate(element: FileElement) {
    if (element.isFolder) {
      this.navigatedDown.emit(element);
    }
    else
    {
      this.checkoutFile.emit(element);
    }
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  open(element: FileElement){
    if (!element.isFolder) 
      window.open('api/multimedia/'+this.path+element.name)
  }

  deleteFile(element: FileElement){
    if (!element.isFolder) {
      this.deleteCurrentFile.emit(element)
    }
  }

  boxWidth=1920

  ngOnInit(): void {
    this.boxWidth=window.innerWidth ;
  }

  onBoxResize(box:any){
    console.log(box)
    this.boxWidth=window.innerWidth;
  }

}
