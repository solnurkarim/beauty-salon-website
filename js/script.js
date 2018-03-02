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
			$(this).addClass('active');
		}
	});

	// initial page loading/page refresh fade animation
	$('#content').css('display', 'none').fadeIn(1000);

	// display background image on page load/refresh
	// $('.slider-image').eq(0).fadeIn(1000);
	$('.slider-image').eq(0).css('opacity', 1);

	// slider arrow autofocus on page load/refresh
	$("#control-right-arrow").focus();

	// change location.hash on menu item click
	$('#nav-list li a, #logo-wrap a').click(function(){
		window.location.hash = $(this).attr('href').substr(0, $(this).attr('href').length-5);
		document.title = $(this).text();
		// underline selected menu item
		if($(this).hasClass('nav-button')){
			$($('.nav-button')).each(function(){
				$(this).removeClass('active');
			});
			$(this).addClass('active');
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
			$('#bg-info').fadeIn('slow', hideLoader);
		}
		$('#load').remove();
		$('main').append('<img src="svg-loaders/three-dots.svg" id="load">');
		$('#load').fadeIn('normal');
	}

	function loadContent() {
		if(hash != 'index'){
			$('#content').load(toLoad, showNewContent);
			$('#bg-info').fadeOut('slow');
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
		$('#bg-info').fadeIn(1200);
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
	let currentBg = $('.slider-image:first-child');

	function slideNext(){
		if(currentBg.is(':last-child')){
			currentBg.css('opacity', 0);
			currentBg = $('#slider :first-child').css('opacity', 1);
		} else {
			currentBg = currentBg.css('opacity', 0).next().css('opacity', 1);
		}
	}

	function slidePrev(){
		if(currentBg.is(':first-child')){
			currentBg.css('opacity', 0);
			currentBg = $('#slider :last-child').css('opacity', 1);
		} else {
			currentBg = currentBg.css('opacity', 0).prev().css('opacity', 1);
		}
	}

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

	

    // $('#slider img:gt(0)').hide();
    // setInterval(function(){
    //   $('#slider :first-child').fadeOut(1000)
    //      .next('img').fadeIn(1000)
    //      .end().appendTo('#slider');}, 
    //   3000);
});