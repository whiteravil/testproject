$(function() {

	function checkScroll() {
		if ( $(window).scrollTop() > 0 ) {
			$('.header').addClass('header-sticky')
		} else {
			$('.header').removeClass('header-sticky')
		}
	}checkScroll();

	$(window).on('scroll', checkScroll);

	$('.menu__link').on('click', function(e) {
		e.preventDefault();
		let id = $(this).attr('href');
		if ( $(id).length > 0 ) {
			$('.menu__link').removeClass('active');
			$(this).addClass('active');
			$('html, body').animate({
				scrollTop: $(id).offset().top - 80
			}, 1000);
		}
	});

	$('.btn-scroll').on('click', function(e) {
		e.preventDefault();
		let id = $(this).attr('href');
		if ( $(id).length > 0 ) {
			$('html, body').animate({
				scrollTop: $(id).offset().top - 80
			}, 1000);
		}
	});

	let main_info_slider = $('.main-info');

	main_info_slider.owlCarousel({
		items: 1,
		rewind: true,
		animateOut: 'fadeOut',
		mouseDrag: false,
		touchDrag: false,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
		nav: false,
		dots: true
	});

	function addBanners() {
		$('.main-info__item').each(function() {
			let banner_url = $(this).data('img');
			$('.banners').append(`<div class="banners__item" style="background-image: url(${banner_url})"></div>`);
		});
	}addBanners();

	function checkOwlBanner(number) {
		let slide_index = number;
		setTimeout(function() {
			$('.banners__item').css('opacity', 0);
			$('.banners__item').eq(slide_index).css('opacity', 1);
		}, 100)
	}checkOwlBanner(0);

	main_info_slider.on('changed.owl.carousel', function(event) {
		checkOwlBanner(event.item.index);
	});

	$('.form').on('submit', function(e) {
		e.preventDefault();
		return false;
	});

	$('.form').each(function() {
		let form = $(this),
				input = form.find('input[type=email]'),
				submit = form.find('[type=submit'),
				error = form.find('.label__error');
		submit.on('click', function(e) {
			e.preventDefault();
			if ( input.val().trim() == '' ) {
				error.text('Заполните это поле');
				error.addClass('active');
				input.addClass('error').focus();
			}
			else if ( input.val().search(/^[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i) !== 0 ) {
				error.text('Введите корректный Email');
				error.addClass('active');
				input.addClass('error').focus();
			} else {
				error.removeClass('active');
				input.removeClass('error');
				form.addClass('submitted');
				setTimeout(function() {
					form.removeClass('submitted');
					input.val('');
				}, 5000)
			}
		});
	});

});