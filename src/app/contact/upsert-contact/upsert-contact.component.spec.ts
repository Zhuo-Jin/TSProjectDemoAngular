import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertContactComponent } from './upsert-contact.component';

describe('UpsertContactComponent', () => {
  let component: UpsertContactComponent;
  let fixture: ComponentFixture<UpsertContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpsertContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpsertContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
