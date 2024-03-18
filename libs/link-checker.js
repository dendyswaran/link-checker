const axios = require("axios");

/**
 * Tests if a given link redirects to the target link.
 * @param {string} sourceLink - The link to test.
 * @param {string} targetLink - The expected target link after redirection.
 * @returns {Promise<boolean>} - A promise that resolves to true if the source link redirects to the target link, false otherwise.
 */
async function testLinkRedirect(sourceLink, targetLink) {
  try {
    const response = await axios.get(sourceLink);
    // Check if the final URL after all redirects matches the target link.
    return response.request.res.responseUrl === targetLink;
  } catch (error) {
    console.error(
      `Error testing link redirect from ${sourceLink} to ${targetLink}:`
    );
    return false;
  }
}

module.exports = testLinkRedirect;
