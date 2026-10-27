// accordion

let accordion = document.getElementById('accordion');
		accordion.addEventListener('click', change);

		function change(event) {
			let targ = event.target;

			if (targ.tagName !== 'H6') return;

			if (targ.classList.contains('active')) {
				hideAll();
			} else {
				hideAll();
				targ.classList.add('active');
				showText(targ.nextElementSibling);
			}
		}

		function hideAll() {
			let h6El = accordion.querySelectorAll('h6');
			let divEl = accordion.querySelectorAll('div');

			for (let i = 0; i < h6El.length; i++) {
				h6El[i].classList.remove('active');
			}

			for (let i = 0; i < divEl.length; i++) {
				divEl[i].style.height = '0';
			}
		}

		function showText(textEl) {
			textEl.style.height = textEl.scrollHeight + 'px';
		}
