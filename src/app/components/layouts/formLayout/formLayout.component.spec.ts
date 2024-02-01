import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormLayoutComponent } from './formLayout.component';

describe('FormLayoutComponent', () => {
  let component: FormLayoutComponent;
  let fixture: ComponentFixture<FormLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
