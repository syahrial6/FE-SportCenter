import { Box, Text, Link, Image ,Center, Divider} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { API_ENDPOINT } from "../Context/Config";
import dayjs from "dayjs";


const PertandinganHariIni = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        getData();
    }
    ,[])

    const getData = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/reservasitoday`)
            console.log(response.data)
            setData(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error.response.data)
            setLoading(false)
        }
    }
  return (
    <Box bgColor={"white"} rounded={"xl"}>
        {loading ? (<Loading/>) : (<>
      <Text textAlign={"center"} fontWeight={"bold"} fontSize={"xl"}>
        Pertandingan Hari Ini
      </Text>
      <Box textAlign={"center"}>
        {data.length === 0 && <Text fontSize={"xl"} m={"auto"}>Tidak Ada Pertandingan Hari Ini</Text>}
        {data.map((item)=>(<Link key={item.id} m={"auto"}>
            <Center>
          <Box display={"flex"} gap={"6"}>
            <Image
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius="full"
              boxSize="50px"
              src={item.Tim1.url}
            />
            <Center fontSize={"md"}>
            {item.Tim1.namaTim} vs {item.Tim2.namaTim}
            </Center>
            <Image
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius="full"
              boxSize="50px"
              src={item.Tim2.url}
            />
          </Box>
          
          </Center>
          <Text>{`${dayjs(item.waktuMulai).format("HH:mm:ss")}-${dayjs(item.waktuSelesai).format("HH:mm:ss")}`}</Text>

          <Divider/>
        </Link>))}
        
      </Box>
      </>)}
    </Box>
  );
};

export default PertandinganHariIni;
