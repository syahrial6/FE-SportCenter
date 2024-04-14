import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import {  useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import { FaUserAlt, FaLock, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Daftar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [nohp, setNohp] = useState(null);
  const [nama, setNama] = useState(null);
  const [password, setPassword] = useState(null);
  const [confPassword, setconfPassword] = useState(null);
  
  // fungsi untuk daftar akun
  const registrasi = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/registrasi", {
        nama: nama,
        email: email,
        nohp: nohp,
        password: password,
        confPassword: confPassword,
        role: "user",
      });
      swal({
        title: "Good job!",
        text: `${response.data.msg}`,
        icon: "success",
      });
      const userId = response.data.user.id;

      navigate(`/verifikasi/${userId}`);
    } catch (error) {
      swal({
        title: "Error!",
        text: `${error.response.data.msg}`,
        icon: "error",
      });
    }
  };

  return (
    <Box>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"} backgroundColor="gray.200">
          <Stack spacing={4} w={"full"} maxW={"md"}  p={"8"} m={"12"} >
            <Heading textAlign={"center"} fontSize={"3xl"}>Registrasi Akun</Heading>
           
            <form onSubmit={registrasi}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl id="nama">
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <FaUserAlt />
                  </InputLeftElement>
                  <Input
                    onChange={(e) => setNama(e.target.value)}
                    type="text"
                    placeholder="Nama"
                  />
                </InputGroup>
              </FormControl>
              <FormControl id="email" >
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <MdEmail />
                  </InputLeftElement>
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email address"
                  />
                </InputGroup>
              </FormControl>

              <FormControl id="nohp" >
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <FaPhoneAlt />
                  </InputLeftElement>
                  <Input
                    onChange={(e) => setNohp(e.target.value)}
                    type="number"
                    placeholder="No Hp"
                  />
                </InputGroup>
              </FormControl>

              <FormControl >
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <FaLock />
                  </InputLeftElement>
                  <Input
                    onChange={(e) => setPassword(e.target.value)}
                    type={"password"}
                    placeholder="Password"
                  />
                </InputGroup>
              </FormControl >
              <FormControl >
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <FaLock />
                  </InputLeftElement>
                  <Input
                    onChange={(e) => setconfPassword(e.target.value)}
                    type={"password"}
                    placeholder="Password"
                  />
                </InputGroup>
              </FormControl>
              <Stack spacing={6}>
                <Button
                  variant="solid"
                  bgColor={"brand.utama"}
                  color={"white"}
                  _hover={{ bg: "#ffb606" }}
                  type="submit"
                >
                  Registrasi
                </Button>
              </Stack>
              </Stack>
            </form>
          </Stack>
        </Flex>
        
      </Stack>
    </Box>
  );
}
