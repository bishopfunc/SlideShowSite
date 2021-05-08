'use strict'
{

  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
  ];

let currentIndex = 0;

const mainImage = document.getElementById('main');
mainImage.src = images[currentIndex];

images.forEach((image,index) =>{
  const img = document.createElement('img');
  img.src = image;

  const li = document.createElement('li');
  li.appendChild(img);

  if (index === currentIndex){
    li.classList.add('current');//thumbnails li.current:とcssで書いたから
  };
  
  li.addEventListener('click',()=>{
    mainImage.src = image;//ここでimg.srcが役に立つ
    const thumbnails = document.querySelectorAll('.thumbnails > li');//子結合子
    thumbnails[currentIndex].classList.remove('current');
    // li[currentIndex].classList.remove('current');はダメ？
    currentIndex = index;
    thumbnails[currentIndex].classList.add('current');
    // li[currentIndex].classList.add('current');はダメ？
    // console.log(li.classList);
    // console.log(thumbnails[currentIndex].classList);
  });

  
  const thumbnails= document.querySelector('.thumbnails');//document.はconst
  thumbnails.appendChild(li);
});//forEachに含まれる

const next = document.getElementById('next');
next.addEventListener('click', ()=>{
  let target = currentIndex + 1;
  if (target === images.length){
    target = 0;
  };
  const thumbnails = document.querySelectorAll('.thumbnails > li');
  thumbnails[target].click();
  //addEventListenerで定義された関数が、click()として引き渡される nextのclick()
  // document.querySelectorAll('.thumbnails > li')[target].click();
});

const prev = document.getElementById('prev');
prev.addEventListener('click', ()=>{
  let target = currentIndex - 1;
  if (target < 0){
    target = images.length - 1;
  };
  const thumbnails = document.querySelectorAll('.thumbnails > li');
  thumbnails[target].click();//prevのclick()
});

let timeId;
function playSlideShow(){
  timeId = setTimeout(() => {
    next.click();
    playSlideShow();
  }, 1000);
}

let isPlaying = false;

const play = document.getElementById('play');
play.addEventListener('click', ()=>{
  if (isPlaying === false){
    playSlideShow();
    play.textContent = 'Pause';
  }else {
    clearTimeout(timeId);
    play.textContent = 'Play';  
  }
  isPlaying =! isPlaying;
  
});


}
