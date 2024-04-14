import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  Center,
  Link,
  Box,
  useDisclosure,
  Table,
  Text,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const ModalDetailEvent = (props) => {
  const { reservasi, key } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box fontFamily={"Rubik Variable"} key={key}>
      <>
        <Link
         bgColor={"blue.300"}
         color={"white"}
         borderRadius={"xl"}
         m={"1"}
         overflow={"hidden"}
         whiteSpace={"nowrap"}
         _hover={{ textDecoration: "none" }}
          onClick={() => onOpen()}
          display={"block"}
        >
          {`${reservasi.title}`}
        </Link>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Center>
              <Text fontSize={"4xl"} mt={"4"} fontWeight={"bold"}>Detail Event</Text>
            </Center>
            <Center>
              <ModalBody>
               
                <TableContainer
                      fontFamily={"Rubik Variable"}
                      my={"12"}
                      bgColor={"gray.100"}
                    >
                      <Table>
                        <Tbody>
                        <Tr>
                            <Td>Kegiatan</Td>
                            <Td>
                              {reservasi.title || reservasi.judul}
                            </Td>
                          </Tr>
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
                         
                        </Tbody>
                      </Table>
                    </TableContainer>
              </ModalBody>
            </Center>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
};
ModalDetailEvent.propTypes = {
  reservasi: PropTypes.object.isRequired,
  key: PropTypes.string.isRequired,
};

export default ModalDetailEvent;
