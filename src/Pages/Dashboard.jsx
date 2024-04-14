import { Grid, Box, Center } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import WithAction from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";
import { FaUsers, FaCheckCircle } from "react-icons/fa";
import StatCard from "../components/Stat";
import { TbSoccerField } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { getReservasi, getUser } from "../Context/Config";
import { PiTimer } from "react-icons/pi";
import SetTarif from "../components/SetTarif";
import PertandinganHariIni from "../components/PertandinganHariIni";

const Dashboard = () => {
  const { isLoggedIn, data, cek_jwt } = useContext(MyContext);
  const [dataUser, setDataUser] = useState([]);
  const [dataReservasi, setDataReservasi] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setDataReservasi(await getReservasi(data));
      setDataUser(await getUser());
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // useeffect untuk mengecek hak akses halaman

  useEffect(() => {
    cek_jwt();
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (data?.role !== "admin") {
      navigate(-1);
    }
  }, []);

  return (
    <Box width={"100%"}>
      <WithAction />
      <Sidebar barAktif={true}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Grid
              mx={"12"}
              mb={"12"}
              templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(4, 1fr)" }}
              gap={6}
            >
              <StatCard
                Label={"User"}
                Angka={"8"}
                Icon={<FaUsers size={"40"} fill="white" />}
                bgColor={"brand.utama"}
              />
              <StatCard
                Label={"Total Reservasi"}
                Angka={dataReservasi.length}
                Icon={<TbSoccerField stroke="white" size={"40"} />}
                bgColor={"brand.utama"}
              />
              <StatCard
                Label={"Reservasi Diterima"}
                Angka={
                  dataReservasi.filter((item) => item.isVerified === true)
                    .length
                }
                Icon={<FaCheckCircle fill="white" size={"40"} />}
                bgColor={"brand.utama"}
              />
              <StatCard
                Label={"Reservasi Belum Diterima"}
                Angka={
                  dataReservasi.filter((item) => item.isPending === true).length
                }
                Icon={<PiTimer fill="white" size={"40"} />}
                bgColor={"brand.utama"}
              />
            </Grid>
            <Grid
              templateColumns={"repeat(2,1fr)"}
              mx={"12"}
              mb={"2"}
              gap={"6"}
            >
              <SetTarif />
              <PertandinganHariIni />
            </Grid>
            <Center>
              <Box
                bgColor={"white"}
                p={"6"}
                width={"90%"}
                borderRadius={"3xl"}
                shadow={"4xl"}
              ></Box>
            </Center>
          </>
        )}
      </Sidebar>
    </Box>
  );
};

export default Dashboard;
