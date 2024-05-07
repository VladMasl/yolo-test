export default {
  init() {
    this.cache();
    this.events();
  },
  cache() {
    this.settings = {
      list: '.js-accordion-list',
      title: '.js-accordion-title',
      accordion: {
        item: '.accordion__item',
      },
      activeClass: 'is-active',
    };

    this.$accordionList = $(this.settings.list);
  },
  events() {
    this.$accordionList.on('click', this.settings.title, this.onItemClick.bind(this));
  },
  onItemClick(event) {
    event.preventDefault();

    const $target = $(event.currentTarget);
    $target.parent(this.settings.accordion.item).toggleClass(this.settings.activeClass);
    $target.toggleClass(this.settings.activeClass);
  },
};
