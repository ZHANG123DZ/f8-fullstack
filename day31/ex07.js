function calculator() {
    const button = document.querySelector('button')
    const results = document.querySelector('#result')
    button.addEventListener('click', function(){
        results.textContent = ''
        const regex = new RegExp(/^[0-9]+$/)
        const number1 = document.querySelector('#number1').value
        const number2 = document.querySelector('#number2').value
        
        document.querySelectorAll('input[type="radio"]').forEach(radio =>{
            radio.addEventListener('change', function() {
                document.querySelectorAll('input[type="radio"]').forEach(rd => {
                    if (rd !== this) rd.checked = false;
                })
            })
        })
        let operation = 0
        document.querySelectorAll('input[type="radio"]').forEach(radio =>{
            if (radio.checked) {
                operation = radio.value
            }
        })
        if (!number1|| !number2) return alert('Nhập thiếu số')
        if (!regex.test(number1)) return alert('Giá trị nhập vào phải là số');
        if (!regex.test(number2)) return alert('Giá trị nhập vào phải là số');
        const a = parseFloat(number1)
        const b = parseFloat(number2)
        let result = 0 
        switch(operation) {
            case '+': result = a+b; break;
            case '-': result = a-b; break;
            case '*': result = a*b; break;
            default: if (b===0) alert('Số thứ 2 phải khác không')
            else{result = a/b}
        }
        
        results.textContent = result
    })
}
calculator()