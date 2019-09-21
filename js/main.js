// Переход по якорях

$(document).ready(function(){
  $("#menu").on("click","a", function (event) {
    //отменяем стандартную обработку нажатия по ссылке
    event.preventDefault();

    //забираем идентификатор бока с атрибута href
    var id  = $(this).attr('href'),

    //узнаем высоту от начала страницы до блока на который ссылается якорь
     top = $(id).offset().top;
    //анимируем переход на расстояние - top за 1500 мс
    $('body,html').animate({scrollTop: top}, 1500);
  });
});

// Добавление класа при скроле

$(window).scroll(function() {
var height = $(window).scrollTop();

var block_position = $('#about').offset().top;
 /*Если сделали скролл на 100px задаём новый класс для header*/
if(height > block_position){
$('header').addClass('header-grey', 1000);
} else{
/*Если меньше 100px удаляем класс для header*/
$('header').removeClass('header-grey', 1000);
}
});

// Counter

var waypoint_award = new Waypoint({
  element: document.getElementById('timer_award'),
  handler: function() {
    $('#timer_award').countTo({
    from: 0, 
    to: 103,
    refreshInterval: 1
  })
  },
  offset: 1000
});

var waypoint_client = new Waypoint({
  element: document.getElementById('timer_client'),
  handler: function() {
    $('#timer_client').countTo({
    from: 0, 
    to: 256,
    refreshInterval: 1
  })
  },
  offset: 1000
});

var waypoint_project = new Waypoint({
  element: document.getElementById('timer_project'),
  handler: function() {
    $('#timer_project').countTo({
    from: 0, 
    to: 148,
    refreshInterval: 1
  })
  },
  offset: 1000
});

var waypoint_team = new Waypoint({
  element: document.getElementById('timer_team'),
  handler: function() {
    $('#timer_team').countTo({
    from: 0, 
    to: 23,
    refreshInterval: 1
  })
  },
  offset: 1000
});

// owlCarousel

$(document).ready(function(){
  $(".team-carousel").owlCarousel({
    loop:true, //Зацикливаем слайдер
    margin:10, //Отступ от картино если выводите больше 1
    nav:false, //Отключил навигацию
    autoplay:true, //Автозапуск слайдера
    smartSpeed:1400, //Время движения слайда
    autoplayTimeout:3000, //Время смены слайда
    autoplayHoverPause: true, //Пауза при наведении
    responsive:{ //Адаптация в зависимости от разрешения экрана
    0:{
        items:2
    },
    600:{
        items:3
    },
    1000:{
        items:4
      }}
    });

  $(".content-carousel").owlCarousel({
   items:1,
   autoplay:false,
   loop:true,
   nav:true

  });

  $(".testimonial-carousel").owlCarousel({ 
    items:1,
    autoplay:true,
    loop:true,
    nav: false
    // navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
    // navClass:["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
   });

  $(".pricing-carousel").owlCarousel({
    margin:80, //Отступ от картино если выводите больше 1
    autoplay:true, //Автозапуск слайдера
    smartSpeed:1500, //Время движения слайда
    autoplayTimeout:2000, //Время смены слайда
    nav:false,
    autoplayHoverPause: true, //Пауза при наведении
    responsive:{ //Адаптация в зависимости от разрешения экрана
    480:{
        items:2
    },
    768:{
        items:3
    },
    1024:{
        items:6
      }}
    });

});




// Skills Bars
$('.skill-percent').each(function(){
  $(this).animate({
    width:$(this).attr('data-percent')},"fast");
});


// Accordion 
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("activee");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

// WOW 
new WOW().init();

// magnofoc-popup

$(document).ready(function() {
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });
});

// Shuffle

var Shuffle = window.Shuffle;

class Demo {
  constructor(element) {
    this.element = element;
    this.shuffle = new Shuffle(element, {
      itemSelector: '.picture-item',
      sizer: element.querySelector('.my-sizer-element'),
    });

    // Log events.
    this.addShuffleEventListeners();
    this._activeFilters = [];
    this.addFilterButtons();
    this.addSorting();
    this.addSearchFilter();
  }

  /**
   * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
   * for them like you normally would (with jQuery for example).
   */
  addShuffleEventListeners() {
    this.shuffle.on(Shuffle.EventType.LAYOUT, (data) => {
      console.log('layout. data:', data);
    });
    this.shuffle.on(Shuffle.EventType.REMOVED, (data) => {
      console.log('removed. data:', data);
    });
  }

  addFilterButtons() {
    const options = document.querySelector('.filter-options');
    if (!options) {
      return;
    }
    
    const filterButtons = Array.from(options.children);
    const onClick = this._handleFilterClick.bind(this);
    filterButtons.forEach((button) => {
      button.addEventListener('click', onClick, false);
    });
  }

  _handleFilterClick(evt) {
    const btn = evt.currentTarget;
    const isActive = btn.classList.contains('active');
    const btnGroup = btn.getAttribute('data-group');
    
    this._removeActiveClassFromChildren(btn.parentNode);
    
    let filterGroup;
    if (isActive) {
      btn.classList.remove('active');
      filterGroup = Shuffle.ALL_ITEMS;
    } else {
      btn.classList.add('active');
      filterGroup = btnGroup;
    }
    
    this.shuffle.filter(filterGroup);
  }

  _removeActiveClassFromChildren(parent) {
    const { children } = parent;
    for (let i = children.length - 1; i >= 0; i--) {
      children[i].classList.remove('active');
    }
  }

  addSorting() {
    const buttonGroup = document.querySelector('.sort-options');
    if (!buttonGroup) {
      return;
    }
    buttonGroup.addEventListener('change', this._handleSortChange.bind(this));
  }

  _handleSortChange(evt) {
    // Add and remove `active` class from buttons.
    const buttons = Array.from(evt.currentTarget.children);
    buttons.forEach((button) => {
      if (button.querySelector('input').value === evt.target.value) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    
    // Create the sort options to give to Shuffle.
    const { value } = evt.target;
    let options = {};
    
    function sortByDate(element) {
      return element.getAttribute('data-created');
    }
    
    function sortByTitle(element) {
      return element.getAttribute('data-title').toLowerCase();
    }
    
    if (value === 'date-created') {
      options = {
        reverse: true,
        by: sortByDate,
      };
    } else if (value === 'title') {
      options = {
        by: sortByTitle,
      };
    }
    this.shuffle.sort(options);
  }

  // Advanced filtering
  addSearchFilter() {
    const searchInput = document.querySelector('.js-shuffle-search');
    if (!searchInput) {
      return;
    }
    searchInput.addEventListener('keyup', this._handleSearchKeyup.bind(this));
  }

  /**
   * Filter the shuffle instance by items with a title that matches the search input.
   * @param {Event} evt Event object.
   */
  _handleSearchKeyup(evt) {
    const searchText = evt.target.value.toLowerCase();
    this.shuffle.filter((element, shuffle) => {
      // If there is a current filter applied, ignore elements that don't match it.
      if (shuffle.group !== Shuffle.ALL_ITEMS) {
        // Get the item's groups.
        const groups = JSON.parse(element.getAttribute('data-groups'));
        const isElementInCurrentGroup = groups.indexOf(shuffle.group) !== -1;
        // Only search elements in the current group
        if (!isElementInCurrentGroup) {
          return false;
        }
      }
      const titleElement = element.querySelector('.picture-item__title');
      const titleText = titleElement.textContent.toLowerCase().trim();
      return titleText.indexOf(searchText) !== -1;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.demo = new Demo(document.getElementById('grid'));
});

