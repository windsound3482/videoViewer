import { Component, Input, SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { PasswordDialogComponent } from '../dialog/password-dialog/password-dialog.component';
import { MatDialog } from '@angular/material/dialog';



interface FileElement {
  id?: string;
  description?:string;
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
  constructor(public dialog: MatDialog) {}

  @Input() fileElements: FileElement[]=[];
  @Input() canNavigateUp: boolean=false;
  @Input() path: string="";
  @Input() type: string='';
 

  @Output() navigatedDown = new EventEmitter<FileElement>();
  @Output() navigatedUp = new EventEmitter();

  //use click to select the file 
  @Output() checkoutFile = new EventEmitter<FileElement>();
  @Output() deleteCurrentFile = new EventEmitter<FileElement>();

  pictureHeight=170
  

  ngOnChanges(changes: SimpleChanges): void {
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
  vertified=false

  openDialog() {
    const dialogRef = this.dialog.open(PasswordDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result)
        this.vertified=true;
    });
  }

 

}
