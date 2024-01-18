import { AfterViewInit, Component } from '@angular/core';
import { DatabaseService} from '../database.service';
import { Router } from '@angular/router';

export interface FileElement {
  id?: string;
  isFolder: boolean;
  name: string;
  parent: string;
}
@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.css']
})
export class FileViewerComponent implements AfterViewInit  {
  constructor(
    private service: DatabaseService,
    public router: Router
  ) {}

  ngAfterViewInit(): void {
    this.refreshFileMap('Video')
  }

  private map:FileElement[] = [];

  currentRoot:any=null;
  canNavigateUp = false;
  public fileElements: FileElement[]=[];
  currentPath: string=''

  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  popFromPath(path: string) {
    let p = path ? path : '';
    let split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }

  queryInFolder(folderId: string) {
    const result: FileElement[] = [];
    this.map.forEach(element => {
      if (element.parent === folderId) {
        result.push(JSON.parse(JSON.stringify(element)));
      }
    });
    return result;
  }

  
  updateFileElementQuery() {
   
    this.fileElements = this.queryInFolder(this.currentRoot ? this.currentRoot.id : 'root');
  }

  navigateUp() {
   
    if (this.currentRoot && this.currentRoot.parent === 'root') {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
    } else {
      this.currentRoot = this.map.find(o => o.id === this.currentRoot.parent);
      this.updateFileElementQuery();
    }
    
    this.currentPath = this.popFromPath(this.currentPath);
    
  }

  navigateToFolder(element: FileElement) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  openFile(node:any){
    
   
  }

  checkoutFile(element: FileElement){
    this.router.navigate([this.currentPath+element.name]);
  }

  deleteCurrentFile(element: FileElement){
    this.service.deleteFile("Video",this.currentPath+element.name).then((data) => {
      this.refreshFileMap('Video')
    })
    
  }

  refreshFileMap(object:any){
    this.service.getFileStructure(object.type).then((data) => {
      this.map=data;
      console.log(data)
      this.updateFileElementQuery();
    });
  }

  uploadingImage=false

  uploadMultiMedia(file:any){
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.uploadingImage=true;
      this.service.uploadFile(this.currentPath,this.currentPath+'/'+file.files[0].name,fileReader.result as string).then((data) => {
        this.refreshFileMap('Video')
        this.uploadingImage=false
        file.value='';
      })
      
    }
    fileReader.readAsDataURL(file.files[0]);
    
    
  }
}
