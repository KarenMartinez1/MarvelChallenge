import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { character } from '@shared/Interfaces/character.interface';
import { environment } from '@environment/environment';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  

  
  constructor(private http: HttpClient) { }


  searchCaracters(query='', order='')
  { 
    if (query=='')
  {
    if (order=='')
    {
      return this.http.get<character[]>(`${environment.baseUrlApi}characters?${environment.key}&limit=100&offset=0&ts=1`)
    }
    else
    {
     return this.http.get<character[]>(`${environment.baseUrlApi}characters?orderBy=${order}&${environment.key}&limit=100&offset=0&ts=1`)
    }
  }
    else
    {
      if (order=='')
    {
      return this.http.get<character[]>(`${environment.baseUrlApi}characters?nameStartsWith=${query}&${environment.key}&ts=1`)
    }
      else
      {
        return this.http.get<character[]>(`${environment.baseUrlApi}characters?nameStartsWith=${query}&orderBy=${order}&${environment.key}&ts=1`)
      } 
    }
  }

  getDetails(id:number)
  {
    
    return this.http.get<character>(`${environment.baseUrlApi}characters?id=${id}&${environment.key}&ts=1`)
  }
  
  getComics(id:number)
  {
    return this.http.get(`https://gateway.marvel.com:443/v1/public/characters/${id}/comics?apikey=64ed40857f8db04a19ecab05b50059e7&hash=eb7efcd2b4ca35dfb5069c2393cd7747&ts=1`)
    // return this.http.get(`${environment.baseUrlApi}characters/'${id}'/comics?${environment.key}`)
  }

  getComicDetailsId(urlComic:string)
  {
   return this.http.get(`${urlComic.replace("http","https")}?${environment.key}&ts=1`)
  }
}
