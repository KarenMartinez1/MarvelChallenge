import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { CharactersListRoutingModule } from './characters-list-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CharactersListRoutingModule,
    NgxPaginationModule
  ]
})
export class CharactersListModule { }
