const menu = [
    {
      id: 1,
      name: 'Home',
      parentId: 0
    },
    {
      id: 2,
      name: 'About',
      parentId: 0
    },
    {
      id: 3,
      name: 'News',
      parentId: 0
    },
    {
      id: 4,
      name: 'Products',
      parentId: 0
    },
    {
      id: 5,
      name: 'Contact',
      parentId: 0
    },
    {
      id: 6,
      name: 'T-Shirt',
      parentId: 4
    },
    {
      id: 7,
      name: 'Jean',
      parentId: 4
    },
    {
      id: 8,
      name: 'Skirt',
      parentId: 4
    }
  ];

function convertNested(arr){
  if (!Array.isArray(arr) || arr.length<=0) throw new Error("It is not type array");
  const body = document.querySelector("body");
  const mainMenu =document.createElement("ul");
  mainMenu.setAttribute("id", "main-menu");
  body.appendChild(mainMenu);

  let lookup = {};
  let nestedMenu = [];
  arr.forEach((item) =>{
    lookup[item.id] = {id: item.id, name: item.name, parentId: item.parentId, child : []};
  })
  arr.forEach((item) => {
    
    if (item.parentId === 0) {
      nestedMenu.push(lookup[item.id]);
      const li = document.createElement("li");
      const a = document.createElement("a");
      
      a.setAttribute("href", "#");
      li.setAttribute("id", item.id);
      a.textContent = item.name;
      li.style.fontSize = "24px";

      li.appendChild(a)
      mainMenu.appendChild(li); 
    }
    else  {
      lookup[item.parentId].child.push(lookup[item.id]);
      const li = document.createElement("li");
      const a = document.createElement("a");

      li.style.fontSize = "20px";
      li.style.marginLeft = "20px";
      li.setAttribute("id", item.id);

      a.setAttribute("href", "#");
      a.textContent = item.name;

      li.appendChild(a)
      const parentId = document.getElementById(String(item.parentId));
      parentId.appendChild(li);
    }
  });
  return nestedMenu;
}
convertNested(menu);

