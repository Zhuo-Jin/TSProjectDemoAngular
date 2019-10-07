import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IContact } from '../../app.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/app/Shared/contact.service';

@Component({
  selector: 'app-upsert-contact',
  templateUrl: './upsert-contact.component.html',
  styleUrls: ['./upsert-contact.component.scss']
})
export class UpsertContactComponent implements OnInit {

  contact : IContact = {
    Id:0,
    Name:"",
    Mobile:"",
    Email:"",
    ImageNumber:0,
  };

  public mobilePatten = /^04\d{8}$/;
  public emailPatten = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.emailPatten)]],
    mobile: ['', [Validators.required, Validators.pattern(this.mobilePatten)]],
    
  });

  constructor(  public dialogref : MatDialogRef<UpsertContactComponent>, 
                @Optional() @Inject(MAT_DIALOG_DATA) public data: any, 
                private fb: FormBuilder,
                private contactService: ContactService,
               ) {
    if (data.contact != null)
          this.contact = data.contact;

                console.log(this.contact);

  }

  ngOnInit() {
     this.contactForm.controls['name'].setValue(this.contact.Name);
     this.contactForm.controls['email'].setValue(this.contact.Email);
     this.contactForm.controls['mobile'].setValue(this.contact.Mobile);
  }

  onCloseDialog(){
    this.dialogref.close({saved: "cancel"});
  }

  onCloseDialogWithSave(){
    if (!this.contactForm.get('mobile').invalid && !this.contactForm.get('email').invalid && !this.contactForm.get('name').invalid)
    {
      // construct contact
      this.contact.Name = this.contactForm.value.name;
      this.contact.Mobile = this.contactForm.value.mobile;
      this.contact.Email = this.contactForm.value.email;
      this.contactService.upsertContact(this.contact)
        .subscribe(con => {
                              if (this.contact.Id > 0){
                                this.dialogref.close({saved: "update"} ); 
                              }
                              else{
                                this.dialogref.close({saved: "insert"} );  
                              }
                            });
    }
    
    
  }
}
