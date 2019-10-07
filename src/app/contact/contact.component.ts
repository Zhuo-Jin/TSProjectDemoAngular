import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/Shared/contact.service';
import { IContact } from '../app.interface';
import { TotalContactImg } from 'src/environments/environment';
import { MatDialog } from '@angular/material';
import { DialogMessageBoxComponent } from '../dialog-message-box/dialog-message-box.component';
import { UpsertContactComponent } from '../Contact/upsert-contact/upsert-contact.component';

UpsertContactComponent
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})

export class ContactComponent implements OnInit {
  contacts:IContact[];

  totalContactImg : number = TotalContactImg;
  constructor(private contactService: ContactService,
              private dialog:MatDialog,
    
    
    ) { }


  ngOnInit() {
    this.reFreshPage();
  }

  reFreshPage() {
    this.contactService.getAllAvalialeContacts()
    .subscribe(cs => this.contacts = cs);


  }

  removeContact(contactId: number){
    this.contactService.getDependentProjectNameByContactId(contactId)
    .subscribe( dep => {
      if (dep.length > 0){
        this.openMessage(dep); 
      }
      else{
        // remove contact
        this.contactService.removeContactById(contactId)
          .subscribe(contact => {this.reFreshPage();});
      }

    });
  }

  openUpsertDialog(contact : IContact) {
    const contactUpsertDialogRef = this.dialog.open(UpsertContactComponent, 
      {
        data: {
          contact : contact,
        },
      });

    contactUpsertDialogRef.afterClosed()
      .subscribe(result => {
        var saved = result;
        if (saved.saved == "insert")
          this.reFreshPage();
      }); 
 
  }

  // return => {
  //   if (return.saved == "insert"){
  //     this.reFreshPage();
  //   }
  // }

  openMessage(bodymsg:string[]) {
 
    const messageDialogRef = this.dialog.open(DialogMessageBoxComponent, 
      {
        data: {
          title : ["The contact has below project joined,", "please remove it before delete"] ,
          body : bodymsg,
        },
      });
  }
}
