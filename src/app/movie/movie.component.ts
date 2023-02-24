import { Component, Input, OnInit } from '@angular/core';
import { MovieData } from 'src/domain/movie.data';
import { MovieService } from '../services/movie/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  @Input() movieId:string = "";
  @Input() selectMode:boolean = true;

  public movieName:string = "";
  public movieCover:string = "";
  public movieSelected:boolean = false;
  public buttonText:string = "Select";
  public movieURL:string = "";

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieSelected = false;
    if(this.selectMode)
      this.buttonText = "Select";
    else 
      this.buttonText = "Data";

    let movieData:MovieData|undefined = this.movieService.moviesDB.find(md => md.movieId == this.movieId);

    if(movieData != undefined){
      this.movieName = movieData.movieName;
      this.movieCover = "assets/covers/" + this.movieId +".jpg";
      this.movieURL = movieData.movieURL;
    }
  }

  clickInSelect(){
      if(this.selectMode){
        this.movieSelected = !this.movieSelected;
        if(this.movieSelected == true){
          if( this.movieService.selectedMovieIds.length < 3){
            this.movieService.addSelectedMovieId(this.movieId);
          }else{
            this.movieSelected = false;
          }
        }
        else
          this.movieService.removeSelectedMovieId(this.movieId);
      }
      else
        window.open(this.movieURL, "_blank");
  }

  missingImage(){
    this.movieCover = "assets/covers/no-img.jpg";
  }
}
