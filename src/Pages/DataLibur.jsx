import WithAction from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import DataTable from "react-data-table-component";
import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getHariLibur } from "../Context/Config";
import Loading from "../components/Loading";

const DataLibur = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setData(await getHariLibur());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "No",
      selector: (row,index) => index + 1,
      sortable: true,
      maxWidth: "50px",
    },
    {
      name: "Event",
      selector: (row) => row.holiday_name,
      sortable: true,
    },
    {
      name: "Tanggal",
      selector: (row) => row.holiday_date,
      sortable: true,
    },
  ];
  return (
    <Box>
      <WithAction />
      <Sidebar>
        <Text
          fontSize={"4xl"}
          fontWeight={"bold"}
          textAlign={"center"}
          mt={"12"}
        >
          Data Libur
        </Text>
        {loading ? (
          <Loading />
        ) : (
          <Box m={"4"} p={"4"} bgColor={"white"} overflowX={"auto"}>
            <DataTable data={data} columns={columns} pagination />
          </Box>
        )}
      </Sidebar>
    </Box>
  );
};

export default DataLibur;
