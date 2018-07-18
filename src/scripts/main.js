(function () {
    initHeader();

    initSubscribeForm();

    initFooter();

    initProdMaterialSection();

    inithomeslider();

    initMagnificPopup();

    initShop();

    initSizePopup();

    initProductPage();

    initQTY();

    function initQTY(){
        $('.js-qty-widget').each(function(){
            var minusBtn = $(this).find('.js-qty-minus'),
                plusBtn = $(this).find('.js-qty-plus'),
                inp = $(this).find('.js-qty-input');

            minusBtn.click(function(){
                var val = inp.val();
                if(!val){
                    val = 0;
                }
                --val;
                if(val<1){
                    val = 1;
                }
                inp.val(val);
            });

            plusBtn.click(function(){
                var val = inp.val();
                if(!val){
                    val = 0;
                }
                ++val;
                inp.val(val);
            });
        });
    }

    function initAccordion(accordionHeads, accordionbodyes){

        accordionHeads.click(function () {
            var isOpened = $(this).hasClass('active');
            closeAllAccordions();
            if (!isOpened) {
                $(this).addClass('active').next().stop().slideDown('slow')
            }
        });

        function closeAllAccordions() {
            accordionHeads.removeClass('active');
            accordionbodyes.stop().slideUp('slow');
        }
    }

    function initProductPage() {
        var accordion = $('#product-accordion');
        if (!accordion.length) {
            return false
        }
        var accordionHeads = accordion.find('.js-accordion-head');
        var accordionbodyes = accordion.find('.js-accordion-body');

        var imagesPopup = $('#images-popup');
        var imagesPopupClose = $('#close-images-popup');

        initAccordion(accordionHeads, accordionbodyes);


        var accordionFAQHeads = $('.product-faq__q');
        var accordionFAQbodyes = $('.product-faq__a');
        initAccordion(accordionFAQHeads, accordionFAQbodyes);

        imagesPopupClose.click(function () {
            imagesPopup.fadeOut();
        });

        $('.js-open-images-popup').click(function () {
            imagesPopup.fadeIn('slow');
        });
    }

    function initSizePopup(){
        var sizePopup = $('#size-popup');

        if(!sizePopup.length){
            return
        }

        var catLinks = sizePopup.find('.js-cat-tab');
        var tabCatBody = sizePopup.find('.js-cat-tab-body');
        var tabHierarchy = [];
        var closeBtn = sizePopup.find('.js-close');

        var catIndexClass = 'size-popup__item--active';
        var subcatIndexClass = 'size-popup__subcategory--active';

        tabCatBody.hide().eq(0).show();

        tabCatBody.each(function(){
            tabHierarchy.push({
                links:$(this).find('.js-subcat-tab'),
                tabs: $(this).find('.js-subcat-tab-body')
            });
        });

        catLinks.click(function(){
            var index = $(this).index();
            catLinks.removeClass(catIndexClass).eq(index).addClass(catIndexClass);
            tabCatBody.hide().eq(index).show();
        });

        tabHierarchy.forEach(function(item){
            item.links.eq(0).addClass(subcatIndexClass);
            item.tabs.hide().eq(0).show();

            item.links.click(function(){
                var index = $(this).index();
                item.links.removeClass(subcatIndexClass);
                $(this).addClass(subcatIndexClass);
                item.tabs.hide().eq(index).show();
            })
        });

        sizePopup.click(function(e){
            if($(e.target).hasClass('size-popup') || $(e.target).hasClass('size-popup__inner')){
                sizePopup.fadeOut();
            }
        });

        closeBtn.click(function(){
            sizePopup.fadeOut();
        });

        $(document).on('click', '.js-open-size-popup', function () {
            sizePopup.fadeIn(600);
            return false;
        });
    }

    function initShop() {
        var cardSelector = '.js-collection-product-card';
        var linksSelector = '.js-collection-product-card a';
        var activeClass = 'collection-product-card--active';
        var thumbnailSelector = '.collection-product-card__thubnail-col';
        var thumbnailActiveClass = 'collection-product-card__thubnail-col--active';

        var filterSidebar = $('#collection-sidebar');


        $('#open-filters-btn').click(function(){
            filterSidebar.slideToggle();
        });

        $(document).on('click', cardSelector, function () {
            $(cardSelector).removeClass(activeClass);
            $(this).addClass(activeClass);
        });

        $('.js-header').click(function(){
            $(this).toggleClass('active').next().stop().slideToggle();
        });

        $(document).on('click', linksSelector, function (e) {

            if (!$(this).parents('.js-collection-product-card').hasClass(activeClass)) {
                e.preventDefault();
            }
        });

        $(document).on('click', thumbnailSelector, function () {
            var $this = $(this);
            var bgi = '';
            $this.parent().children(thumbnailSelector).removeClass(thumbnailActiveClass);
            $this.addClass(thumbnailActiveClass);
            bgi = $this.children().css('backgroundImage');
            $this.parents('.js-collection-product-card').find('.collection-product-card__img').css('backgroundImage', bgi);
        });

        $(document).on('click', '.bc-sf-filter-option-box', sizeMessageShow);

        function sizeMessageShow(){
            $('#size-message').fadeIn();
            $(document).off('click',sizeMessageShow);
        }

    }

    function initMagnificPopup(){
        var popupsLink = $('.js-youtube-popup');
        if(popupsLink.length){
            popupsLink.magnificPopup({type:'iframe'});
        }
    }


    function inithomeslider() {
        var slider = $('#homeslider');
        var slides = slider.find('.js-homeslide');

        slides.each(function (index) {
            var prev = null;
            var next = null;
            if (index === 0) {
                prev = slides.eq(slides.length - 1);
                next = slides.eq(index + 1);
            } else if (index === slides.length - 1) {
                prev = slides.eq(index - 1);
                next = slides.eq(0);
            } else {
                prev = slides.eq(index - 1);
                next = slides.eq(index + 1);
            }

            $(this).find('.js-prev-slide').html(prev.children('.homeslide__wrapper').get(0).outerHTML);
            $(this).find('.js-next-slide').html(next.children('.homeslide__wrapper').get(0).outerHTML);

        });

        slider.slick({
            arrows: false,
            swipe: false,
            speed:900,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        dots: true,
                        swipe: true
                    }
                }
            ]
        });

        slider.find('.js-next-btn').click(function(){
            slider.slick('slickNext');
        });
        slider.find('.js-prev-btn').click(function(){
            slider.slick('slickPrev');

        });
    }

    function initProdMaterialSection(){
        var sections = $('#section-material-teckh');
        var points = sections.find('.js-point');
        var popups = points.find('.technology-popup');
        var activeClass = 'point--clicked';

        points.click(function(e){
            var isCliked = $(this).hasClass(activeClass);
            closeAllPopups();
            if(!isCliked){
                $(this).find('.technology-popup').stop().fadeIn(300);
                $(this).addClass(activeClass);
                $(document.body).on('click', bodyClickHandler);
            }
            return false;
        });

        function closeAllPopups(){
            popups.stop().fadeOut(300);
            points.removeClass(activeClass);
            $(document.body).off('click', bodyClickHandler);
        }

        function bodyClickHandler(){
            closeAllPopups()
        }
    }

    function initFooter() {
        var accordionBtns = $('.js-accordion-heading');
        var accordionBlocks = $('.js-accordion-body');

        //footer__menu-title
        accordionBtns.click(function () {
            if(window.innerWidth < 768){
                var isActive = $(this).hasClass('active');
                accordionBtns.removeClass('active');
                accordionBlocks.slideUp('fast');
                if (!isActive) {
                    $(this).addClass('active').parent().children('.js-accordion-body').stop().slideDown('fast');
                }
            }
        });
    }

    function initSubscribeForm() {
        var form = $('#subscribe-form');
        $('#subscribe-form-error').hide();
        form.formchimp();
        if (!form.length) {
            return
        }
        var input = form.find('.email');
        var error =  $('#subscribe-form-error');

        form.submit(function(){
            if(validateEmail(input.val())){
                form.trigger('formchimp-submit');
                error.fadeOut();
            }else{
                form.addClass('formchimp-submit--error');
                error.fadeIn();
            }
            return false;
        });

        input.on('change input', function () {
            form.removeClass('formchimp-submit--error');
            error.fadeOut();
        });

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

    }


    function initHeader() {
        var header = $('#header');
        var stickyClass = 'header--sticky';

        setHeaderState();
        $(window).on('scroll', setHeaderState);

        function setHeaderState(){
            if(document.documentElement.scrollTop > 20){
                header.addClass(stickyClass)
            }else{
                header.removeClass(stickyClass)
            }
        }

        $('#mobil-search-icon').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            document.body.classList.add('mobile-search-opened');
        });

        $('#search-close').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            document.body.classList.remove('mobile-search-opened');
        });

        $('#mobile-btn').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            document.body.classList.toggle('mobile-menu-opened');
        });

        $('.js-search-input').focus(function(){
            $(this).parents('.header-search-form').addClass('opened');
        }).blur(function(){
            $(this).parents('.header-search-form').removeClass('opened');
        });
    }
})();
