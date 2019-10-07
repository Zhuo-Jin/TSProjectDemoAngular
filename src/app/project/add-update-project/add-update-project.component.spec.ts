import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AddUpdateProjectComponent } from './add-update-project.component';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { ActivatedRoute , Router} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material';
import { ProjectService } from 'src/app/Shared/project.service';
import { ContactService } from 'src/app/Shared/contact.service';
import { of } from 'rxjs';
import { IProject, IContact } from '../../app.interface';
import { inject } from '@angular/core/testing';

describe('AddUpdateProjectComponent', () => {
  let component: AddUpdateProjectComponent;
  let fixture: ComponentFixture<AddUpdateProjectComponent>;
  let routes: Routes = [ ];
   beforeEach(async(() => {
      
    
    TestBed.configureTestingModule({
      imports: [
        // BrowserModule,
        // BrowserAnimationsModule,
        // MDBBootstrapModule.forRoot(),
        // FormsModule,
        // AppRoutingModule,
        HttpClientTestingModule,
        // ReactiveFormsModule,
        MatDialogModule,
        RouterModule.forRoot(routes),
        BsDatepickerModule.forRoot(),
      ],
      declarations: [ AddUpdateProjectComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        DatePipe,
        ProjectService,
        ContactService,
         
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be 0 and -1 ', () => {
    let contactList = [
                        {Id : 1, Name : 'Zhuo Jin', Mobile : '0413100244', Email: 'adas@adas.com', ImageNumber : 0},
                        {Id : 2, Name : 'Mary Res', Mobile : '0413102344', Email: 'adas@adas.com', ImageNumber : 0}
    ];
    
    let contact = {Id : 1, Name : 'Zhuo Jin', Mobile : '0413100244', Email: 'adas@adas.com', ImageNumber : 0};
    let other_contact = {Id : 3, Name : 'Zhuo Jin', Mobile : '0413100244', Email: 'adas@adas.com', ImageNumber : 0};
    expect(component.contactExsit(contact, contactList)).toBe(0); 
    expect(component.contactExsit(other_contact, contactList)).toBe(-1);
  });

  it('should return all contacts', inject([ContactService], (mockContactService: ContactService) => {
    
    // let project: IProject[] = [{Id:1,
    //                           ProjectName:"adasd",
    //                           ProjectDescription:"adads",
    //                           CreateTime:null,
    //                           CloseTime:null,
    //                           ImageNumber:0,
    //                           ProjectContactItems : null}]
    let contacts: IContact[] =  [
      {
        Id:1,
        Name : "first am",
        Email: "adads@adasd.com",
        Mobile: "0413100222",
        ImageNumber: 0
      },
      {
        Id:2,
        Name : "second am",
        Email: "adads@adasd.com",
        Mobile: "0413100222",
        ImageNumber: 0
      },
      {
        Id:12,
        Name : "third am",
        Email: "adads@adasd.com",
        Mobile: "0413100222",
        ImageNumber: 0
      },

    ];

    spyOn(mockContactService, 'getAllAvalialeContacts').and.returnValue(of(contacts));
    component.getAllContactDetail();
    
    expect(component.avaliableContactItems.length).toBe(3);
  }));


  it('should match selected contact', inject([ContactService], (mockContactService: ContactService) => {
    
    let project: IProject = {Id:1,
                              ProjectName:"adasd",
                              ProjectDescription:"adads",
                              CreateTime:null,
                              CloseTime:null,
                              ImageNumber:0,
                              ProjectContactItems :[ {
                                Id:3,
                                ProjectId:1,
                                ContactId:2,
                                Contact:{
                                  Id:1,
                                  Name : "first am",
                                  Email: "adads@adasd.com",
                                  Mobile: "0413100222",
                                  ImageNumber: 0
                                }
                          
                              }]
                          }


    let contacts: IContact[] =  [
      {
        Id:1,
        Name : "first am",
        Email: "adads@adasd.com",
        Mobile: "0413100222",
        ImageNumber: 0
      },
      {
        Id:2,
        Name : "second am",
        Email: "adads@adasd.com",
        Mobile: "0413100222",
        ImageNumber: 0
      },
      {
        Id:12,
        Name : "third am",
        Email: "adads@adasd.com",
        Mobile: "0413100222",
        ImageNumber: 0
      },

    ];

    spyOn(mockContactService, 'getAllAvalialeContacts').and.returnValue(of(contacts));
    component.project = project;
    component.getSelectedContactDetail();
    
    expect(component.avaliableContactItems.length).toBe(2);
    expect(component.selectedContactItems.length).toBe(1);
  }));

  it('should be move from select to avaibale ', () => {
    let avacontact: IContact[] = [];
    let selcontacts: IContact[] =  [
      {
        Id:1,
        Name : "first am",
        Email: "adads@adasd.com",
        Mobile: "0413100222",
        ImageNumber: 0
      },
      {
        Id:2,
        Name : "second am",
        Email: "adads@adasd.com",
        Mobile: "0413100222",
        ImageNumber: 0
      },
      {
        Id:12,
        Name : "third am",
        Email: "adads@adasd.com",
        Mobile: "0413100222",
        ImageNumber: 0
      }];

      let moveContact = {
        Id:12,
        Name : "third am",
        Email: "adads@adasd.com",
        Mobile: "0413100222",
        ImageNumber: 0
      }
      component.selectedContactItems = selcontacts;
      component.avaliableContactItems = avacontact;
      component.cancelContact(moveContact);
      expect(component.avaliableContactItems.length).toBe(1);

      
  });
  
});
