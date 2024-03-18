const readXlsxFile = require("read-excel-file/node");

/**
 * Reads data from an Excel file.
 * @param {string} filePath - The path to the Excel file.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects, each representing a row in the Excel file.
 */
async function readExcelFile(filePath) {
  try {
    const rows = await readXlsxFile(filePath);
    // Convert array of arrays to array of objects
    const headers = rows.shift(); // First row as headers
    const data = rows.map((row) => {
      const rowData = {};
      row.forEach((value, index) => {
        rowData[headers[index]] = value;
      });
      return rowData;
    });
    return data;
  } catch (error) {
    console.error(`Error reading Excel file at ${filePath}:`, error);
    throw error; // Rethrow to allow caller to handle
  }
}

module.exports = readExcelFile;
