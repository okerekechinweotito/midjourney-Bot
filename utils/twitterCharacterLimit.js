function shortenString(str, charLimit) {
  if (str.length <= charLimit) {
    return str;
  }

  let shortenedString = str.substring(0, charLimit);

  if (shortenedString.lastIndexOf(',') !== -1) {
    shortenedString = shortenedString.substring(
      0,
      shortenedString.lastIndexOf(',')
    );
  }
  return shortenedString.trim();
}

export { shortenString };
