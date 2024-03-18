const readExcelFile = require("./libs/excel-reader");
const testLinkRedirect = require("./libs/link-checker");
const { writeCsvFile } = require("./libs/excel-writer");
require("dotenv").config();

const COL_SOURCE_URL = process.env.COL_SOURCE_URL || "Target/As-is URL";
const COL_DESTINATION_URL =
  process.env.COL_DESTINATION_URL || "Destination/To-be URL (Expected)";
const COL_DESTINATION_EXPECTED_URL =
  process.env.COL_DESTINATION_EXPECTED_URL ||
  "Destination/To-be URL (from the test)";
const COL_TEST_RESULT =
  process.env.COL_TEST_RESULT || "Test Result (Success/Failed)";

console.log(process.env.SOURCE_FILE);

async function start() {
  const data = await readExcelFile(process.env.SOURCE_FILE);

  let resultData = [];

  for (var i = 0; i < data.length; i++) {
    const row = data[i];
    const source = row[COL_SOURCE_URL];
    const destination = row[COL_DESTINATION_URL];

    if (source && destination) {
      const resp = await testLinkRedirect(source, destination);
      resultData.push({
        ...row,
        [COL_DESTINATION_EXPECTED_URL]: resp.result,
        [COL_TEST_RESULT]: resp.isMatch ? "Success" : "Failed",
      });
    }
  }

  await writeCsvFile(resultData, "./result.csv");
}

start();
