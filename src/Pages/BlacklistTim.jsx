import { useEffect, useState } from "react";
import WithAction from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Box, Text, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { API_ENDPOINT } from "../Context/Config";
import { FaCheck, FaInfo } from "react-icons/fa";
import swal from "sweetalert";
import ModalDetailTim from "../components/ModalDetailTim";


const BlacklistTim = () => {
  const [dataTim, setDataTim] = useState([]);

  useEffect(() => {
    getAllTim();
  }, []);

  const getAllTim = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/tim/blacklist`);
      setDataTim(response.data);
    } catch (error) {
      console.log(error.response.data);
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
      maxWidth: "50px",
    },
    {
      name: "Nama Tim",
      selector: (row) => row.namaTim,
      sortable: true,
    },
    {
      name: "Manager",
      selector: (row) => row.user.nama,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Box display={"flex"} gap={"2"}>
          <ModalDetailTim tim={row}/>
          <Button onClick={()=> whiteList(row.id)} bgColor={"green.400"}>
            <FaCheck/>
          </Button>

        </Box>
      ), // Tombol aksi
      button: true,
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
          fontFamily={"Rubik Variable"}
        >
          Kelola Tim Blacklist
        </Text>
        <Box m={"4"} p={"4"} bgColor={"white"} overflowX={"auto"}>
        <DataTable columns={columns} data={dataTim} pagination />
        </Box>
      </Sidebar>
    </>
  );
};

export default BlacklistTim;
