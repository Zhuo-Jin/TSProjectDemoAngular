import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMessageBoxComponent } from './dialog-message-box.component';

describe('DialogMessageBoxComponent', () => {
  let component: DialogMessageBoxComponent;
  let fixture: ComponentFixture<DialogMessageBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMessageBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMessageBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
