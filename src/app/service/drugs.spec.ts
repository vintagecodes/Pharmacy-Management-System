import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Drugs } from "../models/drugs";
import { DrugsService } from "./drugs.service";


describe('DrugsService', () => {
    let service: DrugsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, HttpClientModule, RouterTestingModule]
        });
        service = TestBed.inject(DrugsService);
      });
});
