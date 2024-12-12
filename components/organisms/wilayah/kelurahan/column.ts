import type { Header } from "vue3-easy-data-table";
const headers: Header[] = [
    { text: "KELURAHAN", value: "name", sortable: true, fixed: true, width: 120 },
    { text: "KECAMATAN", value: "district_id.name" },
    { text: "KABUPATEN", value: "district_id.city_id.name" },
    { text: "PROVINSI", value: "district_id.city_id.province_id.name" },
    // { text: "AKSI", value: "aksi" },
];
export default headers