import React from 'react'

import * as FileSaver from 'file-saver';

import * as XLSX from 'xlsx';
import iconExport from './excel.png'

export const ExportCSV = ({
    csvData, 
    fileName, 
    styles,
    filterParams,
    activeFilter
}) => {



    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        //Transfrorm
        const newData = csvData.map((el, idx) => {
            return ({
                "Номер": idx + 1,
                "Табельний": el.card_id ? el.card_id : '-',
                "ПІБ": `${el.surname} ${el.name} ${el.fullname}`,
                "Название коллектива": filterParams.filter(col => col.id === +activeFilter)[0].title,
                "Сумма оплаты": el.money ? el.money : 0,
                "Пільги": el.status ? el.status : 'немає',
                'Період пільги': el.data_money ? el.data_money : '-'
            })
        })

        const ws = XLSX.utils.json_to_sheet(newData);

        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

        const data = new Blob([excelBuffer], {type: fileType});

        FileSaver.saveAs(data, fileName + fileExtension);

    }



    return (

        <div className={styles.files}  onClick={(e) => exportToCSV(csvData,fileName)}>
            <div className={styles.gridControls__exportExcel}>
                <img src={iconExport} />
            </div>
        </div>

    )

}