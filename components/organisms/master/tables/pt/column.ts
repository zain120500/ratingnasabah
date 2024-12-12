import type { Header } from "vue3-easy-data-table";
const headers: Header[] = [
    { text: "NAMA PT", value: "name", sortable: true, fixed: true, width: 130 },
    { text: "CABANG", value: "detail", width: 100 },
];

export default headers;