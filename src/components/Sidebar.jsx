import { Box, Grid, Flex, Link, Center, } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { GiWhistle } from "react-icons/gi";
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaCamera,
  FaUsers,
  FaCalendarWeek,
} from "react-icons/fa";
import { BiFootball } from "react-icons/bi";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { MdAccessTimeFilled } from "react-icons/md";
import { useContext } from "react";
import { MyContext } from "../Context/Context";
import Loading from "./Loading";
import PropTypes from "prop-types";
const Sidebar = ({ children }) => {
  const { data } = useContext(MyContext);
  const location = useLocation();

  const Sidebar = [
    {
      label: "Dashboard",
      url: "/dashboard",
      icon: <AiFillHome fill="white" size="25" />,
    },
    {
      label: "User",
      url: "/dashboard/user",
      icon: <FaUsers fill="white" size={"25"} />,
    },
    {
      label: "Reservasi",
      url: "/dashboard/reservasi",
      icon: <FaCalendarCheck fill="white" size={25} />,
    },
    {
      label: "Tim",
      url: "/dashboard/tim",
      icon: <BiFootball fill="white" size={"25"} />,
    },
    {
      label: "Wasit",
      url: "/dashboard/kelolawasit",
      icon: <GiWhistle fill="white" size={"25"} />,
    },
    {
      label: "Jadwal Pemakaian",
      url: "/dashboard/jadwal",
      icon: <FaCalendarAlt fill="white" size={25} />,
    },
    {
      label: "Jam Main",
      url: "/dashboard/kelolajammain",
      icon: <MdAccessTimeFilled fill="white" size={25} />,
    },
    {
      label: "Fotographer",
      url: "/dashboard/kelolafotographer",
      icon: <FaCamera fill="white" size={25} />,
    },
  ];

  if (!data) {
    return <Loading />;
  }
  return (
    <Box fontFamily={"Inter"} bgColor={"#f2f7ff"} >
      <Grid templateColumns={{ lg: "repeat(1,1fr 5fr)",base:"repeat(1,1fr)" }}>
        <Box
          position={{lg:"sticky",base:"static"}} // Sidebar akan tetap pada posisinya saat di-scroll
          top={0} // Tentukan posisi sticky pada atas layar
          height={"100vh"} // Sesuaikan tinggi dengan tinggi layar
          width={{ base: "100vw", lg: "20vw" }}
          bgColor={"white"}
          overflow={"auto"} // Konten di dalamnya akan di-scroll jika lebih panjang
        >
          <Flex
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box my={"6"}>
              {/* <Text fontFamily={"Inter"} fontWeight={"bold"} color={"brand.utama"} fontSize={"3xl"} textAlign={"center"}>UNTAN SPORT CENTER</Text> */}
              {/* <Image w={"100px"} src={logo}></Image> */}
            </Box>
          </Flex>

          {data.role === "admin" ? (
            <Grid textAlign={"center"} templateRows="repeat(1,1fr)">
              {Sidebar.map((link, index) => (
                <RouterLink key={index} to={link.url}>
                  <Grid
                    className="sidebar"
                    templateColumns={"repeat(1,1fr 3fr)" }
                    _hover={{ bgColor: "#f2f7ff " }}
                    py="3"
                    mb={"2"}
                    width={{ base: "100%", lg: "20vw" }} // Menyesuaikan lebar pada tampilan mobile dan desktop
                    bgColor={location.pathname === link.url ? "#f2f7ff" : ""}
                  >
                    <Center
                      width={"50%"}
                      m={"auto"}
                      py={"1"}
                      rounded={"md"}
                      bgColor={"brand.utama"}
                    >
                      {link.icon}
                    </Center>
                    <Link
                     
                      py={"1"}
                      fontSize="md"
                      color={
                        location.pathname === link.url
                          ? "brand.utama"
                          : "gray.700"
                      }
                      _hover={{ textDecoration: "none" }}
                      textAlign={"left"}
                    >
                      {link.label}
                    </Link>
                  </Grid>
                </RouterLink>
              ))}
            </Grid>
          ) : (
            <Grid gap={"6"} textAlign={"center"} templateRows="repeat(1,1fr)">
              <RouterLink to={"/dashboard/reservasi"}>
                <Grid
                  templateColumns="repeat(1,1fr 3fr)"
                  _hover={{ bgColor: "#f2f7ff " }}
                  py="3"
                  bgColor={
                    location.pathname === "/dashboard/reservasi"
                      ? "#f2f7ff"
                      : ""
                  }
                >
                  <Center
                    width={"50%"}
                    m={"auto"}
                    py={"1"}
                    rounded={"md"}
                    bgColor={"brand.utama"}
                  >
                    <FaCalendarCheck fill="white" size={"25"} />
                  </Center>
                  <Link
                    py={"1"}
                    textAlign={"left"}
                    fontSize={"md"}
                    color={"gray.700"}
                    _hover={{ textDecoration: "none" }}
                  >
                    Reservasi
                  </Link>
                </Grid>
              </RouterLink>
              {data.role !== "fotographer" ? (
                <RouterLink to={"/dashboard/kelolawasit"}>
                  <Grid
                    templateColumns="repeat(1,1fr 3fr)"
                    _hover={{ bgColor: "#f2f7ff " }}
                    py="3"
                    bgColor={
                      location.pathname === "/dashboard/kelolawasit"
                        ? "#f2f7ff"
                        : ""
                    }
                  >
                    <Center
                      width={"50%"}
                      m={"auto"}
                      py={"1"}
                      rounded={"md"}
                      bgColor={"brand.utama"}
                    >
                      <FaUsers fill="white" size={"25"} />
                    </Center>
                    <Link
                      py={"1"}
                      textAlign={"left"}
                      fontSize={"md"}
                      color={"gray.700"}
                      _hover={{ textDecoration: "none" }}
                    >
                      Kelola Wasit
                    </Link>
                  </Grid>
                </RouterLink>
              ) : (
                <RouterLink to={"/dashboard/kelolafotographer"}>
                  <Grid
                    templateColumns="repeat(1,1fr 3fr)"
                    _hover={{ bgColor: "#f2f7ff " }}
                    py="3"
                    bgColor={
                      location.pathname === "/dashboard/kelolafotographer"
                        ? "#f2f7ff"
                        : ""
                    }
                  >
                    <Center
                      width={"50%"}
                      m={"auto"}
                      py={"1"}
                      rounded={"md"}
                      bgColor={"brand.utama"}
                    >
                      <FaCamera fill="white" size={"25"} />
                    </Center>
                    <Link
                      py={"1"}
                      textAlign={"left"}
                      fontSize={"md"}
                      color={"gray.700"}
                      _hover={{ textDecoration: "none" }}
                    >
                      Kelola Fotographer
                    </Link>
                  </Grid>
                </RouterLink>
              )}
            </Grid>
          )}
        </Box>
        <Box
          width={{ base: "100vw", lg: "100%" }}
          overflowX="auto"
          overflowY="auto"
        >
          {children}
        </Box>
      </Grid>
    </Box>
  );
};
Sidebar.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Sidebar;
