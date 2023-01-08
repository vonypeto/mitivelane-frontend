import * as XLSX from "xlsx"

export const JSONToExcel = (data, filename) => {
    var excel = autoFitColumns(data)
    console.log("excel", excel)
    var excelData = excel.newJSON

    var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(excelData)
    ws["!cols"] = excel.wscols;

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1")
    XLSX.writeFile(wb, filename + ".xlsx")
}

export const JSONManyToExcel = (data, filename) => {
    var wb = XLSX.utils.book_new()
    var excelData, excel, ws

    data.map((json, key) => {
        excel = autoFitColumns(json)
        console.log("excel " + key, excel)
        excelData = excel.newJSON
    
        ws = XLSX.utils.json_to_sheet(excelData)
        ws["!cols"] = excel.wscols;
    
        XLSX.utils.book_append_sheet(wb, ws, "Sheet" + key + 1 )
    })

    XLSX.writeFile(wb, filename + ".xlsx")
}


const autoFitColumns = (json) => {
    console.log("start")

    const jsonKeys = Object.keys(json[0]) //obj keys
    const jsonLenght = json.length //obj length

    console.log("json", json)
    console.log("jsonKeys", jsonKeys)
    console.log("jsonLenght", jsonLenght)

    let objectMaxLength = [];
    for (let i = 0; i < jsonLenght; i++) {
        let value = json[i];

        console.log("value", value)

        if (value != undefined) {
            for (let j = 0; j < jsonKeys.length; j++) {

                if (value[jsonKeys[j]] == undefined) {
                    value[jsonKeys[j]] = ""
                }

                else {
                    if (typeof value[jsonKeys[j]] == "number") {
                        objectMaxLength[j] = 10;
                    }

                    else {
                        if (typeof value[jsonKeys[j]] == "string") {
                            value[jsonKeys[j]] = value[jsonKeys[j]].replace('undefined','')
                        }

                        const l = value[jsonKeys[j]] ? value[jsonKeys[j]].length : 0;

                        objectMaxLength[j] =
                            objectMaxLength[j] >= l
                                ? objectMaxLength[j]
                                : l;
                    }
                }


            }
        }

        let key = jsonKeys;
        for (let j = 0; j < key.length; j++) {
            objectMaxLength[j] =
                objectMaxLength[j] >= key[j].length
                    ? objectMaxLength[j]
                    : key[j].length;

        }

        json[i] = value
    }

    const wscols = objectMaxLength.map(w => { return { width: w * 1.1 } });
    const newJSON = json

    return({wscols, newJSON})
}