/**
 * A function to extract text from html
 * @param {string} html - html string
 * @param {boolean} [space=true] - whether to add space between elements
 * @returns {string} extracted text
 */
export function extractTextFromHtml(html, space = true) {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  if (space) {
    const children = tempDiv.querySelectorAll("*");
    for (let i = 0; i < children.length; i++) {
      if (children[i].textContent) children[i].textContent += " ";
      else children[i].innerText += " ";
    }
  }
  return [tempDiv.textContent || tempDiv.innerText]
    .toString()
    .replace(/ +/g, " ");
}

/**
 * A function to estimate the reading time of a text in minutes
 * @param {string} text - text to estimate reading time
 * @returns {string} estimated reading time
 */
export function estimateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.split(/\s/g).length;

  // Calculate the reading time in minutes
  const readingTimeInMinutes = words / wordsPerMinute;

  // Check if the reading time is less than 1 minute
  if (readingTimeInMinutes < 1) {
    // Calculate the reading time in seconds
    const readingTimeInSeconds = Math.ceil(readingTimeInMinutes * 60);

    return `${readingTimeInSeconds} sec read`;
  }

  // Round the reading time to the nearest minute
  const roundedReadingTime = Math.ceil(readingTimeInMinutes);

  return `${roundedReadingTime} min read`;
}

export function removeHtmlStyles(html) {
  const tempElement = document.createElement("div");
  tempElement.innerHTML = html;

  const elements = tempElement.querySelectorAll("*");
  elements.forEach((element) => {
    // Remove inline styles
    element.removeAttribute("style");

    // Remove classes
    element.removeAttribute("class");

    // Remove IDs
    element.removeAttribute("id");
  });

  return tempElement.innerHTML;
}

export function getRandomImage(seed, { width = 500, height = 500 }) {
  return `https://picsum.photos/seed/abstract-${seed}/${width}/${height}`;
}
