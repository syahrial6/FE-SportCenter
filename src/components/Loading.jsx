import { Flex, Spinner, Center } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Center>
      <Flex height={"50vh"} justifyContent={"center"} alignItems={"center"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="yellow.500"
          size="xl"
        />
      </Flex>
    </Center>
  );
};

export default Loading;
