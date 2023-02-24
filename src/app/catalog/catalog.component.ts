import { Component, OnInit } from '@angular/core';
import { MovieData } from 'src/domain/movie.data';
import { MovieService } from '../services/movie/movie.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  constructor(private movieService: MovieService) { }
  
  public catalogState:number = 0;

  ngOnInit(): void {
    
  }

  public selectMovies(){
    if(this.movieService.selectedMovieIds.length > 2){
      this.catalogState = 1;
      this.movieService.searchSugestionMovieIds();
      this.catalogState = 2;
    }
  }

  public getSelectableMovieIds():Array<string>{
    return this.movieService.selectableMovieIds;
  }

  public getSuggestedMovieIds():Array<string>{
    return this.movieService.sugestionMovieIds;
  }

  public newSearch():void{
    this.catalogState = 0;
    this.movieService.resetSelectedIds();
  }

}
