const axios = require("axios");
const { JSDOM } = require("jsdom");
const fs = require("fs");

const pages = {
  IM1067: "Chennai",
  IM1091: "Mumbai",
  IM1083: "Delhi"
};

(async () => {
  try {

    // Go from page 1 to 82


    // load HTML into JSDOM
    const dom = new JSDOM((await axios.get('https://www.glassdoor.co.in/Salaries/mumbai-software-engineer-wipro-salary-SRCH_IL.0,6_IM1070_KO7,24_KE25,30.htm')).data);



    try {

        // its same code we used on et data on browser's console
        let attrPrefix = "salaries-list-item-0";
        let salaryData = {
            compan: dom.window.document.querySelector(`[data-test='${attrPrefix}-employer-name'] a`).textContent,
            job: dom.window.document.querySelector(`[data-test='${attrPrefix}-job-title']`).textContent,
            salary: dom.window.document.querySelector(`[data-test='${attrPrefix}-salary-info'] h3`).textContent,
        }

        // Append data to file after each data is received
        fs.appendFileSync("./data.json", JSON.stringify(salaryData) + ",");


    } catch (e) { console.log("error", e) }


} catch (e) { console.log("Error", e); }
})();