import type { Header } from "vue3-easy-data-table";
const headers: Header[] = [
    { text: "TANGGAL", value: "date", width: 120, fixed: true },
    { text: "AKUN", value: "account.name" },
    { text: "TIPE", value: "income_type.name" },
    { text: "NOMINAL", value: "amount" },
    { text: "CATATAN", value: "note", width: 200 },
    { text: "DIBUAT", value: "created", width: 200 }
];

export default headers;