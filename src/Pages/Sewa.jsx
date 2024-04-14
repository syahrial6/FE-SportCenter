import {
  Box,
  Text,
  Center,
  Grid,
  Link,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import Foto from "../components/Foto";
import WithAction from "../components/Navbar";
import Kartu from "../components/Card";
import { FiMap } from "react-icons/fi";
import { FaCamera, FaMotorcycle, FaToilet } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { useContext, useEffect, useState } from "react";
import FormSewaSepakbola from "../components/FormSewaSepakbola";
import FormNonSepakbola from "../components/FormNonSepakbola";
import { MyContext } from "../Context/Context";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../components/Loading";
import { FaGlassWater } from "react-icons/fa6";
import { getHariLibur, getReservasi } from "../Context/Config";
import dayjs from "dayjs";

const Sewa = () => {
  const [jenisEvent, setJenisevent] = useState("");
  const { isLoggedIn, data } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [dataReservasi, setDataReservasi] = useState([]);
  const navigate = useNavigate();
  const [dataHariLibur, setDataHariLibur] = useState([]);
  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async () => {
    try {
      setLoading(true);
      setDataReservasi(await getReservasi());
      setDataHariLibur(await getHariLibur());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };




  // pengecekan login
  useEffect(() => {
    if (!isLoggedIn) {
      swal("Anda Harus Login Terlebih Dahulu", "", "error");
      navigate("/login");
    }
  }, []);

 // mengecek ketersediaan lapangan ,menerima parameter tanggal dan jam main dari user , sedangkan dataReservasi di get dari API
  const cekKetersediaan = (tanggal, jamMulai,jamSelesai, dataReservasi) => {
    const waktuMulai = `${tanggal} ${jamMulai}`;
    const waktuSelesai = `${tanggal} ${jamSelesai}`;
    const array = [];

    for (const reservasi of dataReservasi) {
      const reservasiWaktu = `${dayjs(reservasi.waktuMulaitgl).format(
        "YYYY-MM-DD"
      )} ${reservasi.waktuMulaijam}`;
      const reservasiWaktuSelesai = `${dayjs(reservasi.waktuSelesaitgl).format(
        "YYYY-MM-DD"
      )} ${reservasi.waktuSelesaijam}`;
      if (waktuMulai <= reservasiWaktu && waktuSelesai >= reservasiWaktuSelesai) {
        array.push(reservasi);
      }
      if (waktuMulai >= reservasiWaktu && waktuSelesai <= reservasiWaktuSelesai) {
        array.push(reservasi);

      }
      console.log(array)
  }

    if (array.length > 0) {
      return array; // Mengembalikan array reservasi yang cocok dengan tanggal dan jamMulai yang diinputkan
    } else {
      return 0; // Tidak ada tanggal yang cocok dengan yang diinputkan
    }
  };

  const fungsiCekLibur = (tanggal, dataHariLibur) => {
    const tanggalWaktu = new Date(tanggal);

    // mengecek hari weekend atau tidak
    const hari = tanggalWaktu.getDay();
    if (hari === 0 || hari === 6) {
      // 0 untuk Minggu, 6 untuk Sabtu
      return 1;
    }

    // mengecek hari libur atau tidak
    for (const libur of dataHariLibur) {
      if (
        new Date(tanggal).toDateString() ===
          new Date(libur.holiday_date).toDateString() &&
        libur.is_national_holiday === true
      ) {
        return 1; // Mengembalikan reservasi jika tanggal cocok ditemukan
      }
    }
    return 0;
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <Box>
      <WithAction />
      <Center>
        <Box width={"80%"}>
          <Center pt={"12"} mb={"24"}>
            <Box>
              <Center>
                <Box boxSize={"100%"}>
                  <Foto />
                </Box>
              </Center>
              <Box pt={"6"}>
                <Grid
                  h="200px"
                  templateColumns={{
                    base: "repeat(1,1fr)",
                    lg: "repeat(1, 3fr 1fr)",
                  }}
                  gap={4}
                >
                  <Box>
                    <Text fontWeight={"bold"} fontSize={"2xl"}>
                      Lapangan Sepakbola Untan
                    </Text>
                    <Text>Pontianak, Kalimantan Barat</Text>
                    <Box bgColor={"blackAlpha.100"} borderRadius={"xl"} p={"2"}>
                      <Grid templateColumns="repeat(1,3fr 1fr)" gap={6}>
                        <Box>
                          <Text>Lokasi</Text>
                          <Text>
                            Bansir Laut, Kec. Pontianak Tenggara, Kota
                            Pontianak, Kalimantan Barat
                          </Text>
                        </Box>
                        <Box p={"2"}>
                          <FiMap size={"30"} color="#004c79" />
                          <Link
                            href="https://maps.app.goo.gl/kGwYwNFuAGjsT9RRA"
                            target="_blank"
                            color={"#004c79"}
                          >
                            Buka Map
                          </Link>
                        </Box>
                      </Grid>
                    </Box>
                    <Box p={"2"}>
                      <Text fontWeight={"bold"} fontSize={"2xl"}>
                        Fasilitas
                      </Text>
                    </Box>
                    <Box>
                      <Grid templateColumns="repeat(1,1fr 1fr 1fr)" gap={"4"}>
                        <Box>
                          <FaMotorcycle />
                          Parkir Motor
                        </Box>
                        <Box>
                          <GiClothes />
                          Ruang Ganti
                        </Box>
                        <Box>
                          <FaCamera />
                          Fotographer
                        </Box>
                        <Box>
                          <FaToilet />
                          Toilet
                        </Box>
                        <Box>
                          <FaGlassWater />
                          Minuman
                        </Box>
                      </Grid>
                    </Box>
                  </Box>
                  <Box>
                    <Kartu />
                  </Box>
                </Grid>
              </Box>
            </Box>
          </Center>
          <Box mt={{ base: "96", lg: "4" }}>
            <Text textAlign={"center"} fontWeight={"bold"} fontSize={"3xl"}>
              Form Pemesanan
            </Text>
          </Box>
          {loading? (<Loading/>):(
          <Box>
            <RadioGroup size="lg" onChange={setJenisevent} value={jenisEvent}>
              <Stack direction="row">
                <Radio value="1" isDisabled={!data.isVerified}>
                  Fun Match
                </Radio>
                <Radio value="2">Event Non Sepakbola</Radio>
              </Stack>
            </RadioGroup>

            {jenisEvent === "1" ? <FormSewaSepakbola dataReservasi={dataReservasi} dataHariLibur={dataHariLibur} cekKetersediaan={cekKetersediaan} fungsiCekLibur={fungsiCekLibur} /> : <FormNonSepakbola dataReservasi={dataReservasi} dataHariLibur={dataHariLibur} cekKetersediaan={cekKetersediaan} fungsiCekLibur={fungsiCekLibur} />}
          </Box>
          )}
        </Box>
      </Center>
    </Box>
  );
};

export default Sewa;
