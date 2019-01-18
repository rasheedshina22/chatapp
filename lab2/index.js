//exercise one

const greetter = (myArray,counter)=>{
    let greetterText = 'Hello';

    for(var index =0; index<myArray.length;index++){
        console.log(`${greetterText} ${myArray[index]}`)
    }
}

greetter(['randy','cebo','malinga']);


//exercise 2
const toUpper =(val)=>{
    [...values] = val;
    values.forEach(element => {
        console.log(element)
    });
}

toUpper(['phiti','malinga'])

//exercise 3


//exercise 4

//exercise 5

//exercise 6
class Car{
    constructor(model, year){
        this.model = model;
        this.year = year;
    }
}

class Sedan extends Car{
    constructor(model, year,balance){
        super(model, year);
        this.balance = balance;
    }
}

sedan = new Sedan('toyota',2018,10000);
console.log(sedan.model);

