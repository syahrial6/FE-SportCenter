import {Table,Thead,Tr,Th,Tbody,Badge,Td,Center,Text} from "@chakra-ui/react"


// tabel ini digunakan pada tampilan modal list pemain dari setiap tim
const TabelInfo = (props) => {

  // komponen ini menerima props dari parent berupa array list pemain tim
  const {dataTim} = props;

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
  return (
    <Center>
    <Table w={{base:"90vw",lg:"500px"}} variant="simple">
    <Thead bgColor={"brand.utama"}>
      <Tr>
        <Th  color={"white"} textAlign={"center"} w="100px">
          No Punggung
        </Th>
        <Th  color={"white"} textAlign={"center"}>
          Nama
        </Th>
        <Th  color={"white"} textAlign={"center"} w="100px">
          Posisi
        </Th>
      </Tr>
    </Thead>
    {dataTim == [] ? (
          <Tr>
            <Td colSpan={"4"}>
              <Text
                textAlign={"center"}
                
                fontSize={"3xl"}
              >
                Belum Ada List Pemain
              </Text>
            </Td>
          </Tr>
        ) : 
          dataTim.map((player) => (
            <Tr key={player.id}>
              <Td width={"50px"} textAlign={"center"}>
                {player.noPunggung}
              </Td>
              <Td textAlign={"center"}>{player.namaPemain}</Td>
              <Td textAlign={"center"}>
                <Badge colorScheme={posisiWarnaMap[player.posisi]}>{player.posisi}</Badge>
              </Td>
            </Tr>
          ))
          }  
        
    <Tbody>
      <Tr>
        <Td width={"50px"} textAlign={"center"}></Td>
        <Td textAlign={"center"}></Td>
        <Td textAlign={"center"}>
          <Badge></Badge>
        </Td>
      </Tr>
    </Tbody>
  </Table>
  </Center>
  )
}

export default TabelInfo
