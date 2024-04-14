import { Flex, Text, Link, IconButton, Grid, GridItem,Box } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="center"
      padding="4"
      bg="brand.third"
      color="white"
    >
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 2fr 1fr" }}
        gap={{ base: 4, md: 8 }}
        width="100%"
        maxW="1200px"
      >
        <GridItem colSpan={{ base: "auto", md: 1 }}>
          <Text fontSize="2xl" fontWeight="bold">
            UNTAN Sport Center
          </Text>
          <Text mt="2">Bansir Laut, Kec. Pontianak Tenggara, Kota Pontianak, Kalimantan Barat</Text>
          <Text mt="2">Develop By <Link href="https://www.instagram.com/syhrialm_/" target="_blank">Muhammad Syahrial</Link></Text>
        </GridItem>
        <GridItem colSpan={{ base: "auto", md: 1 }}>
         
        </GridItem>
        <GridItem colSpan={{ base: "auto", md: 1 }}>
          <Flex justify="flex-end">
            <Box>
            <IconButton
              as={Link}
              href="https://www.tiktok.com/@untansportcenter?lang=en"
              target="_blank"
              aria-label="Tiktok"
              icon={<FaTiktok />}
              colorScheme="white"
              variant="ghost"
              fontSize="24px"
              mr="2"
            />
           
            <IconButton
              as={Link}
              href="https://www.instagram.com/untan.sportcenter/"
              target="_blank"
              aria-label="Instagram"
              icon={<FaInstagram />}
              colorScheme="white"
              variant="ghost"
              fontSize="24px"
            />
            </Box>
          </Flex>
          
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Footer;
