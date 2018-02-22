$(document).ready(function() {
	var toLoad;
	var hash = window.location.hash.substr(1);

	var href = $('#nav-list li a').each(function(){
		var href = $(this).attr('href');
		if( hash != 'index' && hash == href.substr(0, href.length-5) ){
			toLoad = hash + '.html';
			if( hash == 'gallery' ){
				$('#content').load(toLoad, loadGallery);
			} else {
				$('#content').load(toLoad);
			}
		}
	});

	// initial page loading/page refresh animation
	$('#content').css('display', 'none').fadeIn(1000);
	
	$('#nav-list li a, #logo-wrap a').click(function(){
		window.location.hash = $(this).attr('href').substr(0, $(this).attr('href').length-5);
		document.title = $(this).text();
		return false;
	});

	window.addEventListener('hashchange', function() {
		hash = window.location.hash.substr(1);
		if(hash != 'index'){
			toLoad = hash + '.html .main-inner';
		}
		prepareContent();
	});

	function prepareContent() {
		// if(hash == 'index'){
		// 	$('#content').fadeOut('slow',loadContent);
		// 	$('#bg-info').fadeIn('slow', hideLoader);
		// } else {
		// 	$('#content').fadeOut('slow',loadContent);
		// }
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

	// navbar display toggle for smaller screens/mobile devices
	$('#nav-mobile').click(function(){
		$('#nav-list-wrap').slideToggle();
	});

	$('#nav-mobile ~ nav a').click(function(){
		$('#nav-list-wrap').slideToggle();
	});
});