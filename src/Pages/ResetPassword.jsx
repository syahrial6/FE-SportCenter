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
import { useState } from "react";
import { API_ENDPOINT } from "../Context/Config";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [konfirmasiPassword, setKonfirmasiPassword] = useState("");
  const { id } = useParams();

  const resetpassword = async (e) => {
    e.preventDefault();
    if (password !== konfirmasiPassword) {
      alert("Password tidak sama");
    } else {
      try {
        const response = await axios.post(
          `${API_ENDPOINT}/resetpassword/${id}`,
          {
            password: password,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <VStack spacing={4} borderWidth="1px" borderRadius="lg" p={6}>
        <Text fontSize="xl" fontWeight="bold">
          Buat Password Baru
        </Text>

        <form onSubmit={resetpassword}>
          <HStack display={"block"}>
            <FormControl>
              <FormLabel>Password Baru</FormLabel>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Konfirmasi Password Baru</FormLabel>
              <Input
                onChange={(e) => setKonfirmasiPassword(e.target.value)}
                type="password"
              />
            </FormControl>
          </HStack>

          <Button type="submit" bgColor={"brand.utama"} color={"white"}>
            Simpan
          </Button>
        </form>
      </VStack>
    </Box>
  );
};

export default ResetPassword;
