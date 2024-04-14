import { useEffect, useState } from "react";
import WithAction from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Box, Text, Button } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { API_ENDPOINT, getJamMain } from "../Context/Config";
import Loading from "../components/Loading";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import swal from "sweetalert";
import ModalTambahJamMain from "../components/ModalTambahJamMain";
import ModalEditJamMain from "../components/ModalEditJamMain";

const KelolaJamMain = () => {
  const [jamMain, setJamMain] = useState([]);
  const indexJamMain = jamMain.map((item, index) => ({
    urut: index + 1,
    sesi: item.sesi,
    jamMulai: item.jamMulai,
    jamSelesai: item.jamSelesai,
  }));

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getJamMain();
      setJamMain(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const deleteJamMain = async (id) => {
    const konfirmasi = await swal({
      title: "Konfirmasi Menghapus",
      text: "Anda Yakin Akan Menghapus Data Ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (konfirmasi) {
      try {
        const response = await axios.delete(`${API_ENDPOINT}/jam/${id}`);
        swal("Berhasil", "Data Berhasil Dihapus", "success");
        console.log(response.data);
        fetchData();
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  const columns = [
    {
      name: "Sesi",
      selector: (row) => row.sesi,
      sortable: true,
      width: "10%",
    },
    {
      name: "Jam Mulai",
      selector: (row) => row.jamMulai,
      sortable: true,
      width: "30%",
    },
    {
      name: "Jam Selesai",
      selector: (row) => row.jamSelesai,
      sortable: true,
      width: "30%",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Box display={"flex"} gap={"1"}>
          <ModalEditJamMain data={row} fetchData={fetchData} />
          <Button onClick={() => deleteJamMain(row.id)} bgColor={"red.400"}>
            <AiFillDelete />
          </Button>
        </Box>
      ), // Tombol aksi
      button: true, // Menandakan kolom ini berisi tombol
      width: "30%",
    },
  ];

  return (
    <Box>
      <WithAction />
      <Sidebar>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Text
              fontSize={"4xl"}
              fontWeight={"bold"}
              textAlign={"center"}
              mt={"12"}
            >
              Kelola Jam Main
            </Text>

            <Box m={"4"} p={"4"} bgColor={"white"} overflowX={"auto"}>
              <ModalTambahJamMain fetchData={fetchData} />
              <DataTable
                columns={columns}
                data={indexJamMain}
                pagination
                responsive
                fixedHeader
                defaultSortField="Sesi"
                defaultSortAsc={true}
              />
            </Box>
          </>
        )}
      </Sidebar>
    </Box>
  );
};

export default KelolaJamMain;
