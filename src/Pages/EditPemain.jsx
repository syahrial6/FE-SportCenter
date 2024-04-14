import {
  Box,
  Button,
  Text,
  Center,
  Input,
  Select,
  FormLabel,
} from "@chakra-ui/react";

import axios from "axios";
import { useState } from "react";
import { API_ENDPOINT } from "../Context/Config";
import WithAction from "../components/Navbar";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "../Context/Context";

const EditPemain = () => {
  const {data} = useContext(MyContext);
  const [namaPemain, setNamaPemain] = useState();
  const [noPunggung, setNoPunggung] = useState();
  const [posisi, setPosisi] = useState();
  const {id} = useParams()
  const navigate = useNavigate()
  
  useEffect(()=>{
    getPemainbyId()
  },[])

  const getPemainbyId = async()=>{
    try {
      const response = await axios.get(`${API_ENDPOINT}/pemain/${id}`)
      setNamaPemain(response.data.namaPemain)
      setNoPunggung(response.data.noPunggung)
      setPosisi(response.data.posisi)
    } catch (error) {
      console.log(error)
    }
  }

  const editPemain = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(
        `${API_ENDPOINT}/pemain/${id}`,
        {
          namaPemain: namaPemain,
          noPunggung: noPunggung,
          posisi: posisi,
        }
      );
      console.log(response.data);
      navigate(`/profile/${data.id}`)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box fontFamily={"Rubik Variable"}>
      <Box position={"relative"} zIndex={"10"}>
        <WithAction />
      </Box>
      <Box pt={"12"} height={"300px"} bgColor={"#004c79"} position="relative">
        <Text
          pt={"12"}
          textAlign={"center"}
          fontFamily={"Rubik Variable"}
          fontWeight={"bold"}
          color={"white"}
          fontSize={"4xl"}
        >
          Edit Pemain
        </Text>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, 10%)"
          zIndex="5"
          bgColor={"white"}
          w={{ md: "100%", lg: "80%" }}
        >
          <Center pt={"8"}>
            <Box width={"100%"}>
             
                <Box shadow={"2xl"}>
                  <Box>
                    <form onSubmit={editPemain}>
                      <Center>
                        <Box w={"90%"}>
                          <FormLabel>Nama Pemain</FormLabel>
                          <Input
                            mb={"6"}
                            placeholder="Nama Pemain"
                            value={namaPemain}
                            onChange={(e) => setNamaPemain(e.target.value)}
                          />
                          <FormLabel>No Punggung</FormLabel>
                          <Input
                            mb={"6"}
                            placeholder="No Punggung"
                            value={noPunggung}
                            onChange={(e) => setNoPunggung(e.target.value)}
                          />
                          <FormLabel>Posisi</FormLabel>
                          <Select
                            placeholder="Posisi"
                            value={posisi}
                            onChange={(e) => setPosisi(e.target.value)}
                          >
                            <option value="GK">GK</option>
                            <option value="CB">CB</option>
                            <option value="LB">LB</option>
                            <option value="RB">RB</option>
                            <option value="DM">DM</option>
                            <option value="CM">CM</option>
                            <option value="LW">LW</option>
                            <option value="RW">RW</option>
                            <option value="AM">AM</option>
                            <option value="SS">SS</option>
                            <option value="ST">ST</option>
                          </Select>
                        </Box>
                      </Center>
                      <Center>
                        <Button
                          variant="solid"
                          bgColor={"#004c79"}
                          color={"white"}
                          _hover={{ bg: "#ffb606" }}
                          mt={"6"}
                          type="submit"
                        >
                          Update Pemain
                        </Button>
                      </Center>
                    </form>
                  </Box>
                </Box>
            </Box>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};

export default EditPemain;
