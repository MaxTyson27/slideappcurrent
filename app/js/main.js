$(function () {
  const menu = $('.menu')
  const burger = $('.burger')


  $(document).mousemove(function(e) {
		const x = (e.pageX * 1 / 50), y = (e.pageY * -1 / 50);
		$('.burning__figures').css('margin', x + 'px ' + y + 'px');
  });
  $('.team__inner').slick({
    dots: false,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: '<button type="button" class="slick-next"><img src="images/team/arrow.png", alt="arrow next"></button>',
    prevArrow: '<button type="button" class="slick-prev"><img src="images/team/arrow-prev.png", alt="arrow prev"></button>',
    responsive: [
      {
        breakpoint: 1219,
        settings: {
          slidesToShow: 1
        }
      },
    ]
  })

  $(".menu a, .header__button, .menu__button--sm").on("click", function (event) {
    event.preventDefault();
    
    $('body').css('overflow','visible')
    menu.removeClass('active')
    burger.removeClass('active')

		const id  = $(this).attr('href'),
			top = $(id).offset().top - $('.header__inner').outerHeight();
    $('body,html').animate({scrollTop: top}, 1500);
    
    
  });

  
  
  new WOW().init()
    
  const menuState = () => {

    burger.on('click', function (e) {

      if(menu.hasClass('active')){
        menu.removeClass('active')
        burger.removeClass('active')
        $('body').css('overflow','visible')
      } else {
        menu.addClass('active')
        burger.addClass('active')
        $('body').css('overflow','hidden')
      }
    
    })

  }
  

  menuState()
  


});



(()=> {

  const backers = document.getElementById('backers')
  const inner = document.querySelector('.backers__inner')
  const items = [...document.querySelectorAll('.backers__item')]
  let count = 500
  // let countWidth = items.reduce((width, item) => width + item.offsetWidth, (items.length - 1) * 20)
  let countWidth = 5000

  
  inner.style.width = countWidth + 'px'
  inner.style.transform = `translateX(${count}px)`

  function scrollHorizontally(e) {
        e = window.event || e;
        // var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        // backers.scrollLeft -= (delta*40); // Multiplied by 10
        if(e.deltaY > 0){
          if(count <= -2230){
            return
          } else {
            count -= 50
          }
        } else {
          if(count >= 500) {
            return
          } else {
            count += 50
          }
          
        }
        
        inner.style.transform = `translateX(${count}px)`
        e.preventDefault();
  }

  if (backers.addEventListener) {
        // IE9, Chrome, Safari, Opera
    backers.addEventListener("mousewheel", scrollHorizontally, false);
        // Firefox
    backers.addEventListener("DOMMouseScroll", scrollHorizontally, false);
  } else {
        // IE 6/7/8
    backers.attachEvent("onmousewheel", scrollHorizontally);
  }
})()


const animateRoadMapSection = () => {
  const items = [...document.querySelectorAll('.roadmap__item')]
  let count = 0
  

  const setAnimationFrames = (element, addClassName, t) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        element.classList.add(addClassName)
        resolve('123')
      }, t);
    })
  }

  const intervalAnimation = () => { 

    const interval = setInterval(() => {
     
      const circle = items[count].querySelector('.roadmap__item-circle'),
      line = items[count].querySelector('.roadmap__item-line'),
      text = items[count].querySelector('.roadmap__item-list');
          
      setAnimationFrames(circle, 'animate', 500).then(res => {
        return setAnimationFrames(text, 'animate', 400).then(res => {
          return setAnimationFrames(line, 'animate', 0)
        })
      })

      count++
      
      if(count === 4){
        clearInterval(interval)
      } 

    }, 600);

    

    
  }

  const animateOnScroll = () => {

    const offset = (el) => {
      const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }

    const section = document.querySelector('.roadmap'),
    animateSectionHeight = section.offsetHeight,
    animateSectionOffset = offset(section).top,
    animStart = 3;

  

    let animItemPoint = window.innerHeight - animateSectionHeight / animStart;

    if(animateSectionHeight > window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight;
    }

    if((pageYOffset > animateSectionOffset - animItemPoint) && pageYOffset < (animateSectionOffset + animateSectionHeight )) {
      intervalAnimation()
      removeEventListener('scroll', animateOnScroll)
    }
    
    
  }
  
  window.addEventListener('scroll', animateOnScroll)
  
}

animateRoadMapSection()

// const scrollSlides = () => {
//   const wrapper = document.querySelector('.backers__inner')
//   const body = document.querySelector('body')

//   const onWheel = (e) => {
//     console.log(e.target)
//     if(e.target.classList.contains('stop')){
//       body.style.overflow = 'hidden'
//     } else {
//       body.style.overflow = 'visible'
//     }
    
//   }

//   wrapper.addEventListener('wheel', onWheel)
// }


// scrollSlides()

