import * as XLSX from "xlsx"

export const JSONToExcel = (data, filename) => {

    var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(data)
    // var wscols = autoFitColumns(data)
    // ws["!cols"] = wscols;

    const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    worksheet["!cols"] = [{ wch: max_width }];

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    XLSX.writeFile(wb, filename + ".xlsx")
}

// const autoFitColumns = (json) => {
//     const jsonKeys = Object.keys(json[0]) //obj keys
//     const jsonLenght = Object.keys(json[0]).length //obj length

//     let objectMaxLength = [];
//     for (let i = 0; i < jsonLenght; i++) {
//       let value = json[i];
//       for (let j = 0; j < jsonKeys.length; j++) {
//         if (typeof value[jsonKeys[j]] == "number") {
//           objectMaxLength[j] = 10;
//         } else {

//           const l = value[jsonKeys[j]] ? value[jsonKeys[j]].length : 0;

//           objectMaxLength[j] =
//             objectMaxLength[j] >= l
//               ? objectMaxLength[j]
//               : l;
//         }
//       }

//       let key = jsonKeys;
//       for (let j = 0; j < key.length; j++) {
//         objectMaxLength[j] =
//           objectMaxLength[j] >= key[j].length
//             ? objectMaxLength[j]
//             : key[j].length;
//       }
//     }

//     const wscols = objectMaxLength.map(w => { return { width: w} });
//   }