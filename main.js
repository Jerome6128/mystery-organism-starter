// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (number, strand) => {
  return {
    specimenNum: number,
    dna: strand,
    mutate() {
      const selectedBaseIndex = Math.floor(Math.random() * 15);
      const bases = ['A', 'T', 'C', 'G'];
      const availableBases = bases.filter(element => element !== this.dna[selectedBaseIndex]);
      const selectedAvailableBase = availableBases[Math.floor(Math.random() * 3)];
      this.dna[selectedBaseIndex] = selectedAvailableBase;
    },
    compareDNA(pAequor) {
      let counter = 0;
      pAequor.dna.forEach((element, index) => {
        if (element === this.dna[index]){
          counter ++;
        };
      });
      const match = parseInt((counter / this.dna.length * 100).toFixed(2));
      console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${match}% DNA in common`);
      return match;
    },
    willLikelySurvive() {
      let counter = 0;
      this.dna.forEach(element => {
        if (element === 'C' || element === 'G') {counter ++};
      });
      return counter / this.dna.length *100 >=60;
    }
  };
};

// Test mutate()
// const strandTest = mockUpStrand();
// console.log(strandTest);
// const pAequorTest = pAequorFactory(1, strandTest);
// console.log(pAequorTest);
// pAequorTest.mutate();
// console.log(pAequorTest);

//Test compareDNA()
// const pAequor1 = pAequorFactory(1, mockUpStrand());
// console.log(pAequor1);
// console.log(pAequor1.willLikelySurvive());
// const pAequor2 = pAequorFactory(2, mockUpStrand());
// console.log(pAequor2);
// console.log(pAequor2.willLikelySurvive());
// pAequor1.compareDNA(pAequor2);

const instances = [];
for (let i = 0; i <30 ; i++) {
  let instance = pAequorFactory(i, mockUpStrand());
  while (!instance.willLikelySurvive()){
    instance = pAequorFactory(i, mockUpStrand());
  };
  instances.push(instance);
};
console.log(instances);

//Test survive 
// instances.forEach(element => console.log(element.willLikelySurvive()));

const results = [0];
let mostRelated = {position: [0, 0], match: 0};
for (let i = 0; i < instances.length; i++) {
  for (let j = i + 1; j < instances.length; j++) {
    results.push(instances[i].compareDNA(instances[j]));
    if (results[results.length - 1] > mostRelated.match) {
      mostRelated.match = results[results.length - 1];
      mostRelated.position = [i, j];
      console.log(mostRelated);
    };
  };
};

//Test best match
// console.log(results);
// console.log(mostRelated);
// console.log(instances[mostRelated.position[0]]);
// console.log(instances[mostRelated.position[1]]);
// instances[mostRelated.position[0]].compareDNA(instances[mostRelated.position[1]]);


//Test comb number
// let comb = 0;
// for (let i = 29; i > 0; i--) { comb = comb + i};
// console.log(comb);
// console.log(results.length);