import { Chromosome, GeneticManager } from "./genetic";
import { MovieData } from "./movie.data";


export class MovieSearcher{

    static searchMoviesLike(movies:Array<MovieData>):Array<Chromosome>{

        let modelChromosomes:Array<Chromosome> = new Array<Chromosome>();

        for(let i=0;i<movies.length;i++)
            modelChromosomes.push(movies[i].chromosome);
        
        for(let i=0;i<100;i++){
            let chromosomes:Array<Chromosome> = GeneticManager.mutateChromosomes(GeneticManager.multiplyChromosomes(GeneticManager.generateDescendants(modelChromosomes), 10))
            let nextModelChromosomes:Array<Chromosome> = new Array<Chromosome>();
            
            for(let j=0;j<modelChromosomes.length;j++)
                nextModelChromosomes.push( GeneticManager.getNewModel(chromosomes, modelChromosomes[j]) );

            modelChromosomes = nextModelChromosomes;
        }

        return modelChromosomes;
    }
}