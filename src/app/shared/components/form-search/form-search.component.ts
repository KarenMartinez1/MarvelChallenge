import { query } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.css']
})
export class FormSearchComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
search(searchtxt:string)
{
  console.log(searchtxt)
  this.router.navigate(['character-list'], {queryParams:{q: searchtxt}});
}
}
