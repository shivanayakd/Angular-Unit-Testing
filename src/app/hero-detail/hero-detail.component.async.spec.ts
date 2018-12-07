import { TestBed, ComponentFixture, fakeAsync, tick, flush } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Location } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroService, mockActivatedRoute, mockLocation;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => { return '3'; }}}
    }
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocation}
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}));
  });

    it('should call updateHero when save is called', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    flush();
    // tick(250);

    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }))
  
  it('Should update hero correctly', () => {
    fixture.detectChanges();
    let inpDE = fixture.debugElement;
    let inpEl = inpDE.query(By.css('input')).nativeElement;
    inpEl.value = 'SuperDude 3';

    inpEl.dispatchEvent(new Event('input'));
    
    expect(fixture.componentInstance.hero.name).toBe('SuperDude 3');
  })

})