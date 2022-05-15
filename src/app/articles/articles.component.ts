import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  user: string | undefined

  constructor(
    public route: ActivatedRoute,
  ) {
    console.log('hi')
   }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.user = params?.['userId']
    })
  }

}
