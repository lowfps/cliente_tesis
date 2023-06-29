import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyDialogComponent } from './academy-dialog.component';

describe('AcademyDialogComponent', () => {
  let component: AcademyDialogComponent;
  let fixture: ComponentFixture<AcademyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
