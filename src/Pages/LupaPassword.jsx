import {
  Box,
  VStack,
  FormLabel,
  FormControl,
  Button,
  Text,
  HStack,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { API_ENDPOINT } from "../Context/Config";
import { useState } from "react";


const LupaPassword = () => {
  const [email, setEmail] = useState("");

  const kirimEmail = async(e)=>{
    e.preventDefault()
    try {
      const response = await axios.post(`${API_ENDPOINT}/lupapassword`,{
        email:email
      })
      console.log(response.data);
      alert(response.data.message)
    } catch (error) {
      console.log(error.response.data);
    }
  }
   
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <VStack spacing={4} borderWidth="1px" borderRadius="lg" p={6}>
        <Text fontSize="xl" fontWeight="bold">
          Masukkan Email Anda
        </Text>

        <form onSubmit={kirimEmail}>
        <HStack display={"block"}>
         
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input onChange={(e)=> setEmail(e.target.value)} type="text" />
          </FormControl>
        
        </HStack>

        <Button type="submit" bgColor={"brand.utama"} color={"white"}>
         Kirim
        </Button>
        </form>

       
      </VStack>
    </Box>
  );
};

export default LupaPassword;
