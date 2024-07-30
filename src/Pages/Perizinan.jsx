import {
  Box,
  Text,
  Tab,
  Tabs,
  TabPanel,
  TabList,
  TabPanels,
  Select,
  Button,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import WithAction from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TabelPertandingan from "../components/TabelPertandingan";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../Context/Context";
import { getReservasi } from "../Context/Config";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Perizinan = () => {
  const { data, isLoggedIn } = useContext(MyContext);
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [dataReservasi, setDataReservasi] = useState([]);
  const dataReservasiComplete = dataReservasi.filter((item) =>
    item.pembayaran ? item.pembayaran.datetime_payment !== null : null
  );
  const dataReservasiCompleteFunMatch = dataReservasi.filter((item) =>
    item.Tim1 && item.pembayaran
      ? item.Tim1 && item.pembayaran.datetime_payment !== null
      : false
  );
  const dataReservasiPending = dataReservasi.filter(
    (item) => item.isPending === true
  );
  const dataReservasiTolak = dataReservasi.filter(
    (item) => item.isPending === false && item.isVerified === false
  );
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (data?.role === "user") {
      navigate(-1);
    }
  }, [data, isLoggedIn]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      setDataReservasi(await getReservasi(bulan, tahun));

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
            <Box display={"flex"} justifyContent={"flex-end"}>
              <Select
                placeholder="Bulan"
                w={"20%"}
                onChange={(e) => setBulan(e.target.value)}
              >
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </Select>{" "}
              <Select
                placeholder="Tahun"
                w={"10%"}
                onChange={(e) => setTahun(e.target.value)}
              >
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
                <option value="2030">2030</option>
              </Select>{" "}
              <Button
                onClick={() => fetchData()}
                bgColor={"brand.utama"}
                color={"white"}
              >
                Cari
              </Button>
            </Box>
            <Box textAlign={"center"}>
              <Tabs>
                {data?.role !== "admin" ? (
                  <Box>
                    <TabList>
                      <Tab>Selesai</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <TabelPertandingan
                          fetchData={fetchData}
                          dataReservasi={dataReservasiCompleteFunMatch}
                        />
                      </TabPanel>
                    </TabPanels>
                  </Box>
                ) : (
                  <Box>
                    <TabList>
                      <Tab>Semua</Tab>
                      <Tab>Selesai</Tab>
                      <Tab>
                        Menunggu{" "}
                        <Tag pt={"1"} display={dataReservasiPending.length ===0 ? "none":"block"} size="md" colorScheme="red" borderRadius="full">
                          <TagLabel>{dataReservasiPending.length}</TagLabel>
                        </Tag>
                      </Tab>
                      <Tab>Ditolak</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <TabelPertandingan
                          fetchData={fetchData}
                          dataReservasi={dataReservasi}
                        />
                      </TabPanel>
                      <TabPanel>
                        <TabelPertandingan
                          fetchData={fetchData}
                          dataReservasi={dataReservasiComplete}
                        />
                      </TabPanel>
                      <TabPanel>
                        <TabelPertandingan
                          dataReservasi={dataReservasiPending}
                          fetchData={fetchData}
                        />
                      </TabPanel>
                      <TabPanel>
                        <TabelPertandingan
                          dataReservasi={dataReservasiTolak}
                          fetchData={fetchData}
                        />
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
