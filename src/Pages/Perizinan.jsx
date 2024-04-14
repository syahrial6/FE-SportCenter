import {
  Box,
  Text,
  Tab,
  Tabs,
  TabPanel,
  TabList,
  TabPanels,
} from "@chakra-ui/react";
import WithAction from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TabelPertandingan from "../components/TabelPertandingan";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";
import { getReservasi} from "../Context/Config";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Perizinan = () => {
  const { data,isLoggedIn } = useContext(MyContext);
  const [dataReservasi, setDataReservasi] = useState([]);
  const dataReservasiComplete = dataReservasi.filter((item) => item.pembayaran? item.pembayaran.datetime_payment !== null : null)
  const dataReservasiPending = dataReservasi.filter((item) => item.isPending === true)
 const dataReservasiTolak = dataReservasi.filter((item) => item.isPending === false && item.isVerified === false)
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (data?.role !== "admin") {
      navigate(-1);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      setDataReservasi(await getReservasi());  

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <WithAction />
      <Sidebar>
        <Text
          fontSize={"4xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          mt={"12"}
        >
          Kelola Reservasi
        </Text>
        {isLoading ? (
          <Loading />
        ) : (
          <Box m={"4"} p={"4"} bgColor={"white"} overflowX={"auto"}>
            <Box textAlign={"center"}>
              <Tabs>
                {data?.role !== "admin" ? (
                  <Box>
                    <TabList>
                      <Tab>Selesai</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <TabelPertandingan fetchData={fetchData} dataReservasi={dataReservasiComplete} />
                      </TabPanel>
                    </TabPanels>
                  </Box>
                ) : (
                  <Box>
                    <TabList>
                      <Tab>Semua</Tab>
                      <Tab>Selesai</Tab>
                      <Tab>Menunggu</Tab>
                      <Tab>Ditolak</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <TabelPertandingan fetchData={fetchData} dataReservasi={dataReservasi} />
                      </TabPanel>
                      <TabPanel>
                        <TabelPertandingan fetchData={fetchData} dataReservasi={dataReservasiComplete} />
                      </TabPanel>
                      <TabPanel>
                        <TabelPertandingan dataReservasi={dataReservasiPending} fetchData={fetchData} />
                      </TabPanel>
                      <TabPanel>
                        <TabelPertandingan dataReservasi={dataReservasiTolak} fetchData={fetchData} />
                      </TabPanel>
                    </TabPanels>
                  </Box>
                )}
              </Tabs>
            </Box>
          </Box>
        )}
      </Sidebar>
    </Box>
  );
};

export default Perizinan;
