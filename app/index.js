import { readFileSync } from "fs";
import document from 'document';
import { inbox } from "file-transfer";
import {kpayFile} from '../common/index';

// Schema
// {
//   "totalPurchases": 187,
//   "totalActiveTrials": 55,
//   "totalIncome": 241.31,
//   "totalPaidOut": 130.6,
//   "currentBalance": 110.71,
//   "nextPayout": {
//     "date": "2020-04-30",
//     "amount": 43.51,
//     "purchases": {
//       "total": 27,
//       "periodStart": "2020-03-13",
//       "periodEnd": "2020-04-16"
//     }
//   },
//   "previousPayout": {
//     "date": "2020-03-26",
//     "amount": 37.02,
//     "purchases": {
//       "total": 28,
//       "periodStart": "2020-02-14",
//       "periodEnd": "2020-03-12"
//     }
//   }
// }


const setValues = () => {
    try {
        const data = readFileSync(`/private/data/${kpayFile}`, 'cbor');
        
        document.getElementById('totalIncome').text = "$" + data.totalIncome;
        document.getElementById('currentBalance').text = "$" + data.currentBalance;
        document.getElementById('nextPayout').text = "$" + data.nextPayout.amount;
        document.getElementById('totalActiveTrials').text = data.totalActiveTrials;
        document.getElementById('totalPurchases').text = data.totalPurchases;
        document.getElementById('nextPayoutDate').text = data.nextPayout.date;
    } catch (e) {
        console.log(e);
    }  
}

function processAllFiles() {
    let fileName;
    while (fileName = inbox.nextFile()) {
        setValues()
        console.log(`/private/data/${fileName} is now available`);
    }
}

inbox.addEventListener("newfile", processAllFiles);
processAllFiles();