import { Box, Text } from "@chakra-ui/react";
import WithAction from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { AiFillDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { API_ENDPOINT } from "../Context/Config";
import { Button } from "@chakra-ui/react";
import swal from "sweetalert";
import ModalEditWasit from "../components/ModalEditWasit";
import ModalTambahPgWasit from "../components/ModalTambahPgWasit";

const KelolaWasit = () => {
  const [dataWasit, setDataWasit] = useState([]);
  const [nama, setNama] = useState("");
  const [nohp, setNohp] = useState("");

  console.log(dataWasit);

  useEffect(() => {
    getWasit();
  }, []);

  const deleteWasit = async (id) => {
    const konfirmasi = await swal({
      title: "Konfirmasi Menghapus",
      text: "Anda Yakin Akan Menghapus Data Ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (konfirmasi) {
      try {
        const response = await axios.patch(`${API_ENDPOINT}/deletewasit/${id}`);
        swal("Berhasil", "Data Berhasil Dihapus", "success");
        console.log(response.data);
        getWasit();
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  const getWasit = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/wasit`);
      console.log(response.data);
      setDataWasit(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const createWasit = async (nama, nohp) => {
    try {
      const response = await axios.post(`${API_ENDPOINT}/wasit`, {
        namaWasit: nama,
        nohp: nohp,
      });
      console.log(response.data);
      swal("Berhasil", "Data Berhasil Ditambahkan", "success");
      getWasit();
    } catch (error) {
      console.log(error.response.data);
      swal("Gagal", `${error.response.data}`, "error");
    }
  };

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
      maxWidth: "10%",
    },
    {
      name: "Nama",
      selector: (row) => row.namaWasit,
      sortable: true,
      maxWidth: "25%",
    },
    {
      name: "No HP",
      selector: (row) => row.nohp,
      sortable: true,
      maxWidth: "25%",
    },
    {
      name: "Total Pertandingan",
      selector: (row) => row.reservasis.length,
      sortable: true,
      maxWidth: "20%",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Box display={"flex"} gap={"2"}>
          <ModalEditWasit getWasit={getWasit} wasit={row} />

          <Button
           
            bgColor={"red.400"}
            onClick={() => deleteWasit(row.id)}
          >
            <AiFillDelete />
          </Button>
        </Box>
      ), // Tombol aksi
      button: true, // Menandakan kolom ini berisi tombol
      maxWidth: "30%",
      
    },
  ];

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
          Kelola Wasit
        </Text>

        <Box m={"4"} p={"4"} bgColor={"white"} overflowX={"auto"}>
          <ModalTambahPgWasit fungsiTambah={createWasit} />
          <DataTable columns={columns} data={dataWasit} pagination />
        </Box>
      </Sidebar>
    </Box>
  );
};

export default KelolaWasit;
