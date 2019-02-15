// Create a script with a function named multiplyNumbers that takes a mixed array as input. 
// The function will do the following.
// return a promise that is resolved or rejected
// filter the non-numbers and multiply the remaining number by 5

// const multiplyNumbers=(arr)=>{
//     numbers =arr.filter((a)=>{
//         if(!isNaN(a) && typeof a === 'number'){
//             return a
//         }
//     })
//    return numbers.map((n)=>{ return n * 5 })
    
// }

const multiplyNumbers=(arr)=>{
    numbers =arr.filter((a)=>{
        if(!isNaN(a) && typeof a === 'number'){
            return a
        }
    })
   return new Promise((resolve, reject)=>{
       if(val=numbers.map((n)=>{ return n * 5 })){
           resolve(val)
       }else{
           reject("an error occurred")
       }
    })
    
}

console.log(multiplyNumbers(["not",true,1,2,4,5]))
