
import Fade2 from "../animasi/Fade2";
import foto1 from "../images/1.jpg";
import foto2 from "../images/2.jpg";
import foto3 from "../images/3.jpg";
import {
    Image,
    Grid,
    GridItem,
    Box
  } from "@chakra-ui/react";

const Foto = () => {
  return (
    <Fade2>
    <Grid
      templateRows="repeat(2,fr 3fr)"
      templateColumns="repeat(1,3fr 1fr)"
      gap={4}
    >
     
      <GridItem bgImage={foto1} rowSpan="2" bgSize={"cover"} bgPosition={"center"} />
      <Box>
      <Image src={foto3}></Image>
      </Box>
      <Box>
      <Image src={foto2}></Image>
      </Box>
     
    </Grid>
    </Fade2>
  );
};
export default Foto;
