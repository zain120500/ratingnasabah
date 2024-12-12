// convert int to rupiah
const rupiah = (number = 0) => {
    const intData = Math.round(number);
    return new Intl.NumberFormat("id-ID", {
        currency: "IDR",
    }).format(intData);
}

export default rupiah