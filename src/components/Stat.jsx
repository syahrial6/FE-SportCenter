import {Stat,Grid,Box,StatLabel,StatNumber,StatHelpText,Center,StatArrow} from "@chakra-ui/react"

const StatCard = (props) => {
    const {bgColor,Label,Angka,Icon} = props
  return (
    <Stat
    bgColor={"white"}
    mt={"12"}
    borderRadius={"2xl"}
    shadow={"xl"}
   
  >
    <Grid templateColumns='repeat(1, 3fr 1fr)'>
    <Box ml={"6"} py={"3"}>
      <StatLabel>{Label}</StatLabel>
      <StatNumber>{Angka}</StatNumber>
      <StatHelpText>
      </StatHelpText>
    </Box>
    <Box borderRadius={"2xl"} bg={bgColor} mr={"2"} py={"2"} my={"auto"}>
      <Center>
      {Icon}
      </Center>
    </Box>
    </Grid>
  </Stat>
  )
}

export default StatCard;
