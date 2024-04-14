import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useColorModeValue,
  Image,
  Stack,
  Link,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { FiAlignJustify, FiChevronLeft } from "react-icons/fi";
import logo from "../images/logo.png";
import { Link as RouterLink } from "react-router-dom";
import { MyContext } from "../Context/Context";
import { useContext } from "react";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import PropTypes from "prop-types";


const Links = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Sewa Lapangan",
    url: "/sewa",
  },
  { label: "Kontak Kami", url: "/kontak" },
  { label: "Tentang Kami", url: "/tentangkami" },
];
const NavLink = ({ children, url }) => {
  return (
    <RouterLink to={url}>
      <Box
        as="a"
        px={2}
        py={"5"}
        color={"white"}
       
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("#126799", "#126799"),
        }}
      >
        
        {children}
      </Box>
    </RouterLink>
  );
  
};

NavLink.propTypes = {
  children: PropTypes.any.isRequired,
  url:PropTypes.string.isRequired,
};
export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoggedIn, logout, data } = useContext(MyContext);

  return (
    <>
      <Box
        bgColor={"brand.utama"}
        pos={"sticky"}
        top={"0"}
        zIndex={"999"}
        px={4}
        w={"100%"}
        fontFamily={'Inter'}
        
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <FiChevronLeft /> : <FiAlignJustify />}
            aria-label={"Open Menu"}
            display={{ md: "none", base: "flex" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box w="40px" h="10">
              <RouterLink to={"/"}>
                <Image src={logo}></Image>
              </RouterLink>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
              color={"white"}
            >
              {Links.map((link, index) => (
                <NavLink key={index} url={link.url}>
                  {link.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            {isLoggedIn && data ? null : (
              <RouterLink to={"/daftar"}>
                <Link _hover={{ textDecoration: "none" }} color={"white"}>
                  Daftar
                </Link>
              </RouterLink>
            )}

            {isLoggedIn && data ? (
              <Menu>
                <MenuButton rounded={"none"} color={"white"} bgColor={"brand.utama"} _hover={{bgColor:"#0e6aa1"}}  py={"8"} as={Button} display={"flex"} ml={"4"} fontWeight={"normal"}>
                  <Icon fill={"white"} as={FaUser} mr={"2"} />
                
                  {data.nama}
                </MenuButton>
                <MenuList>
                  {data.role === "admin" ? (
                    <RouterLink to={`/dashboard`}>
                      <MenuItem>Dashboard</MenuItem>
                    </RouterLink>
                  ) : data.role === "wasit" || data.role === "fotographer" ? (
                    <RouterLink to={`/dashboard/reservasi`}>
                      <MenuItem>Dashboard</MenuItem>
                    </RouterLink>
                  ) : (
                    <RouterLink to={`/profile/${data.id}`}>
                      <MenuItem>Profile</MenuItem>
                    </RouterLink>
                  )}

                  <RouterLink to={"/login"} onClick={logout}>
                    <MenuItem>Logout</MenuItem>
                  </RouterLink>
                </MenuList>
              </Menu>
            ) : (
              <RouterLink to={"/login"}>
                <Button
                  variant={"solid"}
                  bgColor={"#ffb606"}
                  color={"white"}
                  _hover={{ bg: "#ffb606" }}
                  size={"sm"}
                  ml={"4"}
                  mr={4}
                >
                  Login
                </Button>
              </RouterLink>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.7 }}
          >
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {Links.map((link, index) => (
                  <NavLink key={index} url={link.url}>
                    {link.label}
                  </NavLink>
                ))}
              </Stack>
            </Box>
          </motion.div>
        ) : null}
      </Box>
    </>
  );
}
