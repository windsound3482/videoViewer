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

  async getVideo(name:string,PID:string){
    const url: string = 'http://localhost:4200/api/multimedia/get/Video';
    let response = await fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        "name":name,
        'PID':PID
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

  async getVideoComment(name:string){
    const url: string = 'http://localhost:4200/api/multimedia/VideoComment/'+name;
    console.log(url)
    let response = await fetch(url,{
      method: 'GET'
    });
    let data: any = await response.json();
    return data;
  }

  async uploadComment(path:string,name:string,fileData:any){
  
    const url: string = 'http://localhost:4200/api/multimedia/upload/VideoComment';
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

  async uploadDescription(pid:string,description:string){
  
    const url: string = 'http://localhost:4200/api/multimedia/updateOppo/Video';
    let response = await fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        'oppo':"description",
        'pid':pid,
        "oppoValue":description
      }),
      headers: { "Content-Type": "application/json" }
    });
    let data: any = await response.json();
    return data;
  }

  async deleteComment(filepath:string,date:string){
  
    const url: string = 'http://localhost:4200/api/multimedia/delete/VideoComment';
    let response = await fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        'filepath':filepath,
        "date":date,
      }),
      headers: { "Content-Type": "application/json" }
    });
    let data: any = await response.json();
    return data;
  }

  async vertifyPassword(password:string){
  
    const url: string = 'http://localhost:4200/api/password';
    let response = await fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        'password':password,
      }),
      headers: { "Content-Type": "application/json" }
    });
    let data: any = await response.json();
    return data;
  }


}
