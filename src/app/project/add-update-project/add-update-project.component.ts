import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { ProjectService } from 'src/app/Shared/project.service';
import { ContactService } from 'src/app/Shared/contact.service';
import { IProject , IProjectContactItem, IContact} from '../../app.interface';
import { DatePipe } from '@angular/common';
import { TotalContactImg } from 'src/environments/environment';
import { DialogMessageBoxComponent } from '../../dialog-message-box/dialog-message-box.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-add-update-project',
  templateUrl: './add-update-project.component.html',
  styleUrls: ['./add-update-project.component.scss']
})
export class AddUpdateProjectComponent implements OnInit {

  totalContactImg : number = TotalContactImg;
  projectId: number;
  private sub: any;

  selectedContactItems : IContact[] =  [];
  avaliableContactItems : IContact[];

  project : IProject = {
    Id:0,
    ProjectName:"",
    ProjectDescription:"",
    CreateTime:null,
    CloseTime:null,
    ImageNumber:0,
    ProjectContactItems : null,

  };

  parsedDate:string = "";
  displayError: string[] = [];
  loading:boolean = false;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private projectService : ProjectService,
              private contactService : ContactService, 
              private datePipe: DatePipe,
              private dialog:MatDialog,
              ) { 
              
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.projectId = params['id']; 
      
      this.getProjectDetail();
      
   });

  }

  getProjectDetail(){
    if (this.projectId != null && this.projectId != 0){
      this.projectService.getProjectById(this.projectId)
      .subscribe(p => {
                          this.project = p;
                          this.parsedDate =  this.datePipe.transform(this.project.CloseTime, 'yyyy-MM-dd');
                          
                          this.getSelectedContactDetail();
                       });

    }  
    else{
      this.getAllContactDetail();
    }

  }

  getAllContactDetail(){
    this.contactService.getAllAvalialeContacts().subscribe(contacts => {this.avaliableContactItems =contacts;})
  }

  getSelectedContactDetail(){
    this.contactService.getAllAvalialeContacts()
      .subscribe(contacts => {
        this.avaliableContactItems = contacts;
        for (let contactItem of this.project.ProjectContactItems){
          const index: number = this.contactExsit(contactItem.Contact, contacts);
          if (index != -1) {// exist
            this.selectedContactItems.push(contactItem.Contact);
            this.avaliableContactItems.splice(index, 1);
          }
        }
      })
  }

  contactExsit(contact:IContact, ContactList: IContact[]) : number {
    for (let i = 0; i < ContactList.length ; i++)
    {
      if (ContactList[i].Id == contact.Id) 
        return i;
    }

    return -1;

  }

  selectContact(contact: IContact){
    this.selectedContactItems.push(contact);
    const index: number = this.contactExsit(contact, this.avaliableContactItems)
    this.avaliableContactItems.splice(index, 1);
  }

  cancelContact(contact: IContact){
    this.avaliableContactItems.push(contact);
    const index: number = this.contactExsit(contact, this.selectedContactItems)
    this.selectedContactItems.splice(index, 1);
  }


  onSubmit(){

    
    this.displayError = this.constructValidationMessage();
    if (this.displayError.length == 0){
      this.project.CreateTime =  '2017-01-01';
      this.loading = true;

      this.project.CloseTime =  formatDate(this.parsedDate) + "T00:00:00Z"; 
      
      var projectContactItems: IProjectContactItem[] = [];
      for(let contact of this.selectedContactItems)
      {
        projectContactItems.push({
          Id: 0,
          ProjectId: this.project.Id,
          ContactId: contact.Id,
          Contact:contact
        });
      }
      this.project.ProjectContactItems = projectContactItems;
      this.projectService.upsertProject(this.project)
        .subscribe(result => {this.loading = false; this.goToProjectPage()});
    }
    else{
      const messageDialogRef = this.dialog.open(DialogMessageBoxComponent, 
        {
          data: {
            title : ["please fix the below error"] ,
            body : this.displayError,
          },
        });

    }
    
  }

  constructValidationMessage() : string[]
  {
    var message :string[] = [];
    if (this.project.ProjectName == "")
      message.push("NAME cannot be blank"); 

    if (this.project.ProjectName.length > 24)
      message.push("NAME cannot be longer than 24 char"); 

    if (this.parsedDate == "")
      message.push("Dead Line cannot be blank"); 

    if (this.selectedContactItems.length == 0)
      message.push("Select at least 1 CONTACT from above"); 

    return message;
  }

  goToProjectPage(){
    this.router.navigate(['project']);
  }

}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

