const listCart = [
    { id: 1, name: 'Sản phẩm 1', price: 1000 },
    { id: 2, name: 'Sản phẩm 2', price: 2000 },
    { id: 3, name: 'Sản phẩm 3', price: 3000 },
    { id: 4, name: 'Sản phẩm 4', price: 4000 },
]

const list_cart = document.querySelector('#list-cart')
const shopping_cart = document.querySelector('#shopping-cart')
const update_button = document.querySelector('.update')
const remove_button = document.querySelector('.remove')
let shopCart= JSON.parse(localStorage.getItem('cart')) || []
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(shopCart))
}
function createTable(headers, parent) {
    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tr = document.createElement('tr')
    headers.forEach(title => {
        const th = document.createElement('th')
        th.textContent = title
        tr.appendChild(th)
    })
    thead.appendChild(tr)
    table.appendChild(thead)
    const tbody = document.createElement('tbody')
    table.appendChild(tbody)
    parent.appendChild(table)
    return tbody
}

const tbody = createTable(['STT', 'Tên sản phẩm', 'Giá', 'Thêm vào giỏ'], list_cart)

listCart.forEach((item, index) => {
    const tr = document.createElement('tr')
    tr.dataset.id = item.id
    tr.dataset.name = item.name
    tr.dataset.price = item.price

    const product_info = [index+1, item.name, item.price]
    product_info.forEach(info => {
        const td = document.createElement('td')
        td.textContent = info
        tr.appendChild(td)
    })

    const td = document.createElement('td')
    const input = document.createElement('input')
    input.type = 'number'
    input.value = '1'
    input.min = '1'
    td.appendChild(input)

    const addBtn = document.createElement('button')
    addBtn.textContent = 'Thêm vào giỏ hàng'
    addBtn.classList.add('add')
    addBtn.addEventListener('click', () =>{
        if (!checkNumber(input.value)){
            alert('Giá trị nhập vào không hợp lệ')
            input.value = '1'
            return 
        } 
        addToCart(item.id, item.name, item.price, parseInt(input.value))
    })
    td.appendChild(addBtn)
    
    tr.appendChild(td)
    tbody.appendChild(tr)
})

function addToCart(id, name, price, quantity) {
    id = parseInt(id)
    let item = shopCart.find(product => product.id === id)
    if (item) {
        item.quantity += quantity
    } else {
        shopCart.push({ id, name, price, quantity })
    }
    saveCart()
    updateCart()
}

function updateCart() {
    shopping_cart.textContent = ''
    if (shopCart.length === 0) {
        shopping_cart.textContent = 'Giỏ hàng không có sản phẩm'
        return
    }
    const tbody = createTable(['STT', 'Tên sản phẩm', 'Giá', 'Số lượng', 'Thành tiền', 'Xoá'], shopping_cart)
    let totalQuantity = 0, totalMoney = 0
    shopCart.forEach((product, index) => {
        const tr = document.createElement('tr')
        tr.dataset.id = product.id

        const product_info = [index+1, product.name, product.price]
        product_info.forEach(item => {
            const td = document.createElement('td')
            td.textContent = item
            tr.appendChild(td)
        })
        const tdInput = document.createElement('td')
        const input = document.createElement('input')
        input.type = 'number'
        input.value = product.quantity
        input.addEventListener('change', function() {
            if (!checkNumber(this.value)){
                alert('Giá trị nhập vào không hợp lệ')
                saveCart()
                return updateCart()
            } 
            let newQuantity = parseInt(this.value)
            product.quantity = newQuantity
        })
        tdInput.appendChild(input)
        tr.appendChild(tdInput)

        const tdTotal = document.createElement('td')
        tdTotal.textContent = product.price * product.quantity
        tr.appendChild(tdTotal)

        const tdDelete = document.createElement('td')
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Xoá'
        deleteBtn.addEventListener('click', () => deleteProduct(product.id))
        tdDelete.appendChild(deleteBtn)
        tr.appendChild(tdDelete)
        tbody.appendChild(tr)
        
        totalQuantity += product.quantity
        totalMoney += product.price*product.quantity
    })
    
    const tfoot = document.createElement('tfoot')
    const trFoot = document.createElement('tr')
    trFoot.innerHTML = `<td colspan="3">Tổng</td><td>${totalQuantity}</td><td colspan="2">${totalMoney}</td>`
    tfoot.appendChild(trFoot)
    shopping_cart.querySelector('table').appendChild(tfoot)
    const hr = document.createElement('hr')
    const update_button = document.createElement('button')
    update_button.textContent = 'Cập nhật giỏ hàng'
    update_button.setAttribute('class', 'update')
    const deleteCart_button = document.createElement('button')
    deleteCart_button.textContent = 'Xoá giỏ hàng'
    deleteCart_button.setAttribute('class', 'delete')
    update_button.addEventListener('click', function(){
        alert('Giỏ hàng đã được cập nhật thành công')
        saveCart()
        updateCart()
    })
    deleteCart_button.addEventListener('click', deleteCart)
    shopping_cart.appendChild(update_button)
    shopping_cart.appendChild(deleteCart_button)
}

function deleteProduct(id) {
    let confirmDelete = confirm('Bạn muốn loại bỏ sản phẩm này khỏi giỏ hàng')
    if (confirmDelete) {
        alert('Sản phẩm đã được loại bỏ thành công')
        shopCart = shopCart.filter(product => product.id !== id)
        saveCart()
        updateCart()
    }
}

function deleteCart() {
    let confirmDelete = confirm('Are you sure?')
    if (confirmDelete) {
        alert('Giỏ đã được xoá thành công')
        shopCart = []
        saveCart()
        updateCart()
    }
}
function checkNumber(target) {
    const regex = new RegExp(/^[0-9]/)
    return regex.test(target)
}
updateCart()