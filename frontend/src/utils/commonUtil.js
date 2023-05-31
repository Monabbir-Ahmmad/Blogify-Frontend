/**
 * A function to extract text from html
 * @param {string} html - html string
 * @param {boolean} [space=true] - whether to add space between elements
 * @returns {string} extracted text
 */
export function extractTextFromHtml(html, space = true) {
  const span = document.createElement("span");
  span.innerHTML = html;
  if (space) {
    const children = span.querySelectorAll("*");
    for (let i = 0; i < children.length; i++) {
      if (children[i].textContent) children[i].textContent += " ";
      else children[i].innerText += " ";
    }
  }
  return [span.textContent || span.innerText].toString().replace(/ +/g, " ");
}

/**
 * A function to estimate the reading time of a text in minutes
 * @param {string} text - text to estimate reading time
 * @returns {number} estimated reading time in minutes
 */
export function estimateReadingTime(text) {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s/g).length;
  return Math.ceil(numberOfWords / wordsPerMinute);
}
