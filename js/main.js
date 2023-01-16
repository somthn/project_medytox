/* header  */

// 1150px 이상일 때
function headerToggle() {
  let header = document.querySelector('#header');
  let menu = document.querySelector('#menu');
  let mainmenuList = document.querySelectorAll('#menu > li');
  let submenu = document.querySelectorAll('#submenu');
  let headerHeight = header.offsetHeight;
  let submenuHeight = 0;
  let headerHI = 79;

  for (let i = 0; i < submenu.length; i++) {
    if (submenu[i].offsetHeight > submenuHeight) {
      submenuHeight = submenu[i].offsetHeight;
    }
  }

  for (let i = 0; i < mainmenuList.length; i++) {
    mainmenuList[i].addEventListener('mouseover', function () {
      header.style.height = headerHeight + submenuHeight + 'px';
    });
    mainmenuList[i].addEventListener('mouseout', function () {
      header.style.height = headerHI + 'px';
    });
  }

}

// 1150px 이하일 때 전체메뉴, 서브메뉴 함수
$.Accordion = function () {

  const allmenu = $(".allmenu");

  allmenu.on("click", function () {

    const headerAco = $("#header");
    let headerAcoHeight = $("#header").outerHeight();
    console.log(headerAco);
    console.log(headerAcoHeight);

    if (headerAcoHeight <= 80) {
      headerAco.css("height", "100%");
    } else {
      headerAco.css("height", 79);
    }

  });

}

function AccordionSub() {
  let acc = document.getElementsByClassName("subMenu");
  let accor = document.querySelectorAll("#menu>li>a")

  for (let i = 0; i < acc.length; i++) {
    accor[i].addEventListener("click", function () {
      this.classList.toggle("active");

      let panel = this.nextElementSibling;

      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }
}


if (window.innerWidth <= 1150) {
  $.Accordion();
  AccordionSub();
  //$.AccordionSub();
} else {
  headerToggle();
}


/* 해상도 조절 시 이벤트 실행 (resize) */
/*
  resize가 화면 조절 시 실시간으로 계속 실행되는 것을 막기 위해
  화면조절 후 실행될 수 있도록 시간차를 둔다.
*/
let delay = 300;
let timer = null;

$(window).on('resize', function () {
  clearTimeout(timer);
  timer = setTimeout(function () {
    if (window.innerWidth <= 1150) {
      $.Accordion();
      //$.AccordionSub();
      window.location.reload()
    } else {
      headerToggle();
      window.location.reload()
    }
  }, delay);
});


/* section 1 슬라이드 */
const slide = new Swiper('#my-swiper', {
  slidesPerView: '1', // 한 슬라이드에 보여줄 갯수
  spaceBetween: 0, // 슬라이드 사이 여백
  loop: false, // 슬라이드 반복 여부
  loopAdditionalSlides: 1, // 슬라이드 반복 시 마지막 슬라이드에서 다음 슬라이드가 보여지지 않는 현상 수정
  pagination: true, // pager 여부
  autoplay: {  // 자동 슬라이드 설정 , 비 활성화 시 false
    delay: 5000,   // 시간 설정
    disableOnInteraction: false,  // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
  },
  navigation: {   // 버튼 사용자 지정
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: { //반응형 조건 속성
    640: { //640 이상일 경우
      slidesPerView: 1, //레이아웃 2열
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 1,
    }
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  }
});


/* section 2 탭메뉴*/
/* 
  1. tab_contents 안의 div들을 모두 안보이게 접는다.

  2. 링크를 클릭하면, 클릭한 요소의 href 속성의 값을 변수 tabTarget에 저장
     저장된 값에서 #을 삭제한다.
     tabTarget = tabs1
     document.getElementById(tabs-1).style.display='block';
*/

/* preventDefault() 
  - 어떤 이벤트를 명시적으로 처리하지 않은 경우, 
    해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지않도록 지정한다.
  1. a태그를 눌렀을 때에도 href 링크로 이동하지 않게 할 경우.
  2. form 안에 submit 역할을 하는 버튼을 눌렀어도 새로 실행하지 않게 하고싶을 경우. 
    (submit은 작동됨)
*/
//let orgTarget = '#tabs1'; // a.replace('b','c') a변수안의 문자 b를 c로 바꾼다.

function tabMenu() {

  let targetLink = document.querySelectorAll('.tabmenu a');
  let tabContent = document.querySelectorAll('#tab_contents > div');

  for (let i = 0; i < targetLink.length; i++) {
    //어떤 요소를 클릭했는지 알려면 그 클릭한 요소를 들고 와야함. => e를 매개변수로 둔다
    targetLink[i].addEventListener('click', function (e) {
      e.preventDefault(); //링크의 기본 속성 막기

      let orgTarget = e.target.getAttribute('href'); //orgTarget에 클릭한것이 담긴다
      let tabTarget = orgTarget.replace('#', '');

      for (let x = 0; x < tabContent.length; x++) {
        tabContent[x].style.display = 'none';
      }

      document.getElementById(tabTarget).style.display = 'block';

      for (let j = 0; j < targetLink.length; j++) {
        targetLink[j].classList.remove('active');
        e.target.classList.add('active');
      }
    })
  }
  //document.getElementById('tabs1').style.display = 'block';
}
document.getElementById('tabs1').style.display = 'block';

tabMenu();

/* section3 이미지 */
/*
  Proper Parallax
*/
function getTop(elem) {
  let box = elem.getBoundingClientRect();
  let body = document.body;
  let docEl = document.documentElement;
  let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  let clientTop = docEl.clientTop || body.clientTop || 0;
  let top = box.top + scrollTop - clientTop;
  return Math.round(top);
}
function parallaxImages() {
  // Set the scroll for each parallax individually
  let plx = document.getElementsByClassName('parallax');
  for (i = 0; i < plx.length; i++) {
    let height = plx[i].clientHeight;
    let img = plx[i].getAttribute('data-plx-img');
    let plxImg = document.createElement("div");
    plxImg.className += " plx-img";
    plxImg.style.height = (height + (height / 2)) + 'px';
    plxImg.style.backgroundImage = 'url(' + img + ')';
    plx[i].insertBefore(plxImg, plx[i].firstChild);
  }
}
window.addEventListener('load', parallaxImages);
function plxScroll() {
  let scrolled = window.scrollY;
  let win_height_padded = window.innerHeight * 1.25;
  // Set the scroll for each parallax individually
  let plx = document.getElementsByClassName('parallax');
  for (i = 0; i < plx.length; i++) {
    let offsetTop = plx[i].getBoundingClientRect().top + scrolled;
    //let orientation = plx[i].getAttribute('data-plx-o');
    if (scrolled + win_height_padded >= offsetTop) {
      let plxImg = plx[i].getElementsByClassName('plx-img')[0];
      if (plxImg) {
        let plxImgHeight = plxImg.clientHeight;
        let singleScroll = (scrolled - offsetTop) - plxImgHeight / 5;
        plxImg.style.top = (singleScroll / 5) + "px";
      }
    }
  }
}
window.addEventListener('load', plxScroll);
window.addEventListener('resize', plxScroll);
window.addEventListener('scroll', plxScroll);


/* section 5 슬라이드*/
const showingClass = 'showing';
const firstSlide = document.querySelector(".product_cont:first-child");

function productSlide() {

  const currentSlide = document.querySelector(`.${showingClass}`);

  if (currentSlide) {
    currentSlide.classList.remove(showingClass);
    const nextSlide = currentSlide.nextElementSibling;
    if (nextSlide) {
      nextSlide.classList.add(showingClass);
    } else {
      firstSlide.classList.add(showingClass);
    }
  } else {
    firstSlide.classList.add(showingClass);
  }
}
setInterval(productSlide, 4000);