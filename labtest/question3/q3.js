const delayedTimer =(num)=>{
    return new Promise((resolve, reject)=>{setTimeout(()=>{
        resolve(num * num)
    },500)}
    )
}

console.log(delayedTimer())


