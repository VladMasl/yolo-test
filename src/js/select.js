export default {
  init() {
    this.cacheDOM();
    this.bindEvents();
  },
  cacheDOM() {
    this.$selects = $('.impression-card__select .select');
  },
  bindEvents() {
    this.$selects.each((index, select) => {
      const $select = $(select);
      const $selectHeader = $select.find('.select-header');
      const $options = $select.find('.select-option');

      $selectHeader.on('click', () => this.toggleSelect($select));
      $options.on('click', (event) => this.selectOption(event, $select));
    });
  },
  toggleSelect($select) {
    if (!$select.hasClass('disabled')) {
      $select.toggleClass('active');
      this.$selects.not($select).removeClass('active');
    }
  },
  selectOption(event, $select) {
    const $selectedOption = $(event.currentTarget);
    const price = $selectedOption.find('.price').text();
    const people = $selectedOption.find('.people').text();
    const time = $selectedOption.find('.time').text();

    const $selectHeader = $select.find('.select-header');
    $selectHeader.find('.price').text(price);
    $selectHeader.find('.people').text(people);
    $selectHeader.find('.time').text(time);

    $select.removeClass('active');
  },
};