
const delayedTimer = new Promise((resolve, reject)=>{
        setTimeout(resolve, 500,(6 * 6)) 
})

const delayedTimer2 = new Promise((resolve, reject)=>{
    setTimeout(resolve, 500,(7*7)) 
})

var promises =Promise.all([delayedTimer,delayedTimer2])
promises.then((values)=>console.log(values))

