
const slidesData = [
    {
      image: "https://picsum.photos/id/25/800/400",
      title: "Slide 1",
    },
    {
      image: "https://picsum.photos/id/27/800/400",
      title: "Slide 2",
    },
    {
      image: "https://picsum.photos/id/28/800/400",
      title: "Slide 3",
    },
    {
      image: "https://picsum.photos/id/29/800/400",
      title: "Slide 4",
    },
  ];
const slideData = document.querySelector('.slides')
const dot_container = document.querySelector('.dots-container')
const prev = document.querySelector('.prev_button')
const next = document.querySelector('.next_button')
let currentIndex = 0

function buildSlide(data) {
    data.forEach(item => {
      const slide = document.createElement('div')
      slide.setAttribute('class', 'slide')

      const img = document.createElement('img')
      img.setAttribute('src', item.image)
      const title = document.createElement('h2');
      title.textContent = item.title
      
      slide.appendChild(img)
      slide.appendChild(title)
      slideData.appendChild(slide);
    })
}

function buildDots() {
  slidesData.forEach((_, index) => {
    const dot = document.createElement('span')
    dot.setAttribute('class', 'dot')
    dot.dataset.index = index
    dot.addEventListener('click', ()=> {
      gotoSlide(index)
    })
    dot_container.appendChild(dot)
  })
}
function updateSlide() {
  const slides = document.querySelectorAll('.slide')
  const dots = document.querySelectorAll('.dot')
  slides.forEach(slide => slide.style.display = 'none');
  dots.forEach(dot => dot.classList.remove('dot_active'));
      
  slides[currentIndex].style.display = 'block';
  dots[currentIndex].classList.add('dot_active');
}
function gotoSlide(index) {
  currentIndex = index
  updateSlide()
}
function prevSlide() {
  currentIndex = (currentIndex-1+slidesData.length)%slidesData.length
  updateSlide()
}
function nextSlide() {
  currentIndex = (currentIndex+1)%slidesData.length
  updateSlide()
}
let slideInterval = setInterval(nextSlide, 3000);
prev.addEventListener('click', () => {
  clearInterval(slideInterval);
  prevSlide();
  slideInterval = setInterval(nextSlide, 3000);
});

next.addEventListener('click', () => {
  clearInterval(slideInterval);
  nextSlide();
  slideInterval = setInterval(nextSlide, 3000); 
});

buildSlide(slidesData)
buildDots()
updateSlide()