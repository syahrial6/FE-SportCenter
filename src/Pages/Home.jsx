import Jumbotron from "../components/Jumbotron";
import WithAction from "../components/Navbar";
import { Text, Box, Grid, Center } from "@chakra-ui/react";
import { FaMoneyBillWave } from "react-icons/fa";
import { Calendar } from "antd";
import { HiInformationCircle } from "react-icons/hi2";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

import { getReservasiComplete } from "../Context/Config";
import dayjs from "dayjs";
import Fade from "../animasi/Fade";
import { GiSoccerBall } from "react-icons/gi";
import Loading from "../components/Loading";
import ModalDetailPertandinganAdmin from "../components/ModalDetailPertandinganAdmin";
import ModalDetailEvent from "../components/ModalDetailEvent";

const Home = () => {
  const [dataReservasi, setDataReservasi] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(dataReservasi);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      setDataReservasi(await getReservasiComplete());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      // Tangani kesalahan di sini
    }
  };

  // sebagai parameter untuk properti di kalendar
  const dateCellRender = (value) => {
    const date = value.format("YYYY-MM-DD");
  if (dataReservasi == undefined) return null;
    const eventsForDate = dataReservasi.filter((reservasi) => {
      const waktuMulai = dayjs(reservasi.waktuMulaitgl).format("YYYY-MM-DD");
      const waktuSelesai = dayjs(reservasi.waktuSelesaitgl).format("YYYY-MM-DD");
  
      // Memeriksa apakah tanggal saat ini berada di antara tanggalMulai dan tanggalSelesai
      return date >= waktuMulai && date <= waktuSelesai;
    });
  
    // Modal untuk menampilkan detail di kalendar
    return (
      <Box>
        {eventsForDate.map((reservasi) => (
          reservasi.Tim1 && reservasi.Tim2 ? (
            <ModalDetailPertandinganAdmin
              reservasi={reservasi}
              key={reservasi.id}
            />
          ) : (
            <ModalDetailEvent
              reservasi={reservasi}
              key={reservasi.id}
            />
          )
        ))}
      </Box>
    );
  };
  
  
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <WithAction />
      <Fade>
        <Jumbotron />
      </Fade>
      <Center>
        <Box width={"75%"}>
          <Text
            mt={"12"}
            textAlign={"center"}
            fontFamily={"Rubik Variable"}
            fontWeight={"bold"}
            fontSize={"4xl"}
          >
            Layanan Kami
          </Text>
          <Text mb={"6"} textAlign={"center"}>
            Dengan dukungan infrastruktur dan sistem yang modern, semua proses
            dapat berjalan dengan lancar
          </Text>
          <Box textAlign={"center"} mt={{ base: "12", lg: "2" }} pb={"8"}>
            <Grid
              gap={{ base: "16", lg: "4" }}
              templateColumns={{
                base: "repeat(1,1fr)",
                lg: "repeat(1,1fr 1fr 1fr)",
              }}
            >
              <Box>
                <Center>
                  <HiInformationCircle fill="#004c79" size={"15%"} />
                </Center>
                <Text mt={"6"}>Fleksibilitas Informasi & Waktu</Text>
              </Box>
              <Box>
                <Center>
                  <GiSoccerBall size={"15%"} fill="#004c79" />
                </Center>
                <Text mt={"6"}>Lapangan Berkualitas</Text>
              </Box>
              <Box>
                <Center>
                  <FaMoneyBillWave fill="#004c79" size={"15%"} />
                </Center>
                <Text mt={"6"}>Harga Bersaing</Text>
              </Box>
            </Grid>
          </Box>
        </Box>
      </Center>
      <Box bgColor={"brand.utama"}>
        <Grid
          templateColumns={{ lg: "repeat(1, 1fr)", md: "repeat(1, 1fr)" }}
          gap={6}
        >
          <Box justifyContent={"center"} display="flex" alignItems="center">
            <Text
              textAlign={"center"}
              fontWeight={"bold"}
              fontFamily={"Rubik Variable"}
              fontSize={"4xl"}
              color={"white"}
              mt={"12"}
            >
              Jadwal Penggunaan
            </Text>
          </Box>
          <Box bgColor={"white"} mb={"16"} mx={"8"}>
            <Calendar
              style={{
                width: "100%",
                overflow: "hidden",
              }}
              cellRender={dateCellRender}
            />
          </Box>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
