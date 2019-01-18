//exercise one

const greetter = (myArray,counter)=>{
    let greetterText = 'Hello';

    for(var name of myArray){
        console.log(`${greetterText} ${name}`)
    }
}

greetter(['randy','cebo','malinga']);


//exercise 2
const toUpper =([firstLetter,...rest])=>{
    return firstLetter.toUpperCase()+rest.join('').toLowerCase()
}

console.log(toUpper('string'))


//exercise 3
const capitaliseArray =(array1)=>{
    const map1= array1.map(toUpper)
    return map1
}
console.log(capitaliseArray(['red','blue']))

//exercise 4
const valueLessThan20 =(array1) =>{
    return array1.filter((val)=>val<20)
}

console.log(valueLessThan20([20,1,5]))

//exercise 5
const arraySum =(array)=>{
    return array.reduce((val1,val2)=>val1+val2)
}
const arrayProduct =(array)=>{
    return array.reduce((val1,val2)=>val1+val2)
}


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

