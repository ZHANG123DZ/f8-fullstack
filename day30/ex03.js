function countElements(tagName) {
    // Your code here
    const target = document.querySelectorAll(tagName);
    return target.length;
  }
  // Giả sử trên trang web có 10 thẻ div và 5 thẻ p
  
  console.log(countElements('div')); // 0
  console.log(countElements('table')); // 5
  console.log(countElements('li')) //8
  