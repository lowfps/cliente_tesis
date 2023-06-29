import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademyProgramComponent } from './academy-program.component';

describe('AcademyProgramComponent', () => {
  let component: AcademyProgramComponent;
  let fixture: ComponentFixture<AcademyProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademyProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademyProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
