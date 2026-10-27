"use client";

// Port of the theme's jQuery scripts (main.js, review-slider.js, accordion.js, sustainability.js,
// feedbackPopup.js). They work on the server-rendered markup, with the same selectors and Swiper options.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Swiper from "swiper";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import type { SwiperOptions } from "swiper/types";

const MODULES = [Navigation, Pagination, EffectFade];
const YEARS = ["2003", "2004", "2008", "2009", "2010", "2012", "2015", "2020", "2021", "2022"];

// [selector, options] from main.js and review-slider.js; elements missing on a page are skipped.
const SLIDERS: [string, SwiperOptions][] = [
  [".our-story__slider", {
    centeredSlides: true, loop: true, effect: "fade",
    pagination: {
      el: ".swiper-pagination", clickable: true,
      renderBullet: (i, cls) => `<div class="swiper-pagination-item ${cls}"><span>${YEARS[i]}</span></div>`,
    },
    navigation: { nextEl: ".next-arrow", prevEl: ".prev-arrow" },
  }],
  [".mainSlider", { loop: true, pagination: { el: ".swiper-pagination", clickable: true }, navigation: { nextEl: ".next-arrow", prevEl: ".prev-arrow" } }],
  [".gallery", { loop: true, navigation: { nextEl: ".next-gallery", prevEl: ".prev-gallery" } }],
  [".recipes-block", { centeredSlides: true, spaceBetween: 20, pagination: { el: ".slider__pagination", clickable: true }, navigation: { nextEl: ".recipes-button-prev", prevEl: ".recipes-button-next" } }],
  [".recipes-block2", { centeredSlides: true, spaceBetween: 20, pagination: { el: ".slider__pagination2", clickable: true }, navigation: { nextEl: ".recipes-button-prev2", prevEl: ".recipes-button-next2" } }],
  [".cardSlider", { pagination: { el: ".main-pagination", clickable: true }, navigation: { nextEl: ".next-arrow", prevEl: ".prev-arrow" } }],
  [".recipesSlider", { loop: true, slidesPerView: 1, navigation: { nextEl: ".next-recipe", prevEl: ".prev-recipe" }, breakpoints: { 768: { slidesPerView: 4, centeredSlides: true } } }],
  [".otherSlider", { loop: true, slidesPerView: 1, spaceBetween: 21, pagination: { el: ".other-pagination", clickable: true }, breakpoints: { 768: { slidesPerView: 4, spaceBetween: 0 } } }],
  [".review-slider .swiper", {
    slidesPerView: 1, spaceBetween: 20,
    navigation: { nextEl: ".review-next", prevEl: ".review-prew" },
    pagination: { el: ".swiper-pagination", type: "bullets" },
    breakpoints: { 576: { slidesPerView: 2, spaceBetween: 20 }, 992: { slidesPerView: 3, spaceBetween: 30 }, 1290: { slidesPerView: 4, spaceBetween: 52 } },
  }],
];

function initSliders(): Swiper[] {
  const made: Swiper[] = [];
  for (const [selector, options] of SLIDERS) {
    const el = document.querySelector<HTMLElement>(selector);
    if (el) made.push(new Swiper(el, { modules: MODULES, ...options }));
  }
  // about-company: the products row becomes a slider on narrow screens.
  const withSlider = document.querySelector<HTMLElement>("#productsBoxWithSlider");
  if (withSlider && window.innerWidth < 1024) {
    document.querySelector("#productsBoxWithoutSlider")?.classList.add("d-none");
    withSlider.classList.remove("d-none");
    made.push(new Swiper(withSlider, {
      modules: MODULES, centeredSlides: true, loop: true,
      breakpoints: { 100: { slidesPerView: 2, spaceBetween: 70 } },
      navigation: { nextEl: ".next-arrow", prevEl: ".prev-arrow" },
    }));
  }
  // sustainability: a generic ".swiper" whose "back" arrow hides on the first slide.
  const info = document.querySelector<HTMLElement>(".sustainability-content .swiper");
  if (info) {
    made.push(new Swiper(info, {
      modules: MODULES, loop: true, watchOverflow: true,
      navigation: { nextEl: ".next-arrow", prevEl: ".prev-arrow" },
      on: {
        slideChange(s) {
          const prev = document.querySelector<HTMLElement>(".prev-arrow");
          if (prev) prev.style.display = s.realIndex === 0 ? "none" : "flex";
        },
      },
    }));
  }
  // Product page: /products/x/?2 opens on the third slide.
  const card = made.find((s) => s.el.classList.contains("cardSlider"));
  const index = parseInt(window.location.search.slice(1), 10);
  if (card && index) card.slideTo(index, 1000, false);
  return made;
}

function initReviews() {
  document.querySelectorAll<HTMLElement>(".review-card").forEach((card) => {
    const more = card.querySelector<HTMLElement>(".review_show-more");
    const body = card.querySelector<HTMLElement>(".review-body p");
    if (!more || !body) return;
    if (body.scrollHeight - body.offsetHeight < 10) more.style.display = "none";
    more.onclick = () => {
      const open = card.classList.toggle("review-card--show");
      more.innerHTML = open ? "Свернуть" : "Читать полностью";
    };
  });
}

// video-recipes.js: the custom player inside a recipe's body.
function initVideo() {
  const block = document.getElementById("video-block");
  const video = block?.querySelector<HTMLVideoElement>(".video");
  const progress = block?.querySelector<HTMLInputElement>(".progress");
  if (!block || !video || !progress) return;
  const paint = () => {
    const min = +progress.min, max = +progress.max;
    progress.style.backgroundSize = ((+progress.value - min) * 100) / (max - min) + "% 100%";
  };
  const icons = block.querySelectorAll<SVGElement>(".volume_svg");
  const line = block.querySelector<SVGElement>(".svg_line");
  block.querySelector(".play_btn")?.addEventListener("click", () => video.paused && video.play());
  block.querySelector(".pause_btn")?.addEventListener("click", () => !video.paused && video.pause());
  video.addEventListener("click", () => (video.paused ? video.play() : video.pause()));
  video.addEventListener("timeupdate", () => {
    if (video.duration) progress.value = String((video.currentTime / video.duration) * 100);
    paint();
  });
  progress.addEventListener("change", () => (video.currentTime = (+progress.value * video.duration) / 100));
  progress.addEventListener("input", paint);
  block.querySelector(".volume")?.addEventListener("click", () => {
    video.muted = !video.muted;
    const color = video.muted ? "#7C7C7C" : "#F4F1EB";
    icons.forEach((el) => (el.style.fill = color));
    if (line) line.style.stroke = color;
  });
}

// accordion.js (#accordion with h6) and the certification tabs on sustainability (#sertification with h3).
function initAccordion(id: string, heading: string) {
  const root = document.getElementById(id);
  if (!root) return;
  root.onclick = (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== heading) return;
    const wasActive = target.classList.contains("active");
    root.querySelectorAll(heading.toLowerCase()).forEach((h) => h.classList.remove("active"));
    root.querySelectorAll<HTMLElement>("div").forEach((d) => (d.style.height = "0"));
    if (!wasActive) {
      target.classList.add("active");
      const text = target.nextElementSibling as HTMLElement | null;
      if (text) text.style.height = text.scrollHeight + "px";
    }
  };
}

// ---- feedbackPopup.js ----
const PATTERN_NAME = /^[а-яёА-ЯЁ\s]+$/;
const PATTERN_MAIL = /^[A-Za-z0-9](([_.-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
const ERRORS = { name: "Введите Ваше реальное имя", mail: "Укажите Вашу электронную почту", mailFormat: "Неверный формат электронной почты" };
const SENT = "Спасибо! Ваше обращение отправлено.";
// The WordPress handler (admin-ajax.php) is gone; point this at a new one to receive the forms.
const ENDPOINT = process.env.NEXT_PUBLIC_FORMS_ENDPOINT;

function fieldError(name: string, value: string): string {
  if (name === "username" && (!value || !PATTERN_NAME.test(value))) return ERRORS.name;
  if (name === "usermail") return !value ? ERRORS.mail : PATTERN_MAIL.test(value) ? "" : ERRORS.mailFormat;
  if (name === "textmess" && (!value || !PATTERN_NAME.test(value))) return ERRORS.mailFormat; // sic: the theme reused this message
  return "";
}

function bindForm(form: HTMLFormElement, action: string, popup: HTMLElement | null) {
  const send = form.querySelector<HTMLElement>("#send_mess");
  const mark = (el: HTMLElement, ok: boolean | null) => {
    const parent = el.parentElement!;
    el.classList.toggle("form-control_error", ok === false);
    parent.classList.toggle("feedback--error", ok === false);
    el.classList.toggle("form-control_success", ok === true);
    parent.classList.toggle("feedback--success", ok === true);
    send?.classList.toggle("disabled", ok === false);
  };
  form.querySelectorAll<HTMLInputElement>(".form-control").forEach((field) => {
    field.onblur = () => mark(field, !fieldError(field.name, field.value));
    field.onfocus = () => mark(field, null);
  });
  const captchaError = () => document.querySelector<HTMLElement>(".feedback__captcha .g-recaptcha-error");
  form.querySelector<HTMLElement>("[type=submit]")?.addEventListener("click", async (e) => {
    e.preventDefault();
    const err = captchaError();
    if (err) err.innerHTML = "";
    const data = new FormData(form);
    let failed = false;
    for (const [name, value] of data.entries()) {
      if (fieldError(name, String(value))) {
        failed = true;
        const el = form.querySelector<HTMLElement>(`[name="${name}"]`);
        if (el) mark(el, false);
      }
    }
    if (failed) return;
    data.append("action", action);
    if (action === "formGet") {
      data.append("topic", document.querySelector(".dropdown__appeal-filter-selected")?.textContent ?? "");
      data.append("who", document.querySelector(".dropdown__options-filter li")?.textContent ?? "");
    }
    if (!ENDPOINT) {
      if (err) err.innerHTML = "Отправка формы пока не подключена.";
      return;
    }
    const reply = await fetch(ENDPOINT, { method: "POST", body: data }).then((r) => r.text()).catch(() => "");
    if (reply === SENT) {
      document.querySelector<HTMLElement>(".feedback-sent")!.style.display = "flex";
      popup?.classList.remove("active");
      document.body.classList.remove("no-scroll");
    } else if (err) {
      err.innerHTML = reply || "Не удалось отправить сообщение.";
    }
  });
}

function initPopups(): () => void {
  const feedback = document.getElementById("feedback-popup");
  const free = document.getElementById("free-popup");
  const open = (popup: HTMLElement | null) => {
    popup?.classList.add("active");
    document.body.classList.add("no-scroll");
  };
  const close = (popup: HTMLElement | null) => {
    popup?.classList.remove("active");
    document.body.classList.remove("no-scroll");
  };
  document.querySelectorAll<HTMLFormElement>("form[name=feedback]").forEach((f) => bindForm(f, "formGet", feedback));
  document.querySelectorAll<HTMLFormElement>("form[name=free-samples]").forEach((f) => bindForm(f, "formFreeSample", free));

  const label = document.querySelector(".dropdown__filter-selected");
  const labelAppeal = document.querySelector(".dropdown__appeal-filter-selected");
  const organization = document.getElementById("organization");
  const dropdown = document.querySelector(".dropdown__filter");
  const dropdownAppeal = document.querySelector(".dropdown__appeal-filter");

  const onClick = (e: MouseEvent) => {
    const t = e.target as HTMLElement;
    const hit = (sel: string) => t.closest<HTMLElement>(sel);
    // The theme's onclick="window.location.href='…'" buttons, kept as data-href.
    const nav = hit("[data-href]");
    if (nav) { window.location.href = nav.dataset.href!; return; }
    if (hit("#feedback, #feedback2")) { e.preventDefault(); open(feedback); }
    else if (hit(".sample-banner__button")) { e.preventDefault(); open(free); }
    else if (hit("#feedback-popup .feedback__header-close")) close(feedback);
    else if (hit("#free-popup .feedback__header-close")) close(free);
    else if (hit(".feedback-sent .xclose")) document.querySelector<HTMLElement>(".feedback-sent")!.style.display = "";
    else if (hit(".footer__popup .footer__close")) hit(".footer__popup .footer__close")!.closest(".footer__popup")?.classList.add("footer__popup__close");
    else if (hit(".sustainability-popup")) document.querySelector<HTMLElement>(".sustainability-mask")!.style.display = "flex";
    else if (hit(".sustainability-mask .xclose")) document.querySelector<HTMLElement>(".sustainability-mask")!.style.display = "none";
    else if (hit("a.scroll-to")) { e.preventDefault(); window.scrollTo({ top: 900, behavior: "smooth" }); }
    else if (hit(".comp")) { window.scrollTo(0, 0); document.querySelector<HTMLElement>(".compound-mobile")!.style.display = "block"; }
    else if (hit(".comp-close")) document.querySelector<HTMLElement>(".compound-mobile")!.style.display = "none";

    const option = hit(".dropdown__select-option");
    if (option && label) { label.textContent = option.textContent; organization?.classList.remove("active"); }
    const appeal = hit(".dropdown__appeal-select-option");
    if (appeal && labelAppeal) labelAppeal.textContent = appeal.textContent;
    if (hit("#dropdown-owner, #dropdown-merch")) { e.preventDefault(); organization?.classList.add("active"); dropdown?.classList.remove("active"); }
    else if (hit(".dropdown__filter")) dropdown?.classList.toggle("active");
    if (hit(".dropdown__appeal-filter")) dropdownAppeal?.classList.toggle("active");
    // Clicking outside a drop-down closes it.
    const sw = document.querySelector<HTMLInputElement>(".dropdown__switch");
    if (sw && t !== sw && !hit(".dropdown__filter")) sw.checked = false;
    const swAppeal = document.querySelector<HTMLInputElement>(".dropdown__appeal-switch");
    if (swAppeal && t !== swAppeal && !hit(".dropdown__appeal-filter")) swAppeal.checked = false;
  };
  document.addEventListener("click", onClick);

  // Barista pages offer a free sample after 10 seconds.
  const timer = window.location.pathname.includes("products/barista") ? window.setTimeout(() => free?.classList.add("active"), 10000) : 0;
  return () => {
    document.removeEventListener("click", onClick);
    window.clearTimeout(timer);
  };
}

export default function ThemeScripts() {
  const pathname = usePathname();
  useEffect(() => {
    const sliders = initSliders();
    initReviews();
    initVideo();
    initAccordion("accordion", "H6");
    initAccordion("sertification", "H3");
    const stopPopups = initPopups();
    return () => {
      stopPopups();
      sliders.forEach((s) => s.destroy(true, false));
    };
  }, [pathname]);
  return null;
}
