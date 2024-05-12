import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

export default {
  init() {
    this.cache();
    this.events();
    this.initialized();
  },
  cache() {
    this.settings = {
      slider: {
        container: '#slider-impression-bottom',
      },
      tabs: {
        slide: '.js-direction-slide',
        button: '.js-direction-click',
      },
      disabledClass: 'is-disabled',
      activeClass: 'is-active',
      hideClass: 'hide',
    };

    this.$slider = null;
    this.$tabSlide = $(this.settings.tabs.slide);
    this.$tabButton = $(this.settings.tabs.button);
  },
  events() {
    this.$tabButton.on('click', this.handleClick.bind(this));
  },
  handleClick(event) {
    const $target = $(event.currentTarget);
    const key = $target.data('key');
    const $slideItem = $(this.settings.tabs.slide + '[data-key=' + key + ']');

    if ($target.hasClass(this.settings.activeClass)) {
      this.$tabButton.removeClass(this.settings.activeClass);
      this.$tabSlide.removeClass(this.settings.hideClass);
      return;
    }

    this.$tabButton.removeClass(this.settings.activeClass);
    $target.addClass(this.settings.activeClass);
    this.$tabSlide.addClass(this.settings.hideClass);
    $slideItem.removeClass(this.settings.hideClass);
  },
  initialized() {
    this.$slider = new Swiper(this.settings.slider.container, this.swiperOptions);
  },
  get swiperOptions() {
    return {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 16,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
      },
      speed: 1100,
    };
  },
};