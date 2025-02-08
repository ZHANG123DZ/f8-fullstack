const categories = [
    {
      id: 1,
      name: "Electronics",
      slugs: "electronics",
      children: [
        {
          id: 2,
          name: "Laptops",
          slugs: "laptops",
          children: [
            {
              id: 3,
              name: "Apple",
              slugs: "apple",
            },
            {
              id: 4,
              name: "Dell",
              slugs: "dell",
            },
          ],
        },
        {
          id: 5,
          name: "Headphones",
          slugs: "headphones",
        },
      ],
    },
    {
      id: 6,
      name: "Books",
      slugs: "books",
      children: [
        {
          id: 7,
          name: "Fiction",
          slugs: "fiction",
          children: [
            {
              id: 8,
              name: "Thrillers",
              slugs: "thrillers",
            },
            {
              id: 9,
              name: "Mystery",
              slugs: "mystery",
            },
          ],
        },
        {
          id: 10,
          name: "Non-Fiction",
          slugs: "non-fiction",
        },
      ],
    },
  ];
  
function menu(data) {
    const parentUl = document.createElement('ul');
    function buildMenu(data, parentUl, urlParent='') {
        data.forEach(item => {
          const li = document.createElement('li')
          const a = document.createElement('a')
          a.textContent = item.name
          a.setAttribute('href', urlParent +'/'+ item.slugs)
          li.appendChild(a)
          parentUl.appendChild(li)
          if (item.children) {
            const ul = document.createElement('ul')
            li.appendChild(ul)
            buildMenu(item.children, ul, item.slugs)
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
          } 
        })
    }
    buildMenu(data, parentUl)
    return parentUl
}
const body = document.querySelector('body')
const menu_element = menu(categories)
body.appendChild(menu_element)
