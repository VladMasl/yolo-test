export default {
  init() {
    this.cacheDOM();
    this.bindEvents();
  },
  cacheDOM() {
    this.$body = $('body');
    this.$burgerMenu = $('.js-burger-menu');
  },
  bindEvents() {
    this.$burgerMenu.on('click', this.toggleMenu.bind(this));
  },
  toggleMenu() {
    this.$body.toggleClass('mobile_menu__active');
  },
};