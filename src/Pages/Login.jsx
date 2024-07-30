import { useContext, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  FormControl,
  FormHelperText,
  InputRightElement,
  Image,
  Text,
  Alert,AlertIcon

} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import logo from "../images/logo.png";
import { Link as RouterLink } from "react-router-dom";
import { MyContext } from "../Context/Context";
import WithAction from "../components/Navbar";






export default function Login() {
  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState(null);
  const { login } = useContext(MyContext);
  const [dataLogin,setLogin] = useState([])
  const [showPassword, setShowPassword] = useState(false);
  console.log(dataLogin)

  const handleShowClick = () => setShowPassword(!showPassword);
  
  const submit = async (e) => {
    e.preventDefault();
    const login2 = await login(email, password);
    setLogin(login2)
  };

  return (
    <Box>
    <WithAction/>
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
     
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Image src={logo} w={{ lg: "10%", base: "20%" }} />
        <Heading color="brand.utama">Selamat Datang</Heading>
        <Text color="brand.utama">Silahkan Login Untuk Melanjutkan</Text>
        <Box minW={{ base: "90%", md: "468px" }}>
        <form onSubmit={submit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
               {dataLogin.status === false ? (
            <Alert mb={"4"} status="error">
              <AlertIcon />
              {dataLogin.msg}
            </Alert>
            ):null}
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <FaUserAlt  />
                  </InputLeftElement>
                  <Input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email address" />
                </InputGroup>
              </FormControl>

              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300">
                    <FaLock />
                  </InputLeftElement>
                  <Input
                   onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link><RouterLink to={"/lupapassword"}>forgot password?</RouterLink></Link>
                </FormHelperText>
              </FormControl>

              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                bgColor="brand.utama"
                width="full"
                color={"white"}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Belum Punya Akun ?{" "}
        <Link color="teal.500" href="#">
          <RouterLink to={"/daftar"}>Daftar</RouterLink>
        </Link>
      </Box>
    </Flex>
    </Box>
  );
}
