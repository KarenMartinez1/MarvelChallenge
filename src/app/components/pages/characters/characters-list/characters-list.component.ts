import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { character } from '@app/shared/Interfaces/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { Observable, filter, observable } from 'rxjs';
import { take } from 'rxjs/operators';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import {ToastrService} from 'ngx-toastr'



type RequestInfo={next:string;};

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})


export class CharactersListComponent implements OnInit {
  characters : character[]=[];
  info: RequestInfo={next:''};
  
  constructor(private characterSvc : CharacterService, private route: ActivatedRoute, public modal :NgbModal, private rute: ActivatedRoute, private router: Router, private modalService: NgbModal, private toastr:ToastrService) { }
  
  
  ngOnInit(): void 
  {this.getCharacterByQuery(); 
   this.favourites= this.get()
  }
  
  data : any ;
  data1: any;
  comic:any;
  page: number=1;
  private query :string='';
  order:string='';
  closeResult = '';
  btnImgAdd='';
  btncolAdd: boolean=false;
  favourites: any=[];
  titlebutton ='';

 private getCharacterByQuery()
 {
  this.route.queryParams.subscribe(params => {
  this.query = params['q'];
  this.getDataFromService();
  }); 
 
}

  private getDataFromService(): void
  {
   this.characterSvc.searchCaracters(this.query, this.order)
   .pipe(take(1))
   .subscribe((res: any) =>{
    this.data= res.data.results;
    this.data1= Object.values(this.data);
    console.log(this.data1);
    // return this.data1;
  })
  }

 orderByNameAs()
{
  this.order='name';
  this.getDataFromService();
}

orderByNameDes()
{
  this.order='-name';
  this.getDataFromService();
}

orderByDateAs()
{
  this.order='modified';
  this.getDataFromService();
}

orderByDateDes()
{
 this.order= '-modified';
 this.getDataFromService();
}

modalComic(urlComic: string, content:TemplateRef<any>)
{
  console.log(urlComic)
  this.characterSvc.getComicDetailsId(urlComic) 
  .pipe(take(1))
  .subscribe((res: any) =>{
   this.comic= res.data.results;
   this.comic= Object.values(this.comic);
   // return this.data1;
   this.btncolAdd=false;
   this.btnImgAdd="./assets/btn-favourites-default.png";
   this.titlebutton="ADD TO FAVOURITES"
  for(let element of this.favourites)
  {
    if (element.id == this.comic[0].id)
    {
      this.btncolAdd=true;
      this.btnImgAdd="./assets/btn-favourites-primary.png";
      this.titlebutton="REMOVE OF FAVOURITES"
      break;
    }
  } 
   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true, size:'md', modalDialogClass:'dark-modal'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
 })
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

addFavorites()
{
  this.btncolAdd=!this.btncolAdd;
  if(this.btncolAdd)
  {this.btnImgAdd="./assets/btn-favourites-primary.png";
   this.titlebutton="REMOVE OF FAVOURITES";
   this.favourites.push(this.comic[0]);
   this.toastr.success('Comic Favourites', 'ADDED', {timeOut:2000})
  }
  else
  {this.btnImgAdd="./assets/btn-favourites-default.png";
  this.titlebutton="ADD TO FAVOURITES";
   var cont:number=0;
   var index:number=-1;
   for(let element of this.favourites)
   {
     if(element.id==this.comic[0].id)
     {
       index=cont;
       break;
     }
     cont=cont+1;
   }
   if(index>-1)
   {
     this.favourites.splice(index,1)
     this.toastr.info('Comic Favourites', 'DELETED', {timeOut:2000})
   }
  }
  this.save(this.favourites)
  this.get()
 
}

deleteFavourite(img:any)
{
  var cont:number=0;
  var index:number=-1;
  for(let element of this.favourites)
  {
    if(element.id==img.id)
    {
      index=cont;
      break;
    }
    cont=cont+1;
  }
  if(index>-1)
  {
    this.favourites.splice(index,1)
    this.toastr.info('Comic Favourites', 'DELETED', {timeOut:2000})
  }
  this.save(this.favourites);
}

save(fav :any)
{
  sessionStorage.setItem('favoritos', JSON.stringify (fav))
}

get()
{
  
  var pepe : any=[];
  pepe=sessionStorage.getItem('favoritos');
  if (pepe==null || pepe.length==0){return [];}
  let x = JSON.parse(pepe);
  return x;
}

}

