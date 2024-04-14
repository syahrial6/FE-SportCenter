import WithAction from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DataTable from "react-data-table-component";
import {
  Text,
  Box,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../Context/Config";

import { PiProhibitBold } from "react-icons/pi";
import swal from "sweetalert";
import ModalDetailTim from "../components/ModalDetailTim";
import { FaCheck } from "react-icons/fa";
const KelolaTim = () => {
  const [dataTim, setDataTim] = useState([]);
  const dataTimWhiteList = dataTim.filter((item) => item.isBlacklist === 0);
  const dataTimBlacklist = dataTim.filter((item) => item.isBlacklist  === 1);
  console.log(dataTimBlacklist);

  useEffect(() => {
    getAllTim();
  }, []);

  const getAllTim = async () => {
    try {
      const response = await axios(`${API_ENDPOINT}/tim`);
      setDataTim(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const blackList = async (id) => {
    const konfirmasi = await swal({
      title: "Konfirmasi Blacklist",
      text: "Anda Yakin Akan Memblacklist Tim Ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (konfirmasi) {
      try {
        await axios.patch(`${API_ENDPOINT}/tim/blacklist/${id}`);
        swal("Berhasil", "Tim Berhasil DiBlacklist", "success");
        getAllTim();
      } catch (error) {
        swal("Error", `${error.response.data}`, "error");
      }
    }
  };

  const whiteList = async (id) => {
    const konfirmasi = await swal({
      title: "Konfirmasi Pengaktifan",
      text: "Anda Yakin Akan Mengaktifkan Tim Ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (konfirmasi) {
      try {
        await axios.patch(`${API_ENDPOINT}/tim/whitelist/${id}`);
        swal("Berhasil", "Tim Berhasil Diaktifkan", "success");
        getAllTim();
      } catch (error) {
        swal("Error", `${error.response.data}`, "error");
      }
    }
  };
  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Nama Tim",
      selector: (row) => row.namaTim,
      maxWidth: "500px",
    },
    {
      name: "Manager",
      selector: (row) => row.user.nama,
      sortable: true,
      maxWidth: "400px",
    },
    {
      name: "Actions",
      cell: (row) => (
        
        <Box>
          {row.isBlacklist === 0 ? (<Box display={"flex"} gap={"2"}> <ModalDetailTim tim={row} />
          <Button bgColor={"red.400"} onClick={() => blackList(row.id)}>
            <PiProhibitBold />
          </Button></Box>):  <Box display={"flex"} gap={"2"}>
          <ModalDetailTim tim={row}/>
          <Button onClick={()=> whiteList(row.id)} bgColor={"green.400"}>
            <FaCheck/>
          </Button>

        </Box>}
         
        </Box>
      ), // Tombol aksi
      button: true,
      maxWidth: "200px",
    },
  ];

  return (
    <>
      <WithAction />
      <Sidebar>
        <Text
          fontSize={"4xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          mt={"12"}
        >
          Kelola Data Tim
        </Text>
        <Box m={"4"} p={"4"} bgColor={"white"} overflowX={"auto"}>
          <Tabs>
            <TabList>
              <Tab>Semua</Tab>
              <Tab>Blacklist</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <DataTable columns={columns} data={dataTimWhiteList} pagination />
              </TabPanel>
              <TabPanel>
              <DataTable columns={columns} data={dataTimBlacklist} pagination />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Sidebar>
    </>
  );
};

export default KelolaTim;
