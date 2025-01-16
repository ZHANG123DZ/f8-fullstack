const cart = [
    {
      id: 1,
      name: 'T-Shirt',
      price: 100000,
      quantity: 2,
      hotSale: false
    },
    {
      id: 2,
      name: 'Jean',
      price: 200000,
      quantity: 1,
      hotSale: false
    },
    {
      id: 3,
      name: 'Skirt',
      price: 150000,
      quantity: 3,
      hotSale: true
    },
    {
      id: 4,
      name: 'Shirt',
      price: 120000,
      quantity: 2,
      hotSale: false
    },
    {
      id: 5,
      name: 'Jacket',
      price: 250000,
      quantity: 1,
      hotSale: true
    }
  ];

function renderOrder(cart){
    if (!Array.isArray(cart)) throw new Error("It is not type array");

    const body = document.querySelector("body");
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const tfoot = document.createElement("tfoot");
    
    // thead
    const headers = ["Tên sản phẩm", "Đơn giá", "Số lượng", "Thành tiền"];
    const trHead = document.createElement("tr");

    headers.forEach((header) =>{
        const th = document.createElement("th");
        th.textContent = header;
        trHead.appendChild(th);
    })

    thead.appendChild(trHead);  

    // tbody
    let totals =0;
    cart.forEach((items) => {
        const tr = document.createElement("tr");
        items.total = items.quantity * items.price;
        totals += items.total;
        
        const info = [items.name, items.price, items.quantity, items.total];
        info.forEach((item) => {
            const td = document.createElement("td");
            td.textContent = item;
            tr.appendChild(td);
            if (items.hotSale === true){
                tr.style.color = "red";
            }
        })
        tbody.appendChild(tr);
    })

    // tfoot
    const trFoot = document.createElement("tr");
    const totalsText = document.createElement("td");
    const totalsMoney = document.createElement("td");

    totalsText.textContent = "Tổng tiền";
    totalsText.colSpan = "3";
    totalsMoney.textContent = totals;
    
    trFoot.appendChild(totalsText);
    trFoot.appendChild(totalsMoney);
    tfoot.appendChild(trFoot);

    // thêm các phần tử con vào cha 
    table.appendChild(thead);
    table.appendChild(tbody);
    table.appendChild(tfoot);
    body.appendChild(table);

    document.querySelectorAll("td, th").forEach((cell) => {
        cell.style.border = "2px solid black";
    })
    table.style.borderCollapse = "collapse";
}
renderOrder(cart);