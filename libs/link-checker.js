const axios = require("axios");

/**
 * Tests if a given link redirects to the target link.
 * @param {string} sourceLink - The link to test.
 * @param {string} targetLink - The expected target link after redirection.
 * @returns {Promise<{isMatch: boolean, result: string} | boolean>} - A promise that resolves to an object with isMatch and result properties if successful, or false if an error occurs.
 */
async function testLinkRedirect(sourceLink, targetLink) {
  try {
    const response = await axios.get(sourceLink, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      },
    });
    // Check if the final URL after all redirects matches the target link.
    return {
      isMatch: response.request.res.responseUrl === targetLink,
      result: response.request.res.responseUrl,
    };
  } catch (error) {
    console.error(
      `Error testing link redirect from ${sourceLink} to ${targetLink}:`,
      error
    );
    return {
      isMatch: false,
      result: "N/A",
    };
  }
}

module.exports = testLinkRedirect;
