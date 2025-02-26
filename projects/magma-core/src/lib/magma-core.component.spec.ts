import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagmaCoreComponent } from './magma-core.component';

describe('MagmaCoreComponent', () => {
  let component: MagmaCoreComponent;
  let fixture: ComponentFixture<MagmaCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MagmaCoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MagmaCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
