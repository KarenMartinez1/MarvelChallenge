import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { CharacterService } from '@app/shared/services/character.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {
  constructor(private rute: ActivatedRoute, private characterSvc: CharacterService) { }
  data : any ;
  comics: any;
  id:number=0;
  ngOnInit(): void {
  this.rute.params.pipe(take(1)).subscribe((params)=>{
   this.id=params['id'];
  })

  this.info();
 this.comicsinfo();


  
  }

  public info():void
  {
    this.characterSvc.getDetails(this.id)
    .pipe(take(1))
    .subscribe((res: any) =>{
     this.data= res.data.results[0];
      console.log(this.data)
   })
  }

  public comicsinfo(){

    this.characterSvc.getComics(this.id)
    .pipe(take(1))
    .subscribe((res1: any) =>{
     this.comics= res1.data.results;
      console.log(this.comics)
    })
  }
}
