// window.onload = function () {
//     // short timeout
//     setTimeout(function () {
//         window.scrollTo(0, window.scrollY - 300);
//     }, 100);
// };

//carousel

$(document).on("click", "a.scroll-to", function (e) {
    e.preventDefault();
    $('body, html').animate({scrollTop: 900}, 800);
});
const paginationLabels = ['2003', '2004', '2008', '2009', '2010', '2012', '2015', '2020', '2021', '2022']
const ourStorySwiper = new Swiper('.our-story__slider', {
    direction: 'horizontal',
    centeredSlides: true,
    loop: true,
    effect: "fade",
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className, active) {
            return '<div class="swiper-pagination-item ' + className + '">' + "<span>" + (paginationLabels[index]) + "</span>" + "</div>";
        },
    },
    navigation: {
        nextEl: '.next-arrow',
        prevEl: '.prev-arrow',
    },
});
const productsBoxWithSlider = $('#productsBoxWithSlider')
const productsBoxWithoutSlider = $('#productsBoxWithoutSlider')
const initOurProductSwiper = function () {
    productsBoxWithoutSlider.addClass('d-none')
    productsBoxWithSlider.removeClass('d-none')
    new Swiper('.products__box.swiper', {
        direction: 'horizontal',
        centeredSlides: true,
        loop: true,
        breakpoints: {
            100: {
                slidesPerView: 2,
                spaceBetween: 70,
            }
        },
        navigation: {
            nextEl: '.next-arrow',
            prevEl: '.prev-arrow',
        },
    });
}
if (window.innerWidth < 1024) {
    initOurProductSwiper();
}

const swiper = new Swiper('.mainSlider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.next-arrow',
        prevEl: '.prev-arrow',
    },
});
const gallery = new Swiper('.gallery', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // Navigation arrows
    navigation: {
        nextEl: '.next-gallery',
        prevEl: '.prev-gallery',
    },
});

const blog = new Swiper('.blog-slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    spaceBetween: 30,
    slidesPerView: 1.4,
    slidesPerGroup: 1,
    centeredSlides: true,
    calculateHeight: true,
    loopFillGroupWithBlank: false,
    allowTouchMove: true,
    grabCursor: true,
    speed: 300,
    pagination: {
        el: '.blog-pagination',
        clickable: true,
    },
    // Navigation arrows
    navigation: {
        nextEl: '.blog-button-prev',
        prevEl: '.blog-button-next',
    },
    breakpoints: {
        768: {
            spaceBetween: 30,
        },
        426: {
            spaceBetween: 20,
        },
        320: {
            spaceBetween: 15,
        },
    }
});

const milk = new Swiper('.milk', {
    direction: 'horizontal',
    loop: false,
    centeredSlides: true,
    spaceBetween: 19,

    pagination: {
        el: '.milk_pagination',
        clickable: true,
    },
});
const barista = new Swiper('.barista', {
    direction: 'horizontal',
    loop: false,
    centeredSlides: true,
    spaceBetween: 19,

    pagination: {
        el: '.barista_pagination',
        clickable: true,
    },
});
const drink = new Swiper('.drink', {
    direction: 'horizontal',
    loop: false,
    centeredSlides: true,
    spaceBetween: 19,

    pagination: {
        el: '.drink_pagination',
        clickable: true,
    },
});
const spoon = new Swiper('.spoon', {
    direction: 'horizontal',
    loop: false,
    centeredSlides: true,
    spaceBetween: 19,

    pagination: {
        el: '.spoon_pagination',
        clickable: true,
    },
});
const vmestomoloka = new Swiper('.vmestomoloka', {
    direction: 'horizontal',
    loop: false,
    centeredSlides: true,
    spaceBetween: 19,

    pagination: {
        el: '.vmestomoloka_pagination',
        clickable: true,
    },
});
const pityevoyyogurt = new Swiper('.pityevoyyogurt', {
    direction: 'horizontal',
    loop: false,
    centeredSlides: true,
    spaceBetween: 19,

    pagination: {
        el: '.pityevoyyogurt_pagination',
        clickable: true,
    },
});
const lozhkoviyyogurt = new Swiper('.lozhkoviyyogurt', {
    direction: 'horizontal',
    loop: false,
    centeredSlides: true,
    spaceBetween: 19,

    pagination: {
        el: '.lozhkoviyyogurt_pagination',
        clickable: true,
    },
});
const kasha = new Swiper('.kasha', {
    direction: 'horizontal',
    loop: false,
    centeredSlides: true,
    spaceBetween: 19,

    pagination: {
        el: '.kasha_pagination',
        clickable: true,
    },
});
const porridge = new Swiper('.porridge', {
    direction: 'horizontal',
    loop: false,
    centeredSlides: true,
    spaceBetween: 19,

    pagination: {
        el: '.porridge_pagination',
        clickable: true,
    },
});
const dessert = new Swiper('.dessert', {
    direction: 'horizontal',
    loop: false,
    centeredSlides: true,
    spaceBetween: 19,

    pagination: {
        el: '.dessert_pagination',
        clickable: true,
    },
});

const recipes = new Swiper('.recipes-block', {
    direction: 'horizontal',
    loop: false,
    centeredSlides: true,
    spaceBetween: 20,

    pagination: {
        el: '.slider__pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.recipes-button-prev',
        prevEl: '.recipes-button-next',
    }
});

const recipes2 = new Swiper('.recipes-block2', {
    direction: 'horizontal',
    loop: false,
    centeredSlides: true,
    spaceBetween: 20,

    pagination: {
        el: '.slider__pagination2',
        clickable: true,
    },

    navigation: {
        nextEl: '.recipes-button-prev2',
        prevEl: '.recipes-button-next2',
    }
});

const cardSlider = new Swiper('.cardSlider', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,

    // If we need pagination
    pagination: {
        el: '.main-pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.next-arrow',
        prevEl: '.prev-arrow',
    }
});
const recipesSlider = new Swiper('.recipesSlider', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    centeredSlides: false,

    navigation: {
        nextEl: '.next-recipe',
        prevEl: '.prev-recipe',
    },
    // Responsive breakpoints
    breakpoints: {
        768: {
            slidesPerView: 4,
            centeredSlides: true,
        }
    }
})
const otherSLider = new Swiper('.otherSlider', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 21,
    pagination: {
        el: '.other-pagination',
        clickable: true,
    },
    // Responsive breakpoints
    breakpoints: {
        768: {
            slidesPerView: 4,
            spaceBetween: 0
        }
    }
})

let scroll = 0;
$(window).on("scroll", function () {
    scroll = window.pageYOffset || (document.documentElement.clientHeight ? document.documentElement.scrollTop : document.body.scrollTop);
    if (scroll > 10) {
        $('header').addClass("scroll-header");
    }
    if (scroll < 10) {
        $('header').removeClass("scroll-header");
    }
});

//header menu

let count = -1;
let count1 = -1;

$(".popupMenu").mouseover(function () {
    $('.itemPassive').addClass('itemActive')
    $(".headerWrapper").css("background", "#FFFFFF")
    if ($('.aboutPassive').hasClass('aboutActive')) {
        $('.aboutPassive').removeClass('aboutActive')
        $('.aboutPopup').addClass('closedAbout')
    }
})
$(".aboutMenu").mouseover(function () {
    $('.aboutPassive').addClass('aboutActive')
    $('.aboutPopup').removeClass('closedAbout')
    $(".headerWrapper").css("background", "#FFFFFF")
    if ($('.itemPassive').hasClass('itemActive')) {
        $('.itemPassive').removeClass('itemActive')
    }
})

$('main').mouseover(function () {
    if ($('.aboutPassive').hasClass('aboutActive')) {
        $('.aboutPassive').removeClass('aboutActive')
        $('.aboutPopup').addClass('closedAbout')
        // $(".headerWrapper").css("background", "transparent")
    }
    if ($('.itemPassive').hasClass('itemActive')) {
        $('.itemPassive').removeClass('itemActive')
        // $(".headerWrapper").css("background", "transparent")
    }
})

$('.itemEmpty').mouseover(function () {
    if ($('.itemPassive').hasClass('itemActive')) {
        $('.itemPassive').removeClass('itemActive')
        $("header").css("background", "transparent")
    }
    if ($('.aboutPassive').hasClass('aboutActive')) {
        $('.aboutPassive').removeClass('aboutActive')
        $('.aboutPopup').addClass('closedAbout')
        $(".headerWrapper").css("background", "transparent")
    }
})

$(".comp").on("click", function () {
    window.scrollTo(0, 0);
    $(".compound-mobile").css("display", "block")
})

$(".comp-close").on("click", function () {
    $(".compound-mobile").css("display", "none")
})

$(".search").on("click", function () {
    $(".searchPopup").toggleClass('active')
})

// let searchOpened = -1;
// $(".search").on("click", function () {
//     searchOpened *= -1;
//     if (searchOpened == -1) {
//         $(".searchPopup").css("display", "flex")
//     } else if (searchOpened == 1) {
//         $(".searchPopup").css("display", "none")
//     }
// })

// $(".itemLink").on("click", function () {
//     $(".maskPage").css("display", "flex")
// })
// $(".xclose").on("click", function () {
//     $(".maskPage").css("display", "none")
// })

$(".burger").on("click", function () {
    $(".mWrapper").css("display", "flex")
    $(".closeBurger").css("display", "block")
    $(".burger").css("display", "none")
})

$(".closeBurger").on("click", function () {
    $(".mWrapper").css("display", "none")
    $(".burger").css("display", "block")
    $(".closeBurger").css("display", "none")
})

let mobCounter = 1;
$(".mobMenuProducts").on("click", function () {
    mobCounter *= -1;
    if (mobCounter == 1) {
        $(".subItems").css("display", "flex")
        $(".mobMenuProducts").addClass("openedItem")
    } else if (mobCounter == -1) {
        $(".subItems").css("display", "none")
        $(".mobMenuProducts").removeClass("openedItem")
    }
})

let mobCounter1 = 1;
$(".mobAboutProducts").on("click", function () {
    mobCounter1 *= -1;
    if (mobCounter1 == 1) {
        $(".subAbout").css("display", "flex")
        $(".mobAboutProducts").addClass("openedItem")
    } else if (mobCounter1 == -1) {
        $(".subAbout").css("display", "none")
        $(".mobAboutProducts").removeClass("openedItem")
    }
})

//filter

$(".lineage").on("click", function () {
    if ($(this).hasClass('active')) {
        clearFilter();
    } else {
        $(".item").removeClass('active');
        $(".all-items").removeClass('active');
        $(this).addClass('active');
        let data = this.getAttribute('data-attribute');
        $(".contentItem").show();
        $(".contentBlock").hide();
        $("." + data).show();
    }
})

$(".flavour").on("click", function () {
    if ($(this).hasClass('active')) {
        clearFilter();
    } else {
        $(".item").removeClass('active');
        $(this).addClass('active');
        let data = this.getAttribute('data-attribute');
        $(".contentBlock").show();
        $(".contentItem").hide();
        $("." + data).show();
        hideShit(data);
    }
})

function hideShit(data) {
    let arr = document.querySelectorAll(".contentBlock");
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].children[1].children.length; j++) {
            if (arr[i].children[1].children[j].classList[1] === data) {
                count++;
            }
        }
        if (count === 0) {
            arr[i].style.display = "none"
        } else {
            count = 0;
        }
    }
}

function clearFilter() {
    $(".item").removeClass('active');
    $(".all-items").addClass('active');
    $(".contentBlock").show();
    $(".contentItem").show();
}

$(".all-items").on("click", function () {
    $(".item").removeClass('active');
    $(this).addClass('active');
    $(".contentBlock").show();
    $(".contentItem").show();
})

//mob filter

$('#line').change(function () {
    let data = $(this).val();
    $(".slider").hide();
    $("." + data).show();
    clearFlavour();
    if (data == 'all-items') {
        $(".slider").show();
    }
})

$('#flavour').change(function () {
    let data = $(this).val();
    $(".slider").show().css("margin-bottom", 80);
    $(".swiper-slide").hide();
    $(".sliderTitle").hide();
    $("." + data).show();
    clearLine();
    if (data == 'all-flavours') {
        $(".slider").css("margin-bottom", 80);
        $(".swiper-slide").show();
    }
    if (data == 'multigrain') {
        $(".slider").show().css("margin-bottom", 0);
        $(".swiper-slide").hide();
        $(".sliderTitle").hide();
        $("." + data).show();
    }
    if (data == 'coconut') {
        $(".slider").show().css("margin-bottom", 0);
        $(".swiper-slide").hide();
        $(".sliderTitle").hide();
        $("." + data).show();
    }
})

function clearLine() {
    $("#line option").prop('selected', function () {
        return this.defaultSelected;
    });
}

function clearFlavour() {
    $("#flavour option").prop('selected', function () {
        return this.defaultSelected;
    });
}

function swipeSlide() {
    let anchor = String(document.location.href).split('?');
    let index = anchor[1];
    if (parseInt(anchor[1])) {
        cardSlider.slideTo(index, 1000, false)
    }
}

swipeSlide();

let clickFilter = () => {
    let data = String(document.location.href).split('#');
    if (data[1]) {
        $("." + data[1]).click();
    }
}

clickFilter();

const headerSearchInpt = document.querySelector('.header-search-inpt');

$('.header-search-btn').on('click', function (e) {
    if (headerSearchInpt.value === '') {
        return;
    }
    window.location.href = '/search/?search=' + headerSearchInpt.value;
})

if (headerSearchInpt) {
    headerSearchInpt.addEventListener('keydown', function (e) {
        if (e.keyCode === 13 || e.key === 'Enter') {
            window.location.href = '/search/?search=' + headerSearchInpt.value;
            // searchAjax(searchInput.value);
        }
    })
}

const telegramModalClose = document.querySelector('.footer__popup .footer__close')
if(telegramModalClose) {
    telegramModalClose.addEventListener('click', ()=> {
        telegramModalClose.closest('.footer__popup').classList.add('footer__popup__close')
    })
}