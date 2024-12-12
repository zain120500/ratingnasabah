import type { Header } from "vue3-easy-data-table";
const headers: Header[] = [
    { text: "KECAMATAN", value: "name" },
    { text: "KABUPATEN", value: "city_id.name" },
    { text: "PROVINSI", value: "city_id.province_id.name" },
    // { text: "AKSI", value: "aksi" },
];

export default headers