const fs = require('fs');
const path = require('path');

fs.stat(path.resolve(process.cwd() + '/logs',(err)=>{
    if(!err){

    }else{
        console.log("an file doesnt exist")
    }
}))