import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    ModalContent,
    ModalOverlay,
    Center,
    Button,
    Box,
    Text,
    Image,
    useDisclosure,
  } from "@chakra-ui/react";

import TabelInfo from "./TabelInfo";
import { FaInfo } from "react-icons/fa";

const ModalDetailTim = (props) => {
    const { tim } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box  fontFamily={"Rubik Variable"}>
      <>
        <Button
          overflow={"hidden"}
          whiteSpace={"nowrap"}
          onClick={() => onOpen()}
          display={"block"}
          bgColor={"blue.200"}
        >
            <FaInfo/>
        </Button>
        <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <Center>
              <ModalHeader fontSize={"4xl"}>Detail Tim</ModalHeader>
            </Center>
            <Center>
              <ModalBody>
                <Center>
              <Image src={tim.url} borderRadius="full" boxSize="150px" />
              </Center>
              <Text textAlign={"center"} fontSize={"3xl"} fontWeight={"bold"}>{tim.namaTim}</Text>
             <TabelInfo dataTim={tim.pemains}/>
                
               
              </ModalBody>
            </Center>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  )
}

export default ModalDetailTim
