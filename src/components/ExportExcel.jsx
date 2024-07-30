
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {Button} from "@chakra-ui/react";

const ExportExcel = ({ data }) => {
  const data2 = data.map((item) => {
    return {
      Title: item.title,
      Tim1: item.Tim1.namaTim,
      Tim2: item.Tim2.namaTim,
      Biaya: item.biaya,
      Tanggal: item.waktuMulaitgl,
      JamMulai: item.waktuMulaijam,
      JamSelesai: item.waktuSelesaijam,
      VirtualAccount: item.virtualAccount,
    };
  });

  const exportToExcel = () => {
    // Buat worksheet dari data
    const ws = XLSX.utils.json_to_sheet(data2);

    // Tambahkan judul di baris pertama
    const title = "LAPORAN PENGGUNAAN STADION";
    XLSX.utils.sheet_add_aoa(ws, [[title]], { origin: 'A1' });

    // Tambahkan data mulai dari baris ketiga
    XLSX.utils.sheet_add_json(ws, data2, { origin: 'A2', skipHeader: false });

    // Tentukan rentang sel yang akan digabungkan
    const range = XLSX.utils.decode_range(ws['!ref']);
    const numCols = range.e.c + 1; // Jumlah kolom yang ada

    // Gabungkan sel untuk judul
    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: numCols - 1 } }]; // Menggabungkan sel dari A1 ke kolom terakhir di baris pertama

    // Atur gaya untuk sel yang dimerge (judul)
    if (!ws['A1']) ws['A1'] = {};
    ws['A1'].s = {
      font: {
        bold: true,
        sz: 14, // ukuran font
      },
      alignment: {
        horizontal: 'center',
        vertical: 'center',
      },
    };

    // Atur lebar kolom berdasarkan panjang teks terpanjang di setiap kolom
    const maxLengths = data2.reduce((acc, row) => {
      Object.keys(row).forEach((key, index) => {
        const length = row[key] ? row[key].toString().length : 0;
        acc[index] = Math.max(acc[index] || 0, length);
      });
      return acc;
    }, []);

    ws['!cols'] = maxLengths.map(length => ({ wch: length + 2 })); // +2 untuk sedikit padding

    // Buat workbook dan tambahkan worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');

    // Konversi workbook ke file excel
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Buat Blob dari file excel buffer
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Simpan file dengan nama yang diinginkan
    saveAs(dataBlob, 'data.xlsx');
  };

  return (
    <Button bgColor={"green.500"} color={"white"} onClick={exportToExcel}>
      Export to Excel
    </Button>
  );
};
export default ExportExcel;