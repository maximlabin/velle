(function () {
    document.addEventListener('DOMContentLoaded', function () {
        function reviewSlider() {
            const reviewSwiper = new Swiper('.review-slider .swiper', {
                direction: "horizontal",
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.review-next',
                    prevEl: '.review-prew',
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                },
                breakpoints: {
                    // when window width is >= 575px
                    576: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    // when window width is >= 480px
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    // when window width is >= 640px
                    1290: {
                        slidesPerView: 4,
                        spaceBetween: 52
                    }
                }
            });
        }

        reviewSlider();

        const reviewCards = document.querySelectorAll('.review-card')
        reviewCards.forEach((reviewCard) => {
            const reviewShowMore = reviewCard.querySelector('.review_show-more');
            const reviewBody = reviewCard.querySelector('.review-body p');
            const reviewHideBody = reviewCard.querySelector('.review-body.hide-body');
            const bodyHeight = reviewBody.offsetHeight;
            const bodyLineHeight = reviewBody.scrollHeight;
            if (bodyLineHeight - bodyHeight < 10) {
                reviewShowMore.style.display = "none";
            }
        })

        const reviewsShowMore = document.querySelectorAll('.review_show-more');
        reviewsShowMore.forEach((reviewShowMore) => {
            reviewShowMore.addEventListener('click', () => {
                const reviewCard = reviewShowMore.closest('.review-card');
                if (reviewCard.classList.contains('review-card--show')) {
                    reviewCard.classList.remove('review-card--show');
                    reviewShowMore.innerHTML = 'Читать полностью';
                    return;
                }
                reviewCard.classList.add('review-card--show');
                reviewShowMore.innerHTML = 'Свернуть';
            })
        })
    })
})()