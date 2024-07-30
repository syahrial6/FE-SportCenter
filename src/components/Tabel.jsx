import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Text,
  Badge,
  TableCaption
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { API_ENDPOINT,  } from "../Context/Config";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import TambahPemain from "./TambahPemain";
import ModalEditPemain from "./ModalEditPemain";
import swal from "sweetalert";


// tabel ini digunakan pada sisi user untuk edit dan hapus pemain
const Tabel = (props) => {
  const { dataTim,fetchData} = props;
  const posisiWarnaMap = {
    GK: "linkedin",
    LB: "green",
    CB: "green",
    RB: "green",
    DM: "yellow",
    CM: "yellow",
    LW: "red",
    AM: "yellow",
    RW: "red",
    SS: "red",
    ST: "red",
  };
  // Default ke warna abu-abu jika tidak ada warna yang cocok

  const deletePemain = async (id) => {
    const konfirmasi = await swal({
      title: "Apakah Kamu Yakin?",
      text: "Akan Menghapus Data Pemain",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      if (konfirmasi) {
        try {
          const response = await axios.delete(`${API_ENDPOINT}/pemain/${id}`);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
        swal("Data Berhasil Dihapus ", {
          icon: "success",
        });
        fetchData()
     
      } else {
        swal("Data Gagal Dihapus ", {
          icon: "error",
        });
      }
   
  };

  return (
    <Table maxWidth={{base:"40%",lg:"80%"}} variant="simple">
    
      <Thead bgColor={"brand.utama"}>
        <Tr>
          <Th color={"white"} textAlign={"center"}>
            No Punggung
          </Th>
          <Th color={"white"} textAlign={"center"}>
            Nama
          </Th>
          <Th color={"white"} textAlign={"center"}>
            Posisi
          </Th>
          <Th width={{base:"fit-content",lg:"100px"}} color={"white"} textAlign={"center"}>
            Aksi
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {dataTim.pemains == [] ? (
          <Tr>
            <Td colSpan={"4"}>
              <Text
                textAlign={"center"}
                fontFamily={"Rubik Variable"}
                fontSize={"3xl"}
              >
                Belum Ada List Pemain
              </Text>
            </Td>
          </Tr>
        ) : (
          dataTim.pemains.map((player) => (
            <Tr key={player.id}>
              <Td width={"50px"} textAlign={"center"}>
                {player.noPunggung}
              </Td>
              <Td textAlign={"center"}>{player.namaPemain}</Td>
              <Td textAlign={"center"}>
                <Badge colorScheme={posisiWarnaMap[player.posisi]}>
                  {player.posisi}
                </Badge>
              </Td>
              <Td gap={"2"} textAlign={"center"} display={{base:"block",lg:"flex"}}>
                {/* fungsi getTim dipakai untuk memperbarui data jika diedit  */}
                <ModalEditPemain
                  namaPemain={player.namaPemain}
                  noPunggung={player.noPunggung}
                  posisi={player.posisi}
                  id={player.id}
                  fetchData={fetchData}
                  icon={<FaEdit fill="white"/>}
                />
                
                <Button
                  bgColor={"red.600"}
                  onClick={() => deletePemain(player.id)}
                >
                  <AiFillDelete fill="white"/>
                </Button>   
              </Td>
            </Tr>
          ))
        )}
         <Tr>
          <Td fontWeight={"bold"} fontSize={"xl"} colSpan={"4"}>{
               `Total Pemain :   ${dataTim.pemains.length}`
            }
  
          </Td>
        </Tr>
        <Tr>
          <Td colSpan={"4"}>
            <TambahPemain dataTim={dataTim} fetchData={fetchData} />
          </Td>
        </Tr>
      </Tbody>
     
    </Table>
  );
};

Tabel.propTypes = {
  dataTim: PropTypes.object.isRequired,
  fetchData: PropTypes.func.isRequired,

};

export default Tabel;
