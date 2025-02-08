function shareBill() {
    const result = document.querySelector('#result')
    const bill = document.querySelector('#bill')
    const persons = document.querySelector('#persons')
    const tips = document.querySelector('#tips')
    const button = document.querySelector('#button')
    button.addEventListener('click', function() {
        result.textContent = ''
        const bill_money = parseInt(bill.value)
        const personShare = parseInt(persons.value)
        const tip_money = parseInt(tips.value)
        if (bill_money & personShare & tip_money ) {
            const total = tip_money + bill_money
            const share = total/personShare
            const p_total = document.createElement('p')
            const p_share = document.createElement('p')
            p_share.textContent = `Mỗi người cần phải trả: ${share.toFixed(2)} VND`
            p_total.textContent = `Tổng số tiền cần trả: ${total} VND`
            result.appendChild(p_share)
            result.appendChild(p_total)
        }
    })
}
shareBill()