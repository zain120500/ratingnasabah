import type { Header } from "vue3-easy-data-table";
const headers: Header[] = [
    { text: "NAMA PT", value: "company.name" },
    { text: "BULAN", value: "month" },
    { text: "TAHUN", value: "year" },
    { text: "STATUS", value: "status" },
    { text: "DETAIL", value: "detail", width: 100 },
];

export default headers;