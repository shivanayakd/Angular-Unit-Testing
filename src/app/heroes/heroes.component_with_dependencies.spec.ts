import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";
import { HeroService } from "../hero.service";
import { TestBed, ComponentFixture } from "@angular/core/testing";

describe('HeroesComponent', () => {
  let componentfixture: ComponentFixture<HeroesComponent>;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      {id:1, name: 'SpiderDude', strength: 8},
      {id:2, name: 'Wonderful Woman', strength: 24},
      {id:3, name: 'SuperDude', strength: 55}
    ]

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])

    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [
        {provide: HeroService, useValue: mockHeroService},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    componentfixture = TestBed.createComponent(HeroesComponent);
  })

  it('Should Get Heroes on init', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    componentfixture.componentInstance.getHeroes();

    expect(componentfixture.componentInstance.heroes.length).toBe(3);
  })

  it('Should add Hero when addHero is called', () => {
    componentfixture.componentInstance.heroes = HEROES;
    mockHeroService.addHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}));

    componentfixture.componentInstance.add('SuperDude');

    expect(componentfixture.componentInstance.heroes.length).toBe(4);
  })

  it('Should delete the correct hero when delete is called', () => {
    componentfixture.componentInstance.heroes = HEROES;
    mockHeroService.deleteHero.and.returnValue(of({}));
    spyOn(componentfixture.componentInstance, "delete");

    componentfixture.componentInstance.delete({id:1, name: 'SpiderDude', strength: 8});

    expect(componentfixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  })
})