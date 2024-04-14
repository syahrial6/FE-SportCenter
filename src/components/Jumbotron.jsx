import { Box, Text, Center } from "@chakra-ui/react";
import background from "../images/bg.jpg";
import "@fontsource-variable/rubik";
import Fade2 from "../animasi/Fade2";

const Jumbotron = () => {
  return (
    <Box bgImage={background} bgSize={"cover"} bgPosition={"center"}>
      <Center>
        <Box pt={"44"} pb={"52"} width={"80%"} color={"white"}>
          <Fade2>
            <Text
              fontSize={"6xl"}
              fontFamily={"Rubik Variable"}
              fontWeight={"bold"}
            >
              Selamat Datang
            </Text>
            <Text
              fontSize={"6xl"}
              fontFamily={"Rubik Variable"}
              fontWeight={"bold"}
            >
              Untan Sport Center
            </Text>
            <Text fontSize={"2xl"}>
              Website Informasi Dan Penyewaan Lapangan Sepakbola Untan Sport
              Center
            </Text>
          </Fade2>
        </Box>
      </Center>
    </Box>
  );
};

export default Jumbotron;
