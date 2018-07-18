(function () {
    var miniCart;
    var cartCounter = $('#cart-counter');

    $(document).on('cart.ready', function (event, cart) {
        //event handling here.  cart - object from Cart.js library
        // console.log(cart);
        initMinicart(JSON.parse(JSON.stringify(cart)));
    });

    <!-- Initialise Cart.js once the page has loaded -->
    CartJS.init(cartJson);

    function initMinicart(data) {
        miniCart = new Vue({
            el: "#minicart",
            data: {
                cartData: data,
                opened: false,
                window: window
            },
            created: function () {
                console.log(this.cartData);
                $('.js-toggle-cart').click(this.show);
                $('.js-add-to-cart').click(this.addToCartClickHandler);
                $(document).on('cart.requestComplete', this.cartUpdateHandler);

                if (this.cartData.item_count > 0) {
                    cartCounter.show();
                }

                this.initQtyProdWidget();
            },
            computed: {
                totalPrice: function () {
                    return Math.floor(this.cartData.total_price / 100)
                }
            },
            methods: {
                addToCartClickHandler: function (e) {
                    e.preventDefault();
                    var id = $(e.currentTarget).data('variant-id');
                    console.log(id);
                    var properties = $(e.currentTarget).data('collection');
                    var quantity = $('#Quantity').val() || 1;
                    this.add(id, quantity, properties);
                    this.show();
                },
                refreshProdWidgetsState: function () {
                    for (var id in this.productWidgets) {
                        var currentItem = this.getItemById(id);
                        if (currentItem) {
                            this.productWidgets[id].find('.js-val').text(currentItem.quantity);
                            //  console.log(this.productWidgets[id]);
                        }
                    }
                },
                initQtyProdWidget: function () {
                    var _that = this;
                    this.productWidgets = {};

                    $('.js-qty-widget').each(function () {
                        var id = $(this).data('variant-id');
                        if (_that.productWidgets[id]) {
                            _that.productWidgets[id] = _that.productWidgets[id].add($(this));
                        } else {
                            _that.productWidgets[id] = $(this);
                        }
                    });

                    for (var key in this.productWidgets) {
                        (function (key) {
                            this.productWidgets[key].find('.js-minus').click(function (e) {
                                e.preventDefault();
                                _that.minus(key);
                            });
                            this.productWidgets[key].find('.js-plus').click(function (e) {
                                e.preventDefault();
                                _that.plus(key);
                            });
                        }.bind(this))(key);
                    }

                    // console.log(this.productWidgets);

                    this.refreshProdWidgetsState();
                },
                cartUpdateHandler: function (e, cart) {
                    Vue.set(this, 'cartData', JSON.parse(JSON.stringify(cart)));

                    cartCounter.text(this.cartData.item_count);
                    if (this.cartData.item_count > 0) {
                        cartCounter.show();
                    } else {
                        cartCounter.hide();
                    }
                    this.refreshProdWidgetsState();
                },
                show: function (e) {
                    if (e && e.preventDefault) {
                        e.preventDefault();
                        e.stopPropagation();
                    }

                    if (this.opened) {
                        this.hide();
                        return;
                    }

                    this.opened = true;
                    document.body.classList.add('minicart--opened');
                    setTimeout(function () {
                        $(document.body).on('click', this.bodyClickClose);
                    }.bind(this), 50)

                },
                hide: function () {
                    this.opened = false;
                    document.body.classList.remove('minicart--opened');
                    $(document.body).off('click', this.bodyClickClose);
                },
                bodyClickClose: function (e) {
                    if (!$(e.target).closest('.minicart, .js-qty-widget,  .js-add-to-cart').length) {
                        this.hide();
                    }
                },
                add: function (id, quantity, properties) {
                    CartJS.addItem(id, quantity, {collection: properties });
                },
                getItemById: function (id) {
                    var filteredItem = this.cartData.items.filter(function (item) {
                        return id == item.id;
                    });
                    if (filteredItem.length) {
                        return filteredItem[0];
                    } else {
                        return false;
                    }
                },
                remove: function (id) {
                    CartJS.removeItemById(id);
                },
                minus: function (id) {
                    var update = {};
                    update[id] = this.getItemById(id).quantity - 1;
                    CartJS.updateItemQuantitiesById(update);
                    this.show();
                },
                plus: function (id) {
                    var update = {};
                    update[id] = this.getItemById(id).quantity + 1;
                    CartJS.updateItemQuantitiesById(update);
                    this.show();
                }
            }
        })
    }
})();