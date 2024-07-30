import {
  Modal,
  ModalBody,
  
  ModalFooter,
  ModalContent,
  ModalOverlay,
  Button,
  Image,
  Center,
  Grid,
  Link,
  Box,
  Text,
  useDisclosure,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { useState } from "react";
import dayjs from "dayjs";
import TabelInfo from "./TabelInfo";
import axios from "axios";
import PropTypes from "prop-types";
import { API_ENDPOINT } from "../Context/Config";
const ModalDetailPertandinganAdmin = (props) => {
  const { reservasi } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataTim1, setDataTim1] = useState([]);
  const [dataTim2, setDataTim2] = useState([]);
  const [Pemain1, setPemain1] = useState([]);
  const [Pemain2, setPemain2] = useState([]);
  
 

  const getTim1 = async (id) => {
    const response = await axios.get(`${API_ENDPOINT}/tims/${id}`);
    setDataTim1(response.data);
    setPemain1(response.data.pemains);
  };

  const getTim2 = async (id) => {
    const response = await axios.get(`${API_ENDPOINT}/tims/${id}`);
    setDataTim2(response.data);
    setPemain2(response.data.pemains);
  };

  return (
    <Box>
      <>
        <Link
         bgColor={"green.600"}
         color={"white"}
         borderRadius={"xl"}
         m={"1"}
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          onClick={() => [
            getTim1(reservasi.idTim1),
            getTim2(reservasi.idTim2),
            onOpen(),
          ]}
          display={"block"}
        >
          {`${reservasi.Tim1.namaTim} VS ${reservasi.Tim2.namaTim}`}
        </Link>
        <Modal size="auto" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
          <Center>
                  <Text
                  fontWeight={"bold"}
                  mt={"12"}
                   
                    fontSize={"4xl"}
                    display={"flex"}
                  >
                    {reservasi.title}
                  </Text>
                </Center>
            <Center>
              <ModalBody>
                <Grid
                  templateColumns={{
                    lg: "repeat(1, 1fr 0.5fr 1fr)",
                    base: "repeat(1,1fr)",
                  }}
                >
                  <Box>
                    <Center>
                      <Image
                        borderRadius="full"
                        boxSize="150px"
                        alt="Tim1"
                        src={dataTim1.url}
                      />
                    </Center>
                    <Text textAlign={"center"} fontSize={"3xl"}>
                      {dataTim1.namaTim}
                    </Text>
                    <Text textAlign={"center"} fontSize={"xl"}>
                      Manager : {dataTim1.user?.nama}
                    </Text>

                    <TabelInfo dataTim={Pemain1} />
                  </Box>
                  <Box textAlign={"center"}>
                  <Box display={"flex"} justifyContent={"space-between"} >
                        <Text fontSize={"6xl"} fontWeight={"bold"}>
                          {reservasi.score.split("-")[0]}
                        </Text>
                        <Text
                          textAlign={"center"}
                          fontSize={"4xl"}
                          m={"auto"}
                          fontWeight={"bold"}
                        >
                          VS
                        </Text>
                        <Text
                          textAlign={"center"}
                          fontSize={"6xl"}
                          fontWeight={"bold"}
                        >
                          {reservasi.score.split("-")[1]}
                        </Text>
                      </Box>
                    <TableContainer
                      pb={"6"}
                      my={"12"}
                      bgColor={"gray.100"}
                    >
                      <Table>
                        <Tbody>
                          <Tr>
                            <Td>Tanggal</Td>
                            <Td>
                              {dayjs(reservasi.waktuMulaitgl).format(
                                "D MMMM YYYY"
                              )}
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>Waktu</Td>
                            <Td>{`${reservasi.waktuMulaijam} - ${reservasi.waktuSelesaijam}`}</Td>
                          </Tr>
                          <Tr>
                            <Td>Wasit</Td>
                            <Td>
                              {reservasi.wasit
                                ? reservasi.wasit.namaWasit || ""
                                : ""}
                            </Td>
                          </Tr>
                          <Tr>
                            <Td>Fotographer</Td>
                            <Td>
                              {reservasi.fotographer
                                ? reservasi.fotographer.nama || ""
                                : ""}
                            </Td>
                          </Tr>
                         
                        </Tbody>
                        
                      </Table>
                  
                    </TableContainer>
                  </Box>

                  <Box textAlign={"center"}>
                    <Center>
                      <Image
                        borderRadius="full"
                        boxSize="150px"
                        alt="Tim2"
                        src={dataTim2.url}
                      />
                    </Center>
                    <Text fontSize={"3xl"}>{dataTim2.namaTim}</Text>
                    <Text textAlign={"center"} fontSize={"xl"}>
                      Manager : {dataTim2.user?.nama}
                    </Text>
                    <TabelInfo dataTim={Pemain2} />
                  </Box>
                </Grid>
              </ModalBody>
            </Center>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={() => onClose()}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
};

ModalDetailPertandinganAdmin.propTypes = {
  title: PropTypes.string.isRequired,
  idTim1: PropTypes.string.isRequired,
  idTim2: PropTypes.string.isRequired,
  reservasi: PropTypes.object.isRequired,
};

export default ModalDetailPertandinganAdmin;
