import { Chromosome } from "./genetic";

export class MovieData{
    public movieId:string = "";
    public movieName:string = "";
    public movieURL:string = "";
    public chromosome:Chromosome;

    constructor(movieId:string, movieName:string, movieURL:string, chromosome:Array<number>){
        this.movieId = movieId;
        this.movieName = movieName;
        this.movieURL = movieURL;
        this.chromosome = new Chromosome(chromosome);
    }
}