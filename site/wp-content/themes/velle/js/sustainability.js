$(".sustainability-popup").on("click", function () {
    $(".sustainability-mask").css("display", "flex")
})

$(".xclose").on("click", function () {
    $(".sustainability-mask").css("display", "none")
})

const infoSwiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  watchOverflow: true,

  navigation: {
    nextEl: '.next-arrow',
    prevEl: '.prev-arrow',
  },

  on: {
    slideChange: function () {
      let arrowPrev = document.querySelector('.prev-arrow');

      if (this.realIndex == "0"){
        arrowPrev.style.display = 'none';
      } else {
        arrowPrev.style.display = 'flex';
      }
    },
  },
})

let sertification = document.getElementById('sertification');
		sertification.addEventListener('click', change);

		function change(event) {
			let targ = event.target;

			if (targ.tagName !== 'H3') return;

			if (targ.classList.contains('active')) {
				hideTab();
			} else {
				hideTab();
				targ.classList.add('active');
				showText(targ.nextElementSibling);
			}
		}

		function hideTab() {
			let h3El = sertification.querySelectorAll('h3');
			let divEl = sertification.querySelectorAll('div');

			for (let i = 0; i < h3El.length; i++) {
				h3El[i].classList.remove('active');
			}

			for (let i = 0; i < divEl.length; i++) {
				divEl[i].style.height = '0';
			}
		}

		function showText(textEl) {
			textEl.style.height = textEl.scrollHeight + 'px';
		}
