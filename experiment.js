const axios = require("axios");
const { JSDOM } = require("jsdom");
const fs = require("fs");

const pages = {
  "IM1067": "Chennai",
  "IM1091": "Mumbai",
  "IM1083": "Delhi"
};

(async () => {
  try {
    // Go from page 1 to 82
    for (let j = 1; j <= 1; j++) {
      // page number mixed with random string
      let page = "IM1067";
      if (j > 1) page = page + "_KO" + j;
      let ilid = 7;

      console.log("fetching page", j, "out of", 4);

      // load HTML into JSDOM
      const dom = new JSDOM(
        (
          await axios.get(
            `https://www.glassdoor.co.in/Salaries/chennai-doctor-salary-SRCH_IL.0,${ilid}_${page}.htm`
          )
        ).data
      );

      // console.log(dom);

      // its same code we used on et data on browser's console
      let salaryData = {
        salary: dom.window.document.querySelector(
          `[data-test='occ-median-median-pay'] span`
        ),
      };

      console.log('====================================');
      console.log(salaryData);
      console.log('====================================');

      // const ROW_SELECTOR	= '#nodeReplace > div > div > div:nth-child(1) > div > div.mt > div.row.mt-lg > div.col-12.col-lg-4 > div.d-flex.align-items-baseline > span.m-0.css-146zilq.ebrouyy2';
      
      // console.log(ROW_SELECTOR)

      // console.log(
      //   dom.window.document.querySelectorAll(
      //     `div.d-flex.align-items-baseline, span.m-0.css-146zilq.ebrouyy2`
      //   )
      // );

      // Append data to file after each data is received
      // fs.appendFileSync("./salary.json", JSON.stringify(salaryData) + ",");

      // console.log("completed", i, "of", j, "out of", 4);
    }
  } catch (e) {
    console.log("Error", e);
  }
})();
