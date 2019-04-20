import React,{useState} from  'react';

const Example =()=>{
    const [count,setCount] = useState(0);

    return(<div>
        {count}
        <button onClick={()=>setCount(count+ 1)}>Click me</button>
    </div>)
};

export {Example}