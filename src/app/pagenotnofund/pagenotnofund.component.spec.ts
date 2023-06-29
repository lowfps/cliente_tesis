import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenotnofundComponent } from './pagenotnofund.component';

describe('PagenotnofundComponent', () => {
  let component: PagenotnofundComponent;
  let fixture: ComponentFixture<PagenotnofundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagenotnofundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagenotnofundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
