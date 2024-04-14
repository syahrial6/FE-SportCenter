import { Box, Button, Text } from "@chakra-ui/react";
import WithAction from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { AiFillDelete } from "react-icons/ai";
import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../Context/Config";
import axios from "axios";
import swal from "sweetalert";
import ModalEditPg from "../components/ModalEditPg";
import ModalTambahPgWasit from "../components/ModalTambahPgWasit";

const KelolaFotographer = () => {
  const [dataPg, setPg] = useState([]);

  useEffect(() => {
    getPg();
  }, []);



  const createPg = async (nama,nohp) => { 
    try {
      const response = await axios.post(`${API_ENDPOINT}/pg`, {
        nama: nama,
        nohp: nohp,
      });
      console.log(response.data);
      swal("Berhasil", "Data Berhasil Ditambahkan", "success");
      getPg();
    } catch (error) {
      console.log(error.response.data);
      swal("Gagal", `${error.response.data}`, "error");
    }
  };

  const getPg = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/pg`);
      console.log(response.data);
      setPg(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deletePg = async (id) => {
    const konfirmasi = await swal({
      title: "Konfirmasi Menghapus",
      text: "Anda Yakin Akan Menghapus Data Ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (konfirmasi) {
      try {
        const response = await axios.patch(`${API_ENDPOINT}/deletepg/${id}`);
        console.log(response.data);
        swal("Berhasil", "Data Berhasil Dihapus", "success");
        getPg();
      } catch (error) {
        console.log(error.response.data);
        swal("Gagal", `${error.response.data}`, "error");
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
      name: "Nama",
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: "No HP",
      selector: (row) => row.nohp,
      sortable: true,
    },
    {
      name: "Total Pertandingan",
      selector: (row) => row.reservasis.length,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Box display={"flex"} gap={"1"}>
            <ModalEditPg pg={row} getPg={getPg} />
          <Button bgColor={"red.400"} onClick={() => deletePg(row.id)}>
            <AiFillDelete />
          </Button>
        </Box>
      ), // Tombol aksi
      button: true, // Menandakan kolom ini berisi tombol
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
          Kelola Fotographer
        </Text>

        <Box m={"4"} p={"4"} bgColor={"white"} overflowX={"auto"}>
          <ModalTambahPgWasit fungsiTambah={createPg}/>
          <DataTable columns={columns} data={dataPg} pagination />
        </Box>
      </Sidebar>
    </Box>
  );
};

export default KelolaFotographer;
