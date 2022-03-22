const axios = require("axios");
const { JSDOM } = require("jsdom");
const fs = require("fs");

(async () => {
  try {
    // Go from page 1 to 82
    for (let j = 1; j <= 82; j++) {
      // page number mixed with random string
      let page = "IM1083";
      if (j > 1) page = page + "_KO" + j;

      console.log("fetching page", j, "out of", 4);

      // load HTML into JSDOM
      const dom = new JSDOM(
        (
          await axios.get(
            `https://www.glassdoor.co.in/Salaries/new-delhi-wipro-software-engineer-wipro-salary-SRCH_IL.0,9_${page}.htm`
          )
        ).data
      );

      // For each 20 data in a page
      for (let i = 0; i <= 19; i++) {
        try {
          // its same code we used on et data on browser's console
          let attrPrefix = `salaries-list-item-${i}`;
          let salaryData = {
            compan: dom.window.document.querySelector(
              `[data-test='${attrPrefix}-employer-name'] a`
            ).textContent,
            logo: dom.window.document.querySelector(
              `[data-test='${attrPrefix}-employer-url'] img`
            ).src,
            job: dom.window.document.querySelector(
              `[data-test='${attrPrefix}-job-title']`
            ).textContent,
            salary: dom.window.document.querySelector(
              `[data-test='${attrPrefix}-salary-info'] h3`
            ).textContent,
          };

          // Append data to file after each data is received
          fs.appendFileSync("./data.json", JSON.stringify(salaryData) + ",");

          console.log("completed", i, "of", j, "out of", 1204);
        } catch (e) {
          continue;
        }
      }
    }
  } catch (e) {
    console.log("Error", e);
  }
})();
