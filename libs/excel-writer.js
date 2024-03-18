const writeXlsxFile = require("write-excel-file/node");
const fs = require("fs");
const { parse } = require("json2csv");

/**
 * Writes data to an Excel file.
 * @param {Array<Object>} data - The data to write, where each object represents a row in the Excel file.
 * @param {string} filePath - The path where the Excel file will be saved.
 * @returns {Promise<void>} - A promise that resolves when the file has been written.
 */
async function writeExcelFile(data, filePath) {
  try {
    // Convert array of objects to array of arrays
    const rows = [];
    if (data.length > 0) {
      // Add headers
      rows.push(Object.keys(data[0]));
      // Add data
      data.forEach((item) => {
        rows.push(Object.values(item));
      });
    }
    await writeXlsxFile(rows, {
      filePath: filePath,
    });

    console.log(`Excel file has been written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing Excel file at ${filePath}:`, error);
    throw error; // Rethrow to allow caller to handle
  }
}

/**
 * Writes data to a CSV file.
 * @param {Array<Object>} data - The data to write, where each object represents a row in the CSV file.
 * @param {string} filePath - The path where the CSV file will be saved.
 * @returns {Promise<void>} - A promise that resolves when the file has been written.
 */
async function writeCsvFile(data, filePath) {
  try {
    const csv = parse(data);
    await fs.promises.writeFile(filePath, csv);

    console.log(`CSV file has been written to ${filePath}`);
  } catch (error) {
    console.error(`Error writing CSV file at ${filePath}:`, error);
    throw error; // Rethrow to allow caller to handle
  }
}

module.exports = {
  writeCsvFile,
  writeExcelFile,
};
