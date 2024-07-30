import { useState } from "react";
import WithAction from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Box, Text, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { API_ENDPOINT } from "../Context/Config";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { FaInfo } from "react-icons/fa";
import DataTable from "react-data-table-component";
import swal from "sweetalert";

const KelolaUser = () => {
  const [dataUser, setDataUser] = useState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  console.log(dataUser);

  useEffect(() => {
    setLoading(true);
    getUser();
    setLoading(false);
  }, [search]);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/users?search=${search}`
      );
      const array2 = response.data.users.filter(
        (item) => item.role !== "admin"
      );
      setDataUser(array2);
    } catch (error) {
      console.log(error.response);
    }
  };

  const hapusUser = async (id) => {
    const konfirmasi = await swal({
      title: "Konfirmasi Menghapus",
      text: "Anda Yakin Akan Menghapus Data User ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (konfirmasi) {
      try {
        await axios.patch(`${API_ENDPOINT}/deleteuser/${id}`);
        swal("Berhasil", "User Berhasil Dihapus", "success");
        getUser();
      } catch (error) {
        swal("Berhasil", `${error.response.data.msg}`, "success");
      }
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
      selector: (row) => row.nama,
      sortable: true,
      maxWidth: "15%",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      maxWidth: "25%",
    },
    {
      name: "No HP",
      selector: (row) => row.nohp,
      sortable: true,
      maxWidth: "15%",
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      maxWidth: "25%",
    },
    {
      name: "Actions",
      cell: (row) => (
        <Box display={"flex"} gap={"2"}>
          <RouterLink to={`/profile/${row.id}`}>
            <Button bgColor={"blue.500"}>
              <FaInfo fill="white" />
            </Button>
          </RouterLink>

          <Button onClick={() => hapusUser(row.id)} bgColor={"red.500"}>
            <AiFillDelete fill="white" />
          </Button>
        </Box>
      ), // Tombol aksi
      button: true, // Menandakan kolom ini berisi tombol
      maxWidth: "30%",
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
          Kelola Data User
        </Text>
        {loading ? (
          <Loading />
        ) : (
          <Box m={"4"} p={"4"} bgColor={"white"} overflowX={"auto"}>
            <Box display={"flex"} justifyContent={"flex-end"}>
              <Input
                type="text"
                placeholder="Search"
                w={"30%"}
                h={"15%"}
                onChange={(e) => setSearch(e.target.value)}
              />
              
            </Box>
            <DataTable
              columns={columns}
              data={dataUser}
              pagination
              responsive
            />
          </Box>
        )}
      </Sidebar>
    </>
  );
};

export default KelolaUser;
