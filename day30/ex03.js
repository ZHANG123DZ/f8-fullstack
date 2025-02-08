function countElements(tagName) {
  try {
    if (typeof tagName !== "string") throw "is not a string";
    if (tagName.length === 0) throw "Invalid tag name";
  } catch (error) {
    throw new Error(`Error ${error}`);
  }
    const target = document.querySelectorAll(tagName);
    const div = document.createElement('div');
    div.textContent = `Trong web có chứa ${target.length} thẻ ${tagName}`;
    return div;
  }
  // Giả sử trên trang web có 10 thẻ div và 5 thẻ p
  document.body.appendChild(countElements('div'));// 0
  document.body.appendChild(countElements('table'));// 1
  document.body.appendChild(countElements('li'));// 8
  