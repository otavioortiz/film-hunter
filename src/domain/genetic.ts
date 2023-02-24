export class Chromosome{

    genes:Array<number>;

    constructor(genes:Array<number>) {
        this.genes = genes.map((x) => x);
    }

    getContrast(otherChromosome:Chromosome):number{
        let contrastValue:number = 0;

        for (let i = 0; i < this.genes.length; i++) 
            contrastValue += Math.abs(this.genes[i] - otherChromosome.genes[i]);

        return contrastValue/this.genes.length;
    }

    public toString = () : string => {
        return "|" + this.genes.toString() + "|";
    }
}

export class GeneticManager{

    static generateDescendants(ancestors:Array<Chromosome>):Array<Chromosome>{

        let descendants:Array<Chromosome> = new Array<Chromosome>()

        for(let i=0;i<ancestors.length;i++){
            for(let j=0;j<ancestors.length;j++)
                if(i != j){
                    descendants.push( new Chromosome([...ancestors[i].genes.slice(0, 3), ...ancestors[j].genes.slice(3)]) );
                    descendants.push( new Chromosome([...ancestors[j].genes.slice(0, 3), ...ancestors[i].genes.slice(3)]) );
                }
        }
            
        return descendants;
    }

    static multiplyChromosomes(chromosomes:Array<Chromosome>, multiplier:number):Array<Chromosome>{
        let multipliedChromosomes:Array<Chromosome> = new Array<Chromosome>()

        for(let i=0;i<multiplier;i++)
            for(let j=0;j<chromosomes.length;j++)
                multipliedChromosomes.push(new Chromosome(chromosomes[j].genes.slice(0)))
            
        return multipliedChromosomes;
    }

    static mutateChromosomes(chromosomes:Array<Chromosome>):Array<Chromosome>{
        let mutatedChromosomes:Array<Chromosome> = new Array<Chromosome>()

        for(let i=0;i<chromosomes.length;i++){

            let currentGenes:Array<number> = new Array<number>();
            for(let j=0;j<chromosomes[i].genes.length;j++){
                if(Math.random() > 0.8)
                    currentGenes.push(Math.random());
                else
                    currentGenes.push(chromosomes[i].genes[j]);
            }

            mutatedChromosomes.push(new Chromosome(currentGenes));
        }
            
        return mutatedChromosomes;
    }

    static getChromosomesBySimilarity(chromosomes:Array<Chromosome>, likeChromosome:Chromosome):Array<Chromosome>{

        let sortedChromosomes:Array<Chromosome> = new Array<Chromosome>()

        for(let i=0;i<chromosomes.length;i++){
            for(let j=0;j<chromosomes.length-1;j++){

                let currentValue:Chromosome = chromosomes[j];
                let nextValue:Chromosome = chromosomes[j+1];

                if( currentValue.getContrast(likeChromosome) > nextValue.getContrast(likeChromosome) ){
                    chromosomes[j] = nextValue;
                    chromosomes[j+1] = currentValue;
                }
            }
        }

        sortedChromosomes = chromosomes.map((x) => x);
            
        return sortedChromosomes;
    }

    static getNewModel(chromosomes:Array<Chromosome>, baseChromosome:Chromosome):Chromosome{

        let acceptableChromosomes:Array<Chromosome> = new Array<Chromosome>()

        for(let i=0;i<chromosomes.length;i++)
            if(chromosomes[i].getContrast(baseChromosome) < 0.5)
                acceptableChromosomes.push(new Chromosome(chromosomes[i].genes.slice(0)))
        
        while(acceptableChromosomes.length < 3)
            acceptableChromosomes.push(new Chromosome(baseChromosome.genes.slice(0)))

        let selectedChromosomes:Array<Chromosome> = GeneticManager.getChromosomesBySimilarity(acceptableChromosomes, baseChromosome);

        let randomIndex = Math.floor(Math.random() * 3);
        return selectedChromosomes[randomIndex];
    }
}