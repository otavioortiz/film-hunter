import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieData } from 'src/domain/movie.data';
import { MovieSearcher } from 'src/domain/searcher';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  public moviesDB:Array<MovieData> = [];
  public selectableMovieIds:Array<string> = [];
  public sugestionMovieIds:Array<string> = [];

  public selectedMovieIds:Array<string> = [];

  constructor(private http: HttpClient) { 
    this.moviesDB = [];
    this.http.get('assets/moviesdb.csv', {responseType: 'text'})
    .subscribe(
        data => {
            let csvToRowArray = data.split("\n");
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split(",");

              let chromosome:Array<number> = [parseFloat(row[3]),
                                              parseFloat(row[4]),
                                              parseFloat(row[5]),
                                              parseFloat(row[6]),
                                              parseFloat(row[7]),
                                              parseFloat(row[8]),
                                              parseFloat(row[9]),
                                              parseFloat(row[10]),
                                              parseFloat(row[11]),
                                              parseFloat(row[12]),
                                              parseFloat(row[13]),
                                              parseFloat(row[14]),
                                              parseFloat(row[15]),
                                              parseFloat(row[16]),
                                              parseFloat(row[17]),
                                              parseFloat(row[18]),
                                              parseFloat(row[19]),
                                              parseFloat(row[20]),
                                              parseFloat(row[21]),
                                              parseFloat(row[22]),
                                              parseFloat(row[23]),
                                              parseFloat(row[24]),
                                              parseFloat(row[25])]

              this.moviesDB.push(new MovieData(row[0], row[2], row[1], chromosome));
            }

            this.createSelectableMovieIds();
        },
        error => {
            console.log(error);
        }
    );
  }

  private createSelectableMovieIds(){
    for(let i:number=0;i<300;i++)
      this.selectableMovieIds.push(this.moviesDB[i].movieId);
  }

  public searchSugestionMovieIds(){

    let movieDataList:Array<MovieData> = this.moviesDB.filter( (movie) => {
      for(let i=0;i<this.selectedMovieIds.length;i++)
        if( movie.movieId == this.selectedMovieIds[i] )
          return movie;

      return null;
    } );

    let generatedChromosomes = MovieSearcher.searchMoviesLike(movieDataList);

    let sugestionMovieIds:Array<string> = [];

    for(let i=0;i<generatedChromosomes.length;i++){

      let lowerContrast:[number, MovieData] = [99, new MovieData("", "", "", [])];

      for(let j=301;j<this.moviesDB.length;j++){

        let currentContrast:number = generatedChromosomes[i].getContrast(this.moviesDB[j].chromosome);
        if( currentContrast < lowerContrast[0] )
          lowerContrast = [currentContrast, this.moviesDB[j]];
      }

      sugestionMovieIds.push(lowerContrast[1].movieId);
    }

    this.sugestionMovieIds = sugestionMovieIds;

  }

  public addSelectedMovieId(movieId:string){
    this.selectedMovieIds.push(movieId);
  }

  public removeSelectedMovieId(movieId:string){
    let movieIndex = this.selectedMovieIds.indexOf(movieId);

    if(movieIndex != null)
      this.selectedMovieIds.splice(movieIndex, 1);
  }

  public resetSelectedIds(){
    this.selectedMovieIds = [];
  }
}
