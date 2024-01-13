import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { 
    
  } 


  async uploadFile(path:string,name:string,fileData:any){
  
    const url: string = 'http://localhost:4200/api/multimedia/upload/Video';
    let response = await fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        'path':path,
        "name":name,
        "fileData":fileData
      }),
      headers: { "Content-Type": "application/json" }
    });
    let data: any = await response.json();
    return data;
  }

  async deleteFile(type:string,name:string){
    const url: string = 'http://localhost:4200/api/multimedia/delete/Video';
    let response = await fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        'type':type,
        "name":name
      }),
      headers: { "Content-Type": "application/json" }
    });
    let data: any = await response.json();
    return data;
  }

  async getFileStructure(type:string){
    const url: string = 'http://localhost:4200/api/multimedia/Video';
    let response = await fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        'type':type
      }),
      headers: { "Content-Type": "application/json" }
    });
    let data: any = await response.json();
    return data;
  }

}
