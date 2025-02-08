const descriptions = {
    1: "Bạn là người độc lập, mạnh mẽ và có khả năng lãnh đạo. Bạn có tư duy sáng tạo và luôn tìm cách đạt được mục tiêu của mình.",
    2: "Bạn là người hòa đồng, nhạy bén và biết lắng nghe. Bạn rất giỏi trong việc xây dựng mối quan hệ và hợp tác.",
    3: "Bạn sáng tạo, lạc quan và luôn tràn đầy năng lượng. Bạn có khả năng giao tiếp tốt và dễ dàng làm quen với mọi người.",
    4: "Bạn là người thực tế, có tổ chức và làm việc chăm chỉ. Bạn có khả năng xây dựng nền tảng vững chắc trong công việc và cuộc sống.",
    5: "Bạn thích tự do, thích khám phá và là người thích mạo hiểm. Bạn có thể đối mặt với thử thách và luôn tìm kiếm sự thay đổi.",
    6: "Bạn quan tâm đến gia đình, yêu thương và chăm sóc người khác. Bạn là người sống trách nhiệm và luôn quan tâm đến những người thân yêu.",
    7: "Bạn là người thích suy ngẫm, nghiên cứu và khám phá. Bạn có khả năng phân tích và thích sự yên tĩnh.",
    8: "Bạn là người kiên trì, có tham vọng và luôn nỗ lực hết mình. Bạn có sức mạnh và khả năng lãnh đạo trong mọi lĩnh vực.",
    9: "Bạn là người có tấm lòng nhân ái, giúp đỡ và quan tâm đến người khác. Bạn có tính cách giàu tình cảm và thích giúp đỡ cộng đồng.",
  };

function numerology(data) {
    const input = document.querySelector('input')
    const button = document.querySelector('#button')
    const guess = document.querySelector('#guess')
    button.addEventListener(
        'click', function() {
            guess.textContent = ''
            const number = input.value.split('').map(item => Number.parseInt(item)).filter(item => !isNaN(item))
            console.log(number)
            if (number.length === 0) return alert('Bạn chưa nhập ngày sinh')
            let total = 0
            function result(number) {
                number.forEach(item => total+= item)
                if (total>=10) {
                    let arr = String(total).split('').map(item => Number.parseInt(item))
                    total =0
                    result(arr)
                }
                return total
            }
            result(number)
            const h2 = document.createElement('h2')
            const p = document.createElement('p')
            h2.textContent = `Số chủ đạo của bạn là ${total}`
            p.textContent = data[total];

            guess.appendChild(h2)
            guess.appendChild(p)
        }
    )
}
numerology(descriptions)