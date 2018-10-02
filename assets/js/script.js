new WOW().init();

$(document).ready(function () {
	var $body = $('body');
	var $navbar = $('.navbar-default');
	var $offsetY = $navbar.offset().top + 10;
	var $menuButton = $('button.navbar-toggle');
	var $menuIcon = $('.navbar-toggle .glyphicon');
	var $collapsedMenuItem = $('.navbar-collapse.collapse li');
	var $modalBackdropDiv = $('<div class="modal-backdrop fade in"></div>');
	var $scrollButton = $('.scroll');

	// Fixed Nav after scroll
	function scroll() {
		if ($(window).scrollTop() >= $offsetY) {
			$navbar.addClass('menu-fixed').css('background-color', 'rgba(255,254,253,0.97)');
		} else {
			$navbar.removeClass('menu-fixed').css('background-color', 'transparent');
		}
	}
	document.onscroll = scroll;

	// Mobile Menu functions
	function openMenu() {
		$menuIcon.removeClass('glyphicon-menu-hamburger').addClass('glyphicon-remove active');
		$modalBackdropDiv.css('z-index', 900);
		$body.append($modalBackdropDiv);
		if (!$navbar.hasClass('menu-fixed')) {
			$navbar.css('background-color', 'rgba(255,254,253,0.97)');
		}
		// Close menu after clicking modal-backdrop
		$modalBackdropDiv.on('click', function () {
			$('.navbar-toggle').click();
			closeMenu();
		});
	}
	function closeMenu() {
		$menuIcon.removeClass('glyphicon-remove active').addClass('glyphicon-menu-hamburger');
		$modalBackdropDiv.css('z-index', 1025).remove();
		if (!$navbar.hasClass('menu-fixed')) {
			$navbar.css('background-color', 'transparent');
		}
	}
	// Mobile Menu Icon Toggle
	$menuButton.on('click', function () {
		if ($menuIcon.hasClass('glyphicon-menu-hamburger')) {
			openMenu();
			// Close menu after clicking a link
			$collapsedMenuItem.on('click', function () {
				$('.navbar-toggle').click(); // Trigger collapse animation
				closeMenu();
			});
		} else {
			closeMenu();
		}
	});
	// Collapse menu on resize
	$(window).resize(closeMenu());

	$('.carousel').carousel({
		// interval: 3200,
		// pause: false,
	})

	// Smooth scroll to content
	$("html").niceScroll({
		scrollspeed: 100,
		mousescrollstep: 38,
		cursorwidth: 5,
		cursorborder: 0,
		cursorcolor: '#9da6a8',
		autohidemode: true,
		zindex: 999999999,
		horizrailenabled: false,
		cursorborderradius: 0,
	});

	$scrollButton.on('click', function (e) {
		e.preventDefault();
		var $link = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $($link).offset().top - 60
		}, 900);
	});

	// Center modals vertically
	function centerModal() {
		$(this).css('display', 'block');
		var $dialog = $(this).find('.modal-dialog');
		var $offset = ($(window).height() - $dialog.height()) / 2;
		var $bottomMargin = parseInt($dialog.css('margin-bottom'), 10);

		// If modal is taller than screen height, top margin = bottom margin
		if ($offset < $bottomMargin) {
			$offset = $bottomMargin;
		}
		$dialog.css('margin-top', $offset);
	}

	$(document).on('show.bs.modal', '.modal', centerModal);
	$(window).on('resize', function () {
		$('.modal:visible').each(centerModal);
	});

});

// Wrap every letter in a span
anime.timeline({ loop: false })
	.add({
		targets: '.ml5 .line',
		opacity: [0.5, 1],
		scaleX: [0, 1],
		easing: "easeInOutExpo",
		duration: 2000
	})
	.add({
		targets: '.ml5 .line',
		duration: 1000,
		easing: "easeOutExpo",
		translateY: function (e, i, l) {
			var offset = -0.625 + 0.625 * 2 * i;
			return offset + "em";
		}
	})
	.add({
		targets: '.ml5 .letters-left',
		opacity: [0, 1],
		translateX: ["0.5em", 0],
		easing: "easeOutExpo",
		duration: 1000,
		offset: '-=300'
	})
	.add({
		targets: '.ml5 .letters-right',
		opacity: [0, 1],
		translateX: ["-0.5em", 0],
		easing: "easeOutExpo",
		duration: 1000,
		offset: '-=600'
	})