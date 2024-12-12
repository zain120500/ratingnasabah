// export default {

//     hourMinuteSecond(date: any){
//         // Given timestamp
//         const timestamp = new Date(date);

//         // Get hour, minute, and second
//         const hour = timestamp.getHours().toString().padStart(2, '0');
//         const minute = timestamp.getMinutes().toString().padStart(2, '0');
//         const second = timestamp.getSeconds().toString().padStart(2, '0');

//         return `${hour}:${minute}:${second}`

//     },

//     changeDateFormat(date: any){

//         if(this.isNullOrEmpty(date) || date == "null") { return "-" }

//         if(date) {

//             const month_names = [
//                 "Januari", "Februari", "Maret",
//                 "April", "Mei", "Juni",
//                 "Juli", "Agustus", "September",
//                 "Oktober", "November", "Desember"
//             ];

//             let year = date.slice(0, 4);
//             let month = date.slice(5, 7);
//             let day = date.slice(8, 10);
//             let dayInt = parseInt(day, 10);
//             let monthInt = parseInt(month, 10);

//             return `${dayInt} ${month_names[monthInt-1]} ${year}`;

//         }

//         return '-';

//     },





//     changeToValue(num: any){

//         if(num){
//             let removeDotNum = num.replace(/\./g, "");
//             return removeDotNum;
//         }
//         return ""
//     },

//     makeQuery(page:any, size:any){
//         let string = "?page="+page+"&size="+size
//         return string
//     },

//     getAllCabang(){
//         let getCabang = localStorage.getItem("cabang")
//         let allCabang = JSON.parse(getCabang)
//         return allCabang
//     },

//     getCabangId(){
//         return localStorage.getItem("activeCabangId")
//     },

//     setFlash(msg: any){
//         localStorage.setItem('flash', msg)
//     },

//     getFlash(){
//         let flash = localStorage.getItem('flash')
//         localStorage.removeItem('flash')
//         return flash
//     },

//     returnYears(){
//         let currentYear = new Date().getFullYear()
//         let arrYear = []
//         let x = 2000
//         while(x <= currentYear+2){
//             arrYear.push(x)
//             x++
//         }
//         return arrYear
//     },

//     createEmptyFile() {
//         var f = new File([""], "blank.pgifile")
//         return f
//     },

//     toastSucc(vue: any, msg: any, toastTitle='Sukses'){
//         vue.$bvToast.toast(msg, {
//           title: toastTitle,
//           autoHideDelay: 5000,
//           appendToast: true,
//           variant: 'success'
//         })
//     },

//     toastErr(vue: any, msg: any, toastTitle='Gagal'){
//         vue.$bvToast.toast(msg, {
//             title: toastTitle,
//             autoHideDelay: 5000,
//             appendToast: true,
//             variant: 'danger'
//         })
//     },

//     parseError(vue: any, error:any, toastTitle = "Gagal") {

//         console.log(error)

//         let message = ""

//         if(error.response && error.response.data.reason != null) {
//             message = error.response.data.reason
//         }
//         else if(error.message.startsWith("timeout")) {
//             message = "Gagal menghubungi server, periksa jaringan anda dan coba kembali! [ERR-TIMEOUT]"
//         }
//         else {
//             message = error.message
//         }

//         this.toastErr(vue, message, toastTitle)

//     },

//     toastAlert(vue: any, msg: any, toastTitle='Alert'){
//         vue.$bvToast.toast(msg, {
//           title: toastTitle,
//           autoHideDelay: 5000,
//           appendToast: true,
//           variant: 'primary'
//         })
//     },

//     isNotNullAndNotEmpty(input: any) {
//         return input != null && input != '' && input.length != 0
//     },

//

//     printPayload(payload: any) {

//         for(var pair of payload.entries()) {
//             console.log(pair[0] + ': ' + pair[1]);
//         }

//     },

//     resizeImage(base64Str: any, maxWidth = 1920, maxHeight = 1080){
//         return new Promise((resolve) => {
//             let img = new Image()
//             img.src = base64Str
//             img.onload = () => {
//                 let canvas = document.createElement('canvas')
//                 const MAX_WIDTH = maxWidth
//                 const MAX_HEIGHT = maxHeight
//                 let width = img.width
//                 let height = img.height

//                 if (width > height) {
//                     if (width > MAX_WIDTH) {
//                     height *= MAX_WIDTH / width
//                     width = MAX_WIDTH
//                     }
//                 } else {
//                     if (height > MAX_HEIGHT) {
//                     width *= MAX_HEIGHT / height
//                     height = MAX_HEIGHT
//                     }
//                 }
//                 canvas.width = width
//                 canvas.height = height
//                 let ctx = canvas.getContext('2d')
//                 ctx.drawImage(img, 0, 0, width, height)
//                 let newBase64Str = canvas.toDataURL('image/jpeg', 0.9)
//                 if(newBase64Str.length < base64Str.length) {
//                     resolve(newBase64Str)
//                 } else {
//                     resolve(base64Str)
//                 }
//             }
//         })
//     },

//     getBasePagedQuery(page: any, size:any) {
//         let string = "?page="+page+"&size="+size
//         return string
//     },

//     formatTimestamp(date = new Date()){
//         let currentTime = new Date(date);
//         let day = currentTime.getDate();
//         let month = currentTime.getMonth() + 1;
//         let year = currentTime.getFullYear();

//         // Tambahkan angka 0 di depan hari dan bulan jika perlu
//         if (day < 10) {
//         day = '0' + day;
//         }
//         if (month < 10) {
//         month = '0' + month;
//         }

//         return `${year}-${month}-${day}`+ ' ' + this.waktu24()
//     },

const formatThreeDigitNumber = (number: any) => {
  // Konversi ke string untuk mengukur panjang angka
  let numberString = String(number);

  // Tambahkan dua angka 0 di depan jika panjang kurang dari 3 digit
  while (numberString.length < 3) {
    numberString = '0' + numberString;
  }

  return numberString;
}

const handleNumericInput = (string: string) => {
  return string.replace(/\D/g, "");
};

const resizeImage = (base64Str: any, maxWidth = 1920, maxHeight = 1080) => {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      const MAX_WIDTH = maxWidth;
      const MAX_HEIGHT = maxHeight;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      let newBase64Str = canvas.toDataURL("image/jpeg", 0.9);
      if (newBase64Str.length < base64Str.length) {
        resolve(newBase64Str);
      } else {
        resolve(base64Str);
      }
    };
  });
};

const timeStampImage = (base64Str: any, maxWidth = 1920, maxHeight = 1080) => {
  return new Promise((resolve) => {
    let formattedDate = formatTanggalDMY();
    let waktu = waktu24();

    let lat = localStorage.getItem("lat")
    let long = localStorage.getItem("long")

    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      canvas.setAttribute("width", img.width.toString());
      canvas.setAttribute("height", img.height.toString());
      ctx?.drawImage(img, 0, 0);
      ctx!.font = "14pt Arial";
      ctx!.fillStyle = "#ffffff";
      ctx?.fillText(formattedDate + " " + waktu, 10, img.height - 40);
      ctx?.strokeText(formattedDate + " " + waktu, 10, img.height - 40);
      ctx?.fillText(lat + " " + long, 10, img.height - 10);
      ctx?.strokeText(lat + " " + long, 10, img.height - 10);
      let newBase64Str = canvas.toDataURL("image/jpeg", 0.9);

      resolve(newBase64Str)
    };
  });
};

const toBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
const validasiUmurNasabah = (umur: any) => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yearNow = today.getFullYear();
  var split = umur.split("-");
  let tahun = split[0];
  let bulan = split[1];
  let hari = split[2];
  var calculate = yearNow - 18;
  if (calculate > tahun) {
    return true;
  } else if (calculate == tahun) {
    if (bulan < mm) {
      return true;
    } else if (bulan == mm) {
      if (hari <= dd) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
const isNullOrEmpty = (input: any) => {
  return input == null || input == "" || input == 0;
};
const changeDateFormat = (date: any) => {
  if (isNullOrEmpty(date)) {
    return "-";
  }
  if (date) {
    const month_names = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let dayInt = parseInt(day, 10);
    let monthInt = parseInt(month, 10);
    return `${dayInt} ${month_names[monthInt - 1]} ${year}`;
  }
  return "-";
};
const addThousandSeparator = (number: any) => {
  if (number == 0) {
    return "0";
  }
  if (number) {
    return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  }
  return "-";
};
const inputCurrency = (number: any) => {
  let cleanedNumber = number.replace(/\D/g, "");
  cleanedNumber = cleanedNumber.replace(/^0+/, '');

  return cleanedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
const formatTanggalDMY = (date = new Date()) => {
  let currentTime = new Date(date);
  let day = currentTime.getDate();
  let month = currentTime.getMonth() + 1;
  let year = currentTime.getFullYear();

  // Tambahkan angka 0 di depan hari dan bulan jika perlu
  if (day < 10) {
    day = 0 + day;
  }
  if (month < 10) {
    month = 0 + month;
  }

  return `${day}-${month}-${year}`;
};

const waktu24 = (date = new Date()) => {
  const currentDate = new Date(date);
  const currentHours = String(currentDate.getHours()).padStart(2, "0");
  const currentMinutes = String(currentDate.getMinutes()).padStart(2, "0");
  const currentSeconds = String(currentDate.getSeconds()).padStart(2, "0");

  return `${currentHours}:${currentMinutes}:${currentSeconds}`;
};

const removeThousandSeparator = (num: any) => {
  if (num) {
    let removeDotNum: any = ("" + num).replace(/\./g, "");
    if (isNaN(removeDotNum)) {
      return ""
    } else {
      return Number(removeDotNum);
    }
  } else if (num == 0) return 0

  return "";
}

const validasiStnk = (tanggal: any) => {
  let today: any = new Date();
  let dd: any = today.getDate();
  let mm: any = today.getMonth() + 1;
  let yearNow: any = today.getFullYear()

  let bulanx: any
  let minus: any
  let tahunx: any

  var dateString: any
  var dateParts: any
  var dateObject: any

  if (mm < 6) {
    minus = mm - 6
    bulanx = 12 + minus
    tahunx = yearNow - 1
    dateString = dd.toString() + '/' + bulanx.toString() + '/' + tahunx.toString()
    dateParts = dateString.split("/")
    dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
  } else {
    bulanx = mm - 6,
      dateString = dd.toString() + '/' + bulanx.toString() + '/' + yearNow.toString()
    dateParts = dateString.split("/")
    dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0])
  }

  let date: any = new Date(tanggal.toString())

  if (date != "Invalid Date") {
    if (date >= dateObject) {
      return true
    } else {
      return false
    }
  }
}

const changeDateFormatGetHour = (date: any) => {
  if (date) {
    let clock = date.slice(11, 16)
    return `${clock}`;
  }
  return '-';
}

const makeQuery = (page:number, size:number) =>{
  let string = "?page="+page+"&size="+size
  return string
}

const adjustPage = (page = 0) => {
  return page - 1 
}


export {
  handleNumericInput,
  resizeImage,
  toBase64,
  validasiUmurNasabah,
  isNullOrEmpty,
  changeDateFormat,
  addThousandSeparator,
  formatTanggalDMY,
  waktu24,
  timeStampImage,
  removeThousandSeparator,
  inputCurrency,
  validasiStnk,
  formatThreeDigitNumber,
  changeDateFormatGetHour,
  makeQuery,
  adjustPage
};
