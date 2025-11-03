// import React, { useState } from 'react'

// const App = () => {
//   let [data, setData] = useState(0);
//   let res = 0;
//   for(let i=0; i<1000000; i++){  // Maximum 10 zeros should use
//     res += i;
//   }
//   return (
//     <div>
//       <h2>{res}</h2>
//       <h2>{data}</h2>
//       <button onClick={()=>setData(data+1)}>Click</button>
//     </div>
//   )
// }

// export default App

// import React, { useMemo, useState } from 'react'

// const App = () => {
//   let [data, setData] = useState(0);
//   let res = useMemo(()=>{
//     console.log("Heavy Calculation Running");
//     let total = 0;
//     for(let i=0; i<1000000000; i++){
//       total += i;
//     }
//     console.log("Heavy Calculation Done");
//     return total
//   },[])
//   return (
//     <div>
//       <h2>{res}</h2>
//       <h2>{data}</h2>
//       <button onClick={()=>setData(data+1)}>Click</button>
//     </div>
//   )
// }

// export default App

// import React, { useEffect, useState } from 'react'

// const App = () => {
//   let [data, setData] = useState(0);
//   let [input, setInput] = useState("");
//   useEffect(()=>{
//     setData(data+1);
//   })
//   return (
//     <div>
//       <h2>{data}</h2>
//       <input type="text" onChange={(e)=>setInput(e.target.value)}/>
//     </div>
//   )
// }

// export default App

// import React, { useEffect, useRef, useState } from 'react'

// const App = () => {
//   // let [data, setData] = useState();
//   let [input, setInput] = useState("");
//   let count = useRef(0);
//   console.log(count);
//   useEffect(()=>{
//     count.current++;
//   })
//   return (
//     <div>
//       <h2>{count.current}</h2>
//       <input type="text" onChange={(e)=>setInput(e.target.value)}/>
//     </div>
//   )
// }

// export default App

import React, { useState, memo } from 'react'

const App = () => {
  let [count, setCount] = useState(0);
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={()=>setCount(count+1)}>Click</button>
      <Home/>
    </div>
  )
}

export default App

const Home = memo(() => {
  console.log("Hiiii");
  return (
    <div>Home</div>
  )
})