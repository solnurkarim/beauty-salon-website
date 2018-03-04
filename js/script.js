$(document).ready(function() {
	var toLoad;
	var hash = window.location.hash.substr(1);

	// page load URL check for bookmarks/page refresh
	var href = $('#nav-list li a').each(function(){
		var href = $(this).attr('href');
		if( hash == href.substr(0, href.length-5) ){
			toLoad = hash + '.html';
			if( hash == 'index' || hash == '' ){
				showIndex();
			} else if( hash == 'gallery' ){
				$('#content').load(toLoad, loadGallery);
			} else {
				$('#content').load(toLoad);
			}
		}
		// select menu item based on URL
		if( toLoad == href || (hash == '' && href == 'index.html') ){
			if( window.innerWidth >= 768 ){
				$(this).closest('.nav-li').find('.nav-button').addClass('active');
			} else {
				$(this).closest('.nav-li').find('.nav-button').addClass('bold');
			}
		}
	});

	// fade animation on page load/refresh 
	$('#content').css('display', 'none').fadeIn(1000);

	// display background image on page load/refresh
	$('.slider-image').eq(0).css('opacity', 1);

	// slider arrow autofocus on page load/refresh
	$("#control-right-arrow").focus();

	// change location.hash on menu item click
	$('#nav-list li a, #logo-wrap a').click(function(){
		window.location.hash = $(this).attr('href').substr(0, $(this).attr('href').length-5);
		document.title = $(this).text();
		// underline selected menu item
		if($(this).is('.nav-button, .drop-button') && window.innerWidth >= 768){
			$($('.nav-button')).each(function(){
				$(this).removeClass('active');
			});
			$(this).closest('.nav-li').find('.nav-button').addClass('active');
		} else if($(this).is('.nav-button, .drop-button')) {
			$($('.nav-button')).each(function(){
				$(this).removeClass('active, bold');
			});
			$(this).closest('.nav-li').find('.nav-button').addClass('bold');
		}
		return false;
	});

	// load new content on location.hash change
	window.addEventListener('hashchange', function() {
		hash = window.location.hash.substr(1);
		if(hash != 'index'){
			toLoad = hash + '.html .main-inner';
		}
		prepareContent();
	});

	function prepareContent() {
		$('#content').fadeOut('slow', loadContent);
		if(hash == 'index'){
			$('#slider-data').fadeIn('slow', hideLoader);
		}
		$('#load').remove();
		$('main').append('<img src="svg-loaders/three-dots.svg" id="load">');
		$('#load').fadeIn('normal');
	}

	function loadContent() {
		if(hash != 'index'){
			$('#content').load(toLoad, showNewContent);
			$('#slider-data').fadeOut('slow');
		}
	}

	function showNewContent() {
		$('#content').fadeIn('slow',hideLoader);
		if(hash == 'gallery'){
			loadGallery();
		}
	}

	function hideLoader() {
		$('#load').fadeOut('normal');
	}

	function loadGallery() {
		let imgId = 1;
		$('.gallery-img-wrap img').each(function(){
			this.src = 'https://placeimg.com/400/300/people/' + imgId;
			imgId++;
		});
	}

	function showIndex() {
		$('#slider-data').fadeIn(1200);
	}

	// navbar display toggle for smaller screens/mobile devices
	$('#nav-mobile').click(function(){
		$('#nav-list-wrap').slideToggle();
	});

	$('#nav-list-wrap a').click(function(){
		if($('#nav-mobile').css('display') != 'none'){
			$('#nav-list-wrap').slideToggle();
		}
	});

	// close registration form
	$('#icon-close').click(function(){
		$('#form-bg').fadeOut();
	});


	// slider interval
	let sliderTimer = setInterval(slideNext, 8000);

	// slider controls
	let currentSlide = $('.slider-image:first-child');
	let currentSlideIndex = 0;
	let slideAuthorsArr = [
						"MAKEUP BY ANASTASIA STAR",
						"STYLE BY ALIYA SULEIMENOVA",
						"NAILS BY MARIA KOVALCHUK"
						];
	let slideDescArr = [
						"Прически от сертифицированных и признанных мастеров",
						"Индивидуальный подбор стиля",
						"Маникюр только от лучших знатоков своего дела"
						];

	function slideNext(){
		if(currentSlide.is(':last-child')){
			currentSlide.css('opacity', 0);
			currentSlide = $('#slider-image-list :first-child').css('opacity', 1);
			currentSlideIndex = 0;
		} else {
			currentSlide = currentSlide.css('opacity', 0).next().css('opacity', 1);
			currentSlideIndex++;
		}
		setSliderData();
	}

	function slidePrev(){
		if(currentSlide.is(':first-child')){
			currentSlide.css('opacity', 0);
			currentSlide = $('#slider-image-list :last-child').css('opacity', 1);
			currentSlideIndex = slideAuthorsArr.length-1;
		} else {
			currentSlide = currentSlide.css('opacity', 0).prev().css('opacity', 1);
			currentSlideIndex--;
		}
		setSliderData();
	}

	// load slider description
	function setSliderData(){
		// $('#slider-title-author').animate({'opacity': 0}, 500, function(){
		// 	$(this).text(slideAuthorsArr[currentSlideIndex]);
		// }).animate({'opacity': 1}, 500);
		$('#slider-title-author').text(slideAuthorsArr[currentSlideIndex]);
		$('#slider-desc-text').text(slideDescArr[currentSlideIndex]);
	}

	// slider arrow controls
	$('#slider-controls a').click(function(e){
		e.preventDefault();
		clearInterval(sliderTimer);
		sliderTimer = setInterval(slideNext, 8000);
		if($(this).attr('id') == 'control-right-arrow') {
			slideNext();
		} else {
			slidePrev();
		}
	});
});