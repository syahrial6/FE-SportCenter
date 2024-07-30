import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  Button,

  Text,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { API_ENDPOINT } from "../Context/Config";
import axios from "axios";
import ModalDetailPertandinganAdmin from "./ModalDetailPertandinganAdmin";
import Loading from "../components/Loading";
import NotaSewa from "./NotaSewa";
import DataTable from "react-data-table-component";

import CardHistoryReservasi from "./CardHistoryReservasi";

// dipanggil di halaman profil untuk melihat history reservasi
const ModalReservasiUser = (props) => {
  const { idTim } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataReservasi, setDataReservasi] = useState([]);
  const dataReservasiSelesai = dataReservasi.filter((item) => item.pembayaran ? item.pembayaran.datetime_payment !== null : false);
  const dataReservasiBelumBayar = dataReservasi.filter((item) => item.pembayaran ? item.pembayaran.datetime_payment === null : false);
  const dataReservasiMenunggu = dataReservasi.filter((item) => item.isPending ==true);
  const dataReservasiDitolak = dataReservasi.filter((item) => item.isVerified ==false && item.isPending ==false);
  const [isLoading, setLoading] = useState(false);

  const status = "Menunggu Pembayaran";

  useEffect(() => {

    getReservasi();
  }, []);

  // getReservasibyIdTim
  const getReservasi = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_ENDPOINT}/reservasi/tim/${idTim}`
      );
      const array2 = response.data.map((item) => ({
        title: item.judul || "Match Day",
        Tim1: item.Tim1 || "",
        Tim2: item.Tim2 || "",
        createdAt: item.createdAt,
        fotographer: item.fotographer || "",
        id: item.id,
        score: item.score || "",
        urlFoto: item.urlFoto || "",
        idTim1: item.idTim1 || "",
        idTim2: item.idTim2 || "",
        isPending: item.isPending,
        isVerified: item.isVerified,
        updatedAt: item.updatedAt,
        trxId: item.trxId,
        user: item.user,
        pembayaran: item.pembayaran || null,
        virtualAccount: item.virtualAccount,
        waktuMulaitgl: dayjs(new Date(item.waktuMulai).toLocaleString()).format(
          "D MMMM YYYY"
        ),
        waktuSelesaitgl: dayjs(
          new Date(item.waktuSelesai).toLocaleString()
        ).format("D MMMM YYYY"),
        waktuMulaijam: dayjs(new Date(item.waktuMulai).toLocaleString()).format(
          "HH:mm:ss"
        ),
        waktuSelesaijam: dayjs(
          new Date(item.waktuSelesai).toLocaleString()
        ).format("HH:mm:ss"),
        wasit: item.wasit || "",
      }));

      setDataReservasi(array2);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
      maxWidth: "10px",
    },
    
    {
      name: "Reservasi",
      selector: (row) => (
      <CardHistoryReservasi reservasi={row} component={<ModalDetailPertandinganAdmin reservasi={row}/>}/>
      ),
     width: "100",
    },
   
    
   
  ];
  return (
    <>
      <Button
        color={"white"}
        bgColor={"brand.utama"}
        _hover={{ bgColor: "brand.second" }}
        onClick={() => onOpen()}
      >
        History Reservasi
      </Button>
      {isLoading ? (
        <Loading />
      ) : (
        <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Text
              textAlign={"center"}
              my={"4"}
              fontSize={"3xl"}
              fontWeight={"bold"}
            >
              History Reservasi
            </Text>
            <ModalBody>
              <Tabs>
                <TabList>
                  <Tab>Semua</Tab>
                  <Tab>Selesai</Tab>
                  <Tab>Menunggu</Tab>
                  <Tab>Ditolak</Tab>
                  <Tab>Belum Bayar</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                  <DataTable data={dataReservasi}  columns={columns} pagination />
                  </TabPanel>
                  <TabPanel>
                  <DataTable data={dataReservasiSelesai} columns={columns} pagination />
                  </TabPanel>
                  <TabPanel>
                  <DataTable data={dataReservasiMenunggu} columns={columns} pagination />
                  </TabPanel>
                  <TabPanel>
                  <DataTable data={dataReservasiDitolak} columns={columns} pagination />
                  </TabPanel>
                  <TabPanel>
                  <DataTable data={dataReservasiBelumBayar} columns={columns} pagination />
                  </TabPanel>
                </TabPanels>
              </Tabs>
             
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => onClose()}
                colorScheme="blue"
                mr={3}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ModalReservasiUser;
