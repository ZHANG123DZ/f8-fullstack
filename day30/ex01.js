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

function createMenu(data) {
  try {
    if (!Array.isArray(data)) throw "is not an array";
    if (data.length === 0) throw "array is empty";
  } catch (error) {
    throw new Error(`Error ${error}`);
  }
  const mainMenu = document.createElement("ul");
  mainMenu.setAttribute("id", "main-menu");
  function buildMenu(items, parentId = 0, parentUl) {
    items.filter((item) => item.parentId === parentId).forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.setAttribute('href', '#');
      a.textContent = item.name;

      if (item.parentId === 0) {
        a.style.fontSize = '24px';
      }
      else {
        a.style.fontSize = '20px';
      }
      li.appendChild(a);

      const childItems = items.filter((child) => child.parentId === item.id);
      if (childItems.length > 0) {
        const childUl = document.createElement('ul');
        li.appendChild(childUl);
        buildMenu(items, item.id, childUl);
      }
      parentUl.appendChild(li);
    });
  }
  buildMenu(data, 0, mainMenu);

  return mainMenu;
}

const body = document.querySelector('body');
const menuElement = createMenu(menu);
body.appendChild(menuElement);


