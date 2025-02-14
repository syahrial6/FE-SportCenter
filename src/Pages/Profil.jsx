import WithAction from "../components/Navbar";
import {
  Box,
  Image,
  Grid,
  Text,
  Center,
  Button,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Tabel from "../components/Tabel";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MyContext } from "../Context/Context";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { API_ENDPOINT } from "../Context/Config";
import {
  getHistoryReservasi,
  getReservasiEventByIdUser,
  getTimByIdUser,
} from "../Context/Config";
import CardProfil from "../components/CardProfil";
import Loading from "../components/Loading";
import ModalReservasiUser from "../components/ModalReservasiUser";
import ModalEditTim from "../components/ModalEditTim";
import CardTransaksiAktif from "../components/CardTransaksiAktif";
import CardHistoryReservasiEvent from "../components/CardHistoryReservasiEvent";
import DataTable from "react-data-table-component";
import { AiFillDelete } from "react-icons/ai";


const Profil = () => {
  const { isLoggedIn, data, cek_jwt } = useContext(MyContext);
  const [dataTim, setDatatim] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [dataReservasiEvent, setDataReservasiEvent] = useState([]);

  // pengecekan login
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      setDataReservasiEvent(await getReservasiEventByIdUser(id));
      setDatatim(await getTimByIdUser(id));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // pengecekan waktu login apakah sudah exp
  useEffect(() => {
    cek_jwt();
    fetchData();
  }, [data]);

  const columns = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "10px",
    },
    {
      name: "Reservasi",
      selector: (row) => <CardHistoryReservasiEvent reservasi={row} />,
      sortable: true,
      width: "100",
    },
  ];

  const deleteTim = async (id) => {
    const konfirmasi = await swal({
      title: "Apakah Kamu Yakin?",
      text: "Akan Menghapus Tim",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (konfirmasi) {
      try {
        const response = await axios.patch(`${API_ENDPOINT}/deletetim/${id}`);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      swal("Data Berhasil Dihapus ", {
        icon: "success",
      });
      fetchData();
    } else {
     ""
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <Box>
      <Box position={"relative"} zIndex={"10"}>
        <WithAction />
      </Box>
      <Box pt={"12"} height={"300px"} bgColor={"#004c79"} position="relative">
        <Text
          pt={"12"}
          textAlign={"center"}
          fontWeight={"bold"}
          color={"white"}
          fontSize={"4xl"}
        >
          Profil Akun
        </Text>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform={{
            lg: "translate(-50%, 10%)",
            base: "translate(-50%, 10%)",
          }}
          zIndex="5"
          bgColor={"white"}
          width={{ base: "100%", lg: "80%" }}
        >
          <Center pt={"8"}>
            <Box width={"100%"}>
              <Grid
                h="200px"
                templateColumns={{
                  lg: "repeat(1, 1fr 3fr)",
                  sm: "repeat(1, 1fr)",
                }}
                gap={4}
              >
                <CardProfil
                  style="blackAlpha.200"
                  style1=""
                  dataUser={dataTim.user}
                />

                <Box shadow={"2xl"}>
                  <Box></Box>
                  <Center>
                    {dataTim.length == 14 ? (
                      <Box>
                        <Text
                          fontSize={"4xl"}
                          fontWeight={"bold"}
                          textAlign={"center"}
                        >
                          Belum Ada Squad
                        </Text>{" "}
                      </Box>
                    ) : (
                      <Box width={"100%"}>
                        <Box>
                          <CardTransaksiAktif dataTim={dataTim} idUser={id} />
                        </Box>

                        <Accordion allowToggle>
                          <AccordionItem>
                            <AccordionButton>
                              <Box
                                as="span"
                                flex="1"
                                textAlign="left"
                                fontWeight={"bold"}
                                fontSize={"xl"}
                                display={"flex"}
                              >
                                Info Squad
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel pb={4}>
                              {dataTim.map((data, index) => (
                                <Accordion key={index} allowToggle>
                                  <AccordionItem>
                                    <AccordionButton>
                                      <Box
                                        as="span"
                                        flex="1"
                                        textAlign="left"
                                        fontWeight={"bold"}
                                        fontSize={"xl"}
                                        display={"flex"}
                                      >
                                        {data.namaTim}
                                      </Box>
                                      <AccordionIcon />
                                    </AccordionButton>

                                    <AccordionPanel pb={4}>
                                      <Box>
                                        {data.isBlacklist == 1 ? (
                                          <Alert
                                            fontWeight={"normal"}
                                            status="warning"
                                          >
                                            <AlertIcon />
                                            Tim Ini Diblacklist
                                          </Alert>
                                        ) : (
                                          ""
                                        )}

                                        <Center>
                                          <Image
                                            borderRadius="full"
                                            boxSize="150px"
                                            src={data.url}
                                            alt="Avatar"
                                          />
                                        </Center>
                                        <Text
                                          textAlign={"center"}
                                          fontWeight={"bold"}
                                          fontSize={"4xl"}
                                        >
                                          {data.namaTim}
                                        </Text>
                                        <Center my={"4"} gap={"4"}>
                                          <ModalEditTim
                                            tim={data}
                                            fetchData={fetchData}
                                          />
                                          <ModalReservasiUser idTim={data.id} />
                                          <Button onClick={()=> deleteTim(data.id)} bgColor={"red.600"} color={"white"}><AiFillDelete fill="white"/></Button>
                                        </Center>
                                      </Box>
                                      {/* dataTim dikirim lewat props berisi detail tim,pemain,dll */}
                                      {/* fungsi getTim dikirim ke tabel agar ketika dihapus fungsi getTim dijalankan */}
                                      <Center>
                                        <Tabel
                                          dataTim={data}
                                          fetchData={fetchData}
                                        />
                                      </Center>
                                    </AccordionPanel>
                                  </AccordionItem>
                                </Accordion>
                              ))}
                              <Center>
                                <Button bgColor={"brand.utama"} color={"white"} my={"2"}>
                                  <RouterLink to={`/buattim/${id}`}>
                                    Tambah Tim
                                  </RouterLink>
                                </Button>
                              </Center>
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                        <Accordion allowToggle>
                          <AccordionItem>
                            <AccordionButton>
                              <Box
                                as="span"
                                flex="1"
                                textAlign="left"
                                fontWeight={"bold"}
                                fontSize={"xl"}
                                display={"flex"}
                              >
                                History Reservasi Event
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel pb={4}>
                              <DataTable
                                data={dataReservasiEvent}
                                columns={columns}
                                pagination
                              />
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                      </Box>
                    )}
                  </Center>
                </Box>
              </Grid>
            </Box>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};

export default Profil;
