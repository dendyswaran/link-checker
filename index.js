const readExcelFile = require("./libs/excel-reader");
const testLinkRedirect = require("./libs/link-checker");
const { writeCsvFile } = require("./libs/excel-writer");

const SOURCE_URL = "Target/As-is URL";
const DESTINATION_URL = "Destination/To-be URL (Expected)";

async function start() {
  const data = await readExcelFile("./santen-rewrite-test.xlsx");

  let resultData = [];

  for (var i = 0; i < data.length; i++) {
    const row = data[i];
    const source = row[SOURCE_URL];
    const destination = row[DESTINATION_URL];

    if (source && destination) {
      const result = await testLinkRedirect(source, destination);
      resultData.push({
        ...row,
        "Testing Result": result ? "Success" : "Failed",
      });
    }
  }

  //   console.log(resultData);

  await writeCsvFile(resultData, "./santen-rewrite-result.csv");
}

start();
