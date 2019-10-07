import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-message-box',
  templateUrl: './dialog-message-box.component.html',
  styleUrls: ['./dialog-message-box.component.scss']
})
export class DialogMessageBoxComponent implements OnInit {

  title :string[];
  body : string[];

  constructor(public dialogref : MatDialogRef<DialogMessageBoxComponent>, 
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, ) { 
      this.title = data.title;
      this.body = data.body;

    }

  ngOnInit() {
  }

  onClose(){
    this.dialogref.close();
  }
}
