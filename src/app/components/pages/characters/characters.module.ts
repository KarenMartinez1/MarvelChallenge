import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CharacterDetailsComponent } from '@characters/character-details/character-details.component';
import { CharactersListComponent } from '@characters/characters-list/characters-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import{NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const myComponents=[CharacterDetailsComponent, CharactersListComponent];

@NgModule({
  declarations: [...myComponents],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule,
    NgbModule
  ],
  exports:[...myComponents],
})
export class CharactersModule { }
