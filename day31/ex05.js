const categories = [
    {
      id: 1,
      name: "Chuyên mục 1",
      parent: 0,
      slug: "chuyen-muc-1",
    },
    {
      id: 2,
      name: "Chuyên mục 2",
      parent: 0,
      slug: "chuyen-muc-2",
    },
    {
      id: 3,
      name: "Chuyên mục 3",
      parent: 0,
      slug: "chuyen-muc-3",
    },
    {
      id: 4,
      name: "Chuyên mục 2.1",
      parent: 2,
      slug: "chuyen-muc-2-1",
    },
    {
      id: 5,
      name: "Chuyên mục 2.2",
      parent: 2,
      slug: "chuyen-muc-2-2",
    },
    {
      id: 6,
      name: "Chuyên mục 2.3",
      parent: 2,
      slug: "chuyen-muc-2-3",
    },
    {
      id: 7,
      name: "Chuyên mục 3.1",
      parent: 3,
      slug: "chuyen-muc-3-1",
    },
    {
      id: 8,
      name: "Chuyên mục 3.2",
      parent: 3,
      slug: "chuyen-muc-3-2",
    },
    {
      id: 9,
      name: "Chuyên mục 3.3",
      parent: 3,
      slug: "chuyen-muc-3-3",
    },
    {
      id: 10,
      name: "Chuyên mục 2.2.1",
      parent: 5,
      slug: "chuyen-muc-2-2-1",
    },
    {
      id: 11,
      name: "Chuyên mục 2.2.2",
      parent: 5,
      slug: "chuyen-muc-2-2-2",
    },
  ];
function convertNested(data) {
  const nested = document.createElement('ul')
  function buildNested(items, parent=0, parentUl) {
    items.filter(item => item.parent === parent).forEach(item => {
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.textContent = item.name
      a.setAttribute('href', item.slug)
      li.appendChild(a)
      const child = items.filter((child) => child.parent === item.id)
      if (child.length>0) {
        const ul = document.createElement('ul')
        ul.style.display = 'none'
        li.addEventListener('mouseover', function() {
          ul.style.display = 'grid'
          a.style.backgroundColor = 'gray'
        })
        li.addEventListener('mouseout', function(){
          ul.style.display = 'none'
          ul.style.transition = 'all 1s ease-in-out'
          a.style.backgroundColor = 'white'
        })
        li.appendChild(ul)
        buildNested(items, item.id, ul)
      }
      parentUl.appendChild(li)
    })
  }
  buildNested(data, 0, nested)  
  return nested
}
const body = document.querySelector('body')
const menuElement = convertNested(categories)
body.appendChild(menuElement)
