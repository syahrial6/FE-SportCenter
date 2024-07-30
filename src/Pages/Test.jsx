import { useEffect, useState } from "react"
import axios from "axios"

const Test = () => {
  const [data,setData] = useState([])

  useEffect(()=>{
getData()
  },[])

  const getData = async()=>{
    try {
      const response = await axios.get("https://indonesia-public-static-api.vercel.app/api/heroes")
      console.log(response.data)
      setData(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }
  return (
    <div>
      {data.map((data1)=>(
        <h1 key={data1}>Nama : {data1.name}</h1>
      ))}
      
    </div>
  )
}

export default Test
