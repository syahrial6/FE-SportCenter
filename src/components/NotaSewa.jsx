import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import InterRegular from "../../public/fonts/Inter-Regular.ttf";
import InterBold from "../../public/fonts/Inter-Bold.ttf";
import { FaPrint } from "react-icons/fa";

Font.register({
  family: "Inter",
  fonts: [
    {
      src: InterRegular,
      fontWeight: 400,
    },
    {
      src: InterBold,
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  content: {
    width: "100%",
  },
  child: {
    width: "100%",
    marginTop: "30px",
  },
  header: {
    marginTop: "25px",
    fontSize: "40px",
    fontFamily: "Inter",
    paddingBottom: "10px",
    paddingRight: "10px",
    fontWeight: "bold",
    color: "#1083c7",
  },
  header2: {
    fontSize: "30px",
    fontFamily: "Inter",
    paddingBottom: "15px",
    paddingRight: "10px",
    paddingLeft: "10px",
    margin: "auto",
    fontWeight: "bold",
    color: "#1083c7",
  },
  p: {
    paddingLeft: "10px",
    fontSize: "13px",
  },
  colorHeader: {
    backgroundColor: "#1083c7",
    width: "100%",
    height: "100px",
  },
  table: {
    display: "table",
    width: "85%",
    flexDirection: "row",
    backgroundColor: "#e8e9eb",
    padding: "20px",
    margin: "auto",
  },
  tableRow: {
    width: "50%",
  },
  tableCol: {
    width: "100%",
    borderStyle: "solid",

    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableHead: {
    marginTop: 20,

    fontSize: "12px",
  },
  tableData: {
    marginTop: 20,

    fontSize: "12px",
  },
  tableCell2: {
    marginTop: 20,
    fontSize: "16px",
  },
});

const MyDoc = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.colorHeader}></View>

      <View style={styles.content}>
        <View style={styles.child}>
          <Text style={styles.header}> UNTAN SPORT CENTER</Text>
          <Text style={styles.p}>
            {" "}
            Jl. Universitas Tanjungpura, Pontianak, Kalimantan Barat
          </Text>
          <Text style={styles.p}>+62 812-3456-789</Text>
          <Text style={styles.p}>info@untansportcenter.com</Text>
        </View>
        <View style={styles.child}>
          <Text style={styles.header2}>NOTA PEMBAYARAN</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableHead}>ID Reservasi</Text>
                <Text style={styles.tableHead}>Nama Penyewa</Text>
                <Text style={styles.tableHead}>Kegiatan</Text>
                <Text style={styles.tableHead}>Tanggal</Text>
                <Text style={styles.tableHead}>Waktu</Text>

                <Text style={styles.tableCell2}>Total</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableData}>{data.id}</Text>
                <Text style={styles.tableData}>Arfian</Text>
                <Text
                  style={styles.tableData}
                >{`${data.Tim1.namaTim} VS ${data.Tim2.namaTim}`}</Text>
                <Text style={styles.tableData}>{data.tanggal}</Text>
                <Text
                  style={styles.tableData}
                >{`${data.waktuMulai}-${data.waktuSelesai}`}</Text>

                <Text style={styles.tableData}>1750000</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.colorHeader}></View>
    </Page>
  </Document>
);

const NotaSewa = ({ data }) => (
  <div>
    <PDFDownloadLink document={<MyDoc data={data} />} fileName={`${data.id}.pdf`}>
      {({ loading }) => (
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Loading document..." : (<FaPrint/>)}
        </button>
      )}
    </PDFDownloadLink>
  </div>
);

export default NotaSewa;
