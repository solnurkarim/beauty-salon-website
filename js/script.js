$(document).ready(function() {
	let toLoad;
	let hash = window.location.hash.substr(1);

	// slider interval
	let sliderTimer = setInterval(slideNext, 8000);

	// slider data
	let currentSlide = $('.slider-image:first-child');
	let currentSlideIndex = 0;
	let slideAuthorsArr = [ 'MAKEUP BY ANASTASIA STAR', 'STYLE BY ALIYA SULEIMENOVA', 'NAILS BY MARIA KOVALCHUK' ];
	let slideDescArr = [
		'Прически от сертифицированных и признанных мастеров',
		'Индивидуальный подбор стиля',
		'Маникюр только от лучших знатоков своего дела'
	];

	// change location.hash on menu item click
	$('#nav-list li a, #logo-wrap a').click(function() {
		window.location.hash = $(this).attr('href').substr(0, $(this).attr('href').length - 5);
		document.title = $(this).text();
		return false;
	});

	// page load URL check for bookmarks/page refresh
	let href = $('#nav-list li a').each(function() {
		let href = $(this).attr('href');
		if (hash == href.substr(0, href.length - 5)) {
			toLoad = hash + '.html';
			if (hash == 'index' || hash == '') {
				showIndex();
			} else if (hash == 'gallery') {
				$('#content').load(toLoad, loadGallery);
			} else {
				$('#content').load(toLoad);
			}
		}
		// select menu item based on URL
		if (toLoad == href || (hash == '' && href == 'index.html')) {
			if (window.innerWidth >= 768) {
				$(this).closest('.nav-li').find('.nav-button').addClass('active');
			} else {
				$(this).closest('.nav-li').find('.nav-button').addClass('bold');
			}
		}
	});

	// fadeIn animation on page load/refresh
	if (hash != '' && hash != 'index') {
		$('#content').animate({ opacity: 1 }, 1000);
	}

	// display background image on page load/refresh
	$('.slider-image').eq(0).css('opacity', 1);

	// slider arrow autofocus on page load/refresh
	$('#control-right-arrow').focus();

	// load new content on location.hash change
	window.addEventListener('hashchange', function() {
		hash = window.location.hash.substr(1);
		if (hash != 'index') {
			toLoad = hash + '.html .main-inner';
		}

		// select active navbar item
		$($('.nav-button, .drop-button')).each(function() {
			$(this).removeClass('active');
			$(this).removeClass('bold');
			let home = window.location.href.substr(-10);
			if ($(this).attr('href') == hash + '.html' || $(this).attr('href') == home) {
				if (window.innerWidth >= 768) {
					$(this).closest('.nav-li').find('.nav-button').addClass('active');
				} else {
					$(this).closest('.nav-li').find('.nav-button').addClass('bold');
				}
			}
		});
		prepareContent();
	});

	function prepareContent() {
		if (hash == 'index' || hash == '') {
			showIndex();
			$('#content, footer').animate({ opacity: 0 }, 800, function() {
				$(this).hide();
				$('footer').stop().show().animate({ opacity: 1 }, 800);
			});
		} else {
			if ($('#content').css('opacity') != 0 && $('#content').has('.main-inner').length) {
				$('#content, footer').animate({ opacity: 0 }, 800, loadContent);
			} else {
				loadContent();
			}
		}
		$('#load').remove();
		$('main').append('<img src="svg-loaders/three-dots.svg" id="load">');
		$('#load').fadeIn(800);
	}

	function loadContent() {
		if (hash != 'index') {
			$('#content').load(toLoad, showNewContent);
			$('#slider-data').stop().fadeOut(800);
		}
	}

	function showNewContent() {
		$('#content, footer').stop().show().animate({ opacity: 1 }, 800, hideLoader);
		if (hash == 'gallery') {
			loadGallery();
		}
	}

	function hideLoader() {
		$('#load').fadeOut('slow');
	}

	function loadGallery() {
		let imgId = 1;
		$('.gallery-img-wrap img').each(function() {
			this.src = 'https://placeimg.com/400/300/people/' + imgId;
			imgId++;
		});
	}

	function showIndex() {
		$('#slider-data').stop().fadeIn(800, hideLoader);

		// set current slide data width
		$('#slider-author-wrapper, #slider-desc-inner').stop();
		$('#slider-author').text(slideAuthorsArr[currentSlideIndex]);
		$('#slider-desc-text').text(slideDescArr[currentSlideIndex]);
		let sliderAuthorWidth = $('#slider-author').prop('scrollWidth');
		let sliderDescWidth = $('#slider-desc-text').prop('scrollWidth');
		$('#slider-author-wrapper').outerWidth(sliderAuthorWidth);
		$('#slider-desc-inner').outerWidth(sliderDescWidth);
	}

	// navbar display toggle for smaller screens/mobile devices
	$('#nav-mobile').click(function() {
		$('#nav-list-wrap').slideToggle();
	});

	$('#nav-list-wrap a').click(function() {
		if ($('#nav-mobile').css('display') != 'none') {
			$('#nav-list-wrap').slideToggle();
		}
	});

	// close registration form
	$('#icon-close').click(function() {
		$('#form-bg').fadeOut();
	});

	// slider controls
	function slideNext() {
		if (currentSlide.is(':last-child')) {
			currentSlide.css('opacity', 0);
			currentSlide = $('#slider-image-list :first-child').css('opacity', 1);
			currentSlideIndex = 0;
		} else {
			currentSlide = currentSlide.css('opacity', 0).next().css('opacity', 1);
			currentSlideIndex++;
		}
		setSliderData();
	}

	function slidePrev() {
		if (currentSlide.is(':first-child')) {
			currentSlide.css('opacity', 0);
			currentSlide = $('#slider-image-list :last-child').css('opacity', 1);
			currentSlideIndex = slideAuthorsArr.length - 1;
		} else {
			currentSlide = currentSlide.css('opacity', 0).prev().css('opacity', 1);
			currentSlideIndex--;
		}
		setSliderData();
	}

	// show slider description on page load/refresh
	$('#slider-author').text(slideAuthorsArr[currentSlideIndex]);
	$('#slider-desc-text').text(slideDescArr[currentSlideIndex]);

	// load slider description
	function setSliderData() {
		// slider author crossfade
		$('#slider-author').stop();
		let cloneAuthor = $('#slider-author').clone();
		cloneAuthor.css({
			position: 'absolute',
			left: $('#slider-author').position().left,
			top: $('#slider-author').position().top
		});

		$('#slider-author-wrapper').append(cloneAuthor);

		let newWidth = $('#slider-author')
			.css('opacity', 0)
			.text(slideAuthorsArr[currentSlideIndex])
			.prop('scrollWidth');
		let oldWidth = cloneAuthor.prop('scrollWidth');
		$('#slider-author-wrapper').outerWidth(oldWidth).animate({ width: newWidth }, 700);

		cloneAuthor.fadeOut(600, function() {
			$(this).remove();
		});
		$('#slider-author').animate({ opacity: 1 }, 600);

		// slider description crossfade
		$('#slider-desc-text').stop();
		let cloneDesc = $('#slider-desc-text').clone();
		cloneDesc.css({
			position: 'absolute',
			left: $('#slider-desc-text').position().left,
			top: $('#slider-desc-text').position().top
		});

		$('#slider-desc-inner').append(cloneDesc);

		let newWidthDesc = $('#slider-desc-text')
			.css('opacity', 0)
			.text(slideDescArr[currentSlideIndex])
			.prop('scrollWidth');
		let oldWidthDesc = cloneDesc.prop('scrollWidth');
		$('#slider-desc-inner').outerWidth(oldWidthDesc).animate({ width: newWidthDesc }, 700);

		cloneDesc.fadeOut(600, function() {
			$(this).remove();
		});
		$('#slider-desc-text').animate({ opacity: 1 }, 600);
	}

	// slider arrow controls
	$('#slider-controls a').click(function(e) {
		e.preventDefault();
		clearInterval(sliderTimer);
		sliderTimer = setInterval(slideNext, 8000);
		if ($(this).attr('id') == 'control-right-arrow') {
			slideNext();
		} else {
			slidePrev();
		}
	});
});
