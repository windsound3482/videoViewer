import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent {
  constructor(
    private service: DatabaseService,
    public dialogRef: MatDialogRef<PasswordDialogComponent>
  ) {}
  password=""
  vertifyPassword(password:string){
    this.service.vertifyPassword(password).then((data)=>{
      this.dialogRef.close(data.vertify)
    })
  }
}
