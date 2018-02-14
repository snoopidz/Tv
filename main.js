/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/main.js":
/***/ (function(module, exports) {

/* global docCookies:false, Sanga:false, sanga_channel: false, sanga_epg:false, sanga_geolocate:false, sanga_search:false */
$(document).ready(function () {
  var DEFAULT_CURRENCY = 'world';
  var ESTAT_PREFIX = 'sanga-';
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Mobile Safari|Opera Mini/i.test(navigator.userAgent);
  var isEdge = /edge/i.test(navigator.userAgent);
  var isChrome = /chrome|CriOS/i.test(navigator.userAgent) && !isEdge;
  var isSafari = /safari/i.test(navigator.userAgent) && !isChrome;
  var mobileOrientation, carouselTimerId;
  var carouselResizeDelay = isMobile && isSafari ? 400 : 0;
  var playerSelector = '.video-js';
  var $player = $(playerSelector);
  var player = null;
  var shouldPopping = $('#action-showpopping');

  if (window.location.hash && window.location.hash == '#_=_') {
    window.location.hash = '';
    history.pushState('', document.title, window.location.pathname);
  }

  $('.form-control').focusin(function () {
    $this_parent = $(this).parent('.form-group');
    if ($this_parent.length > 0) {
      $this_parent.addClass('active');
    }
  });
  $('.form-control').focusout(function () {
    $this_parent = $(this).parent('.form-group.active');
    if ($this_parent.length > 0) {
      $this_parent.removeClass('active');
    }
  });

  $('.navbar_user_settings a').on('click', function (e) {
    tab_id = $(this).data('tab-id');
    if (tab_id) {
      $tabs_to_show = $('a[href="#' + tab_id + '"]');
      if ($tabs_to_show.length > 0) {
        $tabs_to_show.tab('show');
        $('.navbar_user_settings li.active').removeClass('active');
        $(this).parent('li').addClass('active');
      }
    }
  });

  $('.show_register_modal').on('click', function (e) {
    $connect_modal = $('#connect-modal');
    $register_modal = $('#register-modal');
    if ($connect_modal.length > 0 && $register_modal.length > 0) {
      $connect_modal.modal('hide');
      $connect_modal.on('hidden.bs.modal', function (e) {
        $register_modal.modal('show');
      });
    }
  });

  $('.show_connect_modal').on('click', function (e) {
    var $connect_modal = $('#connect-modal');
    var $register_modal = $('#register-modal');
    if ($connect_modal.length > 0 && $register_modal.length > 0) {
      $register_modal.modal('hide');
      $register_modal.on('hidden.bs.modal', function (e) {
        $connect_modal.modal('show');
      });
    }
  });

  // Default live search options
  var options = {
    url: sanga_search,
    getValue: 'name',
    list: {
      showAnimation: {
        type: 'slide'
      },
      hideAnimation: {
        type: 'slide'
      },
      match: {
        enabled: true
      }
    },
    template: {
      type: 'custom',
      method: function method(value, item) {
        return "<a href='" + item.link + "'>" + item.name + '</a>';
      }
    },
    theme: 'square',
    ajaxSettings: {
      timeout: 2500
    }

    // Initialize live search autocompletion
  };$('.search_form_input').easyAutocomplete(options);
  $('.nav .search').easyAutocomplete(options);

  var childMenu = 0;
  $('ul.left-menu li.has_child').each(function () {
    childMenu++;
    $(this).data('menu-target', '.sub-menu-' + childMenu);
    $(this).children('ul').addClass('left-menu sub-menu sub-menu-' + childMenu);

    var headMobile = '<span class="trim-menu show_mobile"><i class="fa fa-times" aria-hidden="true"></i></span><span class="back-menu show_mobile"><i class="fa fa-chevron-left" aria-hidden="true"></i> Back</span>';
    $(this).children('ul').prepend(headMobile);
    $(this).children('ul').appendTo('body');
  });

  $('#video_player_container').mouseover(function () {
    $('.video-title').fadeIn();
  });

  $('#video_player_container').mouseleave(function () {
    $('.video-title').fadeOut();
  });

  // Navigation
  $('#tv_burger').on('click', function () {
    toggle_header_menu('show_tv_menu', 'show_main_menu');
  });
  $('#menu_burger').on('click', function () {
    toggle_header_menu('show_main_menu', 'show_tv_menu');
  });
  function toggle_header_menu($to_show, $to_hide) {
    $('body').removeClass($to_hide);
    if (!$('body').hasClass($to_show)) {
      $('.navbar-brand').addClass('fade');
      $('body').addClass($to_show);
    } else {
      $('.navbar-brand').removeClass('fade');
      $('body').removeClass($to_show);
    }
  }
  // End Navigation

  $('.back-menu').on('click', function () {
    $('ul.left-menu li.has_child.active').trigger('click');
  });

  $('#left-sidebar, .left-menu').on('click', function (e) {
    e.stopPropagation();
  });

  $('#search_form .btn-search').on('click', function (e) {
    e.preventDefault();
    $(this).siblings('.search_form').toggleClass('show');
    $(this).parent('li').toggleClass('active');
  });

  $('span.clear_mobile_form').on('click', function () {
    $('div#search_form').trigger('click');
  });

  $('#mask').on('click', function () {
    $(this).hide();
    $('.popping').hide();
    //$('.account').hide()
    $('.plans').hide();
    $('.pay').hide();
  });

  $('.delete-action').on('click', function () {
    $('.delete-account').show();
  });

  $('.delete-account .close-btn').on('click', function () {
    $('.delete-account').hide();
  });

  $('.cancel-my-subscription').on('click', function () {
    $('#delete-form').attr('action', $(this).attr('data-url'));
    $('#confirmation-message').html('Etes vous sur de vouloir résilier votre abonnemet en cours ? ');
    $('#delete-form button').text('Résilier mon abonnement');
    $('#delete-form button').attr('title', 'Résilier mon abonnement');

    $('#confirmation-message-alert').show();
  });

  $('#delete-account-btn').on('click', function () {
    $('#delete-form').attr('action', $(this).attr('data-url'));
    $('#confirmation-message').html('En validant la suppression de votre compte vous ne pourrez plus profiter de vos abonnements!');
    $('#delete-form button').text('Confirmer la suppression');
    $('#delete-form button').attr('title', 'Supprimer mon compte');

    $('#confirmation-message-alert').show();
  });

  $('.cancel-subscription .close-btn').on('click', function () {
    $('.cancel-subscription').hide();
  });
  if (isMobile) {
    $tv_burger = $("#tv_burger");
    if (!$('body').hasClass('mobile_tv_menu') && current_channel == '' && $tv_burger.length > 0) {
      $("#tv_burger").trigger('click');
    }
  }

  $(window).on('load', function () {
    $('#reset-email-modal').modal('show');
  });

  // Set Currency depending on Cookie named "Currency"
  var currency = docCookies.getItem('currency');

  var continentData = function continentData(continentCode) {
    switch (continentCode) {
      case 'AF':
        return 'africa';
      case 'EU':
        return 'europe';
      default:
        return DEFAULT_CURRENCY;
    }
  };

  var setCurrency = function setCurrency(continentCode) {
    var dataName = continentData(continentCode);
    $('.offer-btn').each(function (index) {
      var priceTage = $(this).data(dataName);
      if (!parseInt(priceTage)) {
        $(this).hide();
      }
      $(this).children().text($(this).data(dataName));
    });
  };

  // GET EPG Informations
  var setEPG = function setEPG(channel) {
    $.get(sanga_epg + channel.slug, function (results) {
      // eslint-disable-line camelcase
      $('.programs-details').hide();
      if (results.error) {
        // Show channel info if no EPG available
        if (channel) {
          $('.no-epg .program-main-info').html('<ul class="pull-right list-inline list-unstyled">\
                  <li><div class="tv_vues">' + channel.metrics.toLocaleString() + ' Vues</div></li>\
                  <li><div class="tv_sharer"><a target="_blank" href="http:\/\/www.facebook.com\/share.php?u=' + document.location.href + '&title=' + channel.name + '" >Partager</a></div></li>\
                </ul>');
          $('.no-epg .program .program-title').text(channel.name);
          $('.no-epg .program .program-desc').text(channel.description);
          $('.no-epg .program .program-img').attr('src', channel.logo);
        }
        $('.no-epg').show();
        return false;
      }

      $('.programs-details').show();
      results = JSON.parse(results);

      $('.no-epg').hide();
      if (results.current !== null) {
        var $programs = $('.programs-details');
        if (channel) {

          $('.level', $programs).html(results.current.program.title);
          $('.program-main-info', $programs).html('<small class="progress"> Depuis ' + results.current.progress + ' Min sur ' + channel.name + '</small>\
              <ul class="pull-right list-inline list-unstyled">\
                <li><div class="tv_vues">' + channel.metrics.toLocaleString() + ' Vues</div></li>\
                <li><div class="tv_sharer"><a target="_blank" href="http:\/\/www.facebook.com\/share.php?u=' + document.location.href + '&title=' + channel.name + '" >Partager</a></div></li>\
              </ul>');
        } else {
          $('.program-main-info', $programs).html(results.current.program.title + ' <small class="progress"> Depuis ' + results.current.progress + ' Min </small>');
        }
        var $current_program = $('.program .current');
        // show current program details
        $('.program-info', $current_program).html(results.current.program.genre + '<span class="duration">' + results.current.duration + ' min</span>');
        $('.program-title', $current_program).html(results.current.program.title);
        $('.program-desc', $current_program).html("");
        if (results.current.program.subtitle) {
          $('.program-sub-title', $current_program).html(results.current.program.subtitle);
        }
        if (results.current.program.summary) {
          $('.program-desc', $current_program).html(results.current.program.summary);
        }
      }
      $("#prog-a-suivre .row").html("");
      results.next.forEach(function (next_program) {
        next_prog_div = "\
          <div class='col-xs-12 col-sm-4'>\
            <div class='next_program' style='background-image: url(" + next_program.program.program.image + ");'>\
              <div class='time'>" + next_program.minStart + "</div>\
              <h2 class='title'>" + next_program.program.program.title + "</h2>\
              <div class='info'>\
                " + next_program.program.program.genre + "<span class='duration'>" + next_program.program.duration + " min </span>\
              </div>\
            </div>\
          </div>";
        $("#prog-a-suivre .row").prepend(next_prog_div);
      });
    });
  };

  if (current_channel !== '') {
    setEPG(current_channel);
  }

  if (currency !== null) {
    setCurrency(currency);
  } else {
    setCurrency(DEFAULT_CURRENCY);
  }

  // Continue Payment Code
  var $continuePayment = $('#action-pay');
  if ($continuePayment.length > 0) {
    var offerId = $continuePayment.data('offer');
    var $offer = $('.offer-btn[data-offer="' + offerId + '"]');
    $('.paiement .methods').data('offer', offerId);
    $('.paiement .price').text($offer.children().text());
    $('.paiement .name').text($offer.data('name'));
    $('.pay').show();
  }

  var initializeCarousel = function initializeCarousel() {
    return $('.carousel').flickity({
      resize: !isMobile, // Autoresize disabled for mobile (see onOrientationChanged)
      cellAlign: 'left',
      freeScroll: true,
      contain: false,
      prevNextButtons: false,
      pageDots: false
    });
  };

  var carousel = initializeCarousel();

  // init tab for account view
  var url = document.location.href;
  var section = url.substr(url.lastIndexOf('#') + 1);
  if (section == url || section == '') {
    section = "informations";
  }
  $('.nav-tabs li').removeClass('active');
  $('#' + section + '-tab').addClass('active');
  $('.tab-pane').removeClass('active in');
  $('#' + section).addClass('active in');
  $('#' + section).show();

  // Close Models Button
  $('.close-btn').on('click', function () {
    $('#mask').hide();
    $('.' + $(this).data('target')).fadeOut();
  });

  // Offers passing to pay block
  $('.offer-btn').on('click', function () {
    $('.plans').hide();
    $('.paiement .methods').data('offer', $(this).data('offer'));
    $('.paiement .price').text($(this).children().text());
    $('.paiement .name').text($(this).data('name'));
    $("input[name='offer_id']").val($('.paiement .methods').data('offer'));
    $('.pay').show();
  });

  // Go to Payment
  $('.methods a').on('click', function () {
    var payForm = $('<form>', {
      'action': '/wari/pay',
      'target': '_top',
      'method': 'post'
    }).append($('<input>', {
      'name': 'offer_id',
      'value': $('.paiement .methods').data('offer'),
      'type': 'text'
    }));
    $(document.body).append(payForm);
    payForm.submit();
  });

  // Check if we have to show the popping for error messages 
  var shouldPoppingCheck = function shouldPoppingCheck() {
    if ($('#show-connect-poppin').length > 0) {
      $('#connect-modal').modal('show');
    } else if ($('#show-register-poppin').length > 0) {
      $('#register-modal').modal('show');
    } else if ($("#show-stripe-poppin").length > 0) {
      $('#custom-btn-abonnement').trigger('click');
    }
  };

  shouldPoppingCheck();

  var addStripeSource = function addStripeSource() {
    $('#connect-from-stripe').on('click', function () {
      $(".register-form").append("<input type='hidden' name='source' value='stripe'/>");
      $(".connect-form").append("<input type='hidden' name='source' value='stripe'/>");
      $('#connect-modal').modal('show');
    });
  };

  addStripeSource();

  // // If there is a payment result, show up the account tabs
  // if ($('.payment-result').length > 0) {
  //   var paymentMsg = $('.payment-result').text()
  //   $('.account .tabs ul li a[data-target=abonnements]').trigger('click')
  //   var messageDiv = document.createElement('div')
  //   messageDiv.innerText = paymentMsg
  //   messageDiv.setAttribute('class', 'message')
  //   $('.abonnements').first().append(messageDiv)
  //   $('.account').show()
  // }

  // // Trigger account menu from mobile
  // $('.account-mobile ul li a').on('click', function () {
  //   var dataTarget = $(this).data('target')
  //   $('.account-mobile').fadeOut('fast')
  //   $('.account .tabs ul li a[data-target=' + dataTarget + ']').trigger('click')
  //   $('.account').show()
  // })

  // hasPlayer() return true if player container element exists and is visible
  var hasPlayer = function hasPlayer() {
    return $player.length && $player.is(':visible');
  };

  // Resize player using 16:9 ratio
  var resizePlayer = function resizePlayer() {
    $player.height(Math.round($player.width() / 16 * 9));
  };

  if (hasPlayer()) {
    // Attempt to get player token
    var playerToken = $('#video_player_container').data('sangatoken');

    // Currently, if token is empty string then it is a premium channel
    // FIXME: instead use a channel attribute to determine this state
    if (playerToken === "") {
      // Display premium popin
      $('#mask').show();
      $('.plans').show();
      $('#homepage').hide();

      player = new Sanga.Player({ selector: playerSelector });
    } else {
      // Get current channel data
      var channelData = {
        title: $('.no-epg .program-title').first().text(),
        logo: $('.no-epg .program-img').first().attr('src'),
        uid: ESTAT_PREFIX + $('.no-epg').data('slug')

        // Create player instance
      };player = new Sanga.Player({
        selector: playerSelector,
        token: playerToken,
        autoPlay: true,
        channel: channelData
      });
    }
  }

  if (!player && $('#video_player_container_intro').length > 0) {
    // Create player instance (without token)
    player = new Sanga.Player({ selector: playerSelector });
  }

  $('.ch-carousel').css('display', 'block');

  $('.left-menu .has_child').click(function () {
    $(this).next().slideToggle(150);
  });

  $('.left-menu .channel-link').on('click', function () {
    // player consent MUST be called IMMEDIATELY after click event
    if (isMobile) {
      $("#tv_burger").trigger('click');
    }
    player && player.consent();
  });

  if ($('.reset').length > 0) {
    $('.popping-connect').hide();
  }

  var retrieveChannel = function retrieveChannel(slug) {
    $.get(sanga_channel + slug, function (results) {
      // eslint-disable-line camelcase
      $('head title').text(results.seo.title);
      $("meta[name='keywords']").attr('content', results.seo.title);
      $("meta[name='description']").attr('content', results.data.description);
      if (results.paid) {
        // Channel is premium (display popin)
        $('.plans').show();
        $('#homepage').hide();
        $('#mask').show();
        player.destroy();
        player = new Sanga.Player({ selector: playerSelector });

        return false;
      } else {
        // Channel is free
        // Update page metadata ith channel info
        // Display player container element (and hide intro container)
        $('.dynamic-player').show();
        $('#video_player_container_intro').hide();
        $('.plans').hide();
        $('#homepage').show();

        // Update player size if desktop
        if (!isMobile) {
          resizePlayer();
        }
        // Load channel in video player
        var $details = $('#video_player_container');
        $details.attr('data-sangatoken', results.token);
        $details.attr('data-id', results.data.videoid);
        setEPG(results.data);
        player && player.zap({
          token: results.token,
          channel: {
            title: results.data.name,
            logo: results.data.logo,
            uid: ESTAT_PREFIX + results.data.slug
          }
        });
      }
    });
  };

  var checkAuthentication = function checkAuthentication() {
    return $('#connected').length > 0;
  };

  var channelHintCallback = function channelHintCallback() {
    // player consent MUST be called IMMEDIATELY after click event
    player && player.consent();

    // Check if it's a static webpage
    if ($('.page').length > 0) {
      // Note: player will not autoplay (page change)
      document.location.href = $(this).data('href');
    }

    if (!$(this).hasClass('active')) {
      $('.channel-link.active').removeClass('active');
      $(this).addClass('active');
      $(this).removeClass('voile');
      $('.channel-link:not(.active)').addClass('voile');
    }

    var data = { id: $(this).data('id'), url: $(this).data('href'), slug: $(this).data('slug') };
    retrieveChannel(data.slug);
    history.pushState(data, 'SangaTV', data.url);
    // Make Active in sticky bar
    makeActive(data.id);

    if ($("#chromecast").length > 0) {
      $("#chromecast").hide();
      $("#sticky-mosaic-container").show();
    }

    if ($("#account-page").length > 0) {
      $("#account-page").hide();
      $("#sticky-mosaic-container").show();
    }
  };

  $('.channel-link').on('click', channelHintCallback);

  window.addEventListener('popstate', function (e) {
    // e.state is equal to the data-attribute of the last image we clicked
    if (e.state !== null) {
      retrieveChannel(e.state.slug);
    }
  });

  // Welcome pop-in is temporary disabled
  // var seenMessage = docCookies.getItem('seen')
  // if (seenMessage === null && checkAuthentication()) {
  //   $('.popping-message').show()
  // }

  $('.close-popping').on('click', function (e) {
    $('.popping').fadeOut();
    docCookies.setItem('seen', true);
  });

  $('#connect_trigger').on('click', function () {
    $('.account-mobile').fadeToggle();
  });

  var makeActiveFromURL = function makeActiveFromURL() {
    var url = document.location.href;
    var channelSlug = url.substr(url.lastIndexOf('/') + 1);
    $('.sticky .channel-link').removeClass('active');
    var $active = $('.flickity-slider .channel-link[data-href="/direct/' + channelSlug + '"]');
    $active.addClass('active');
    $('.sticky').flickity().flickity('selectCell', $active.index());
  };

  // Resize player and select channel in carousel (page load)
  if (hasPlayer()) {
    resizePlayer();
    makeActiveFromURL();
  }

  // Apply nice scroll if not mobile device
  if (!isMobile) {
    $('#left-sidebar').perfectScrollbar();
    $('main').perfectScrollbar();
    $('.message').perfectScrollbar();
    $('.sticky-container').perfectScrollbar();
  }

  $('.connect-btn').on('click', function () {
    $('.popping-register').hide();
    $('.popping-connect').toggle();
    $('#mask').show();
  });

  $('.register-btn').on('click', function () {
    $('.popping-connect').hide();
    $('.popping-register').toggle();
    $('#mask').show();
  });

  $('.channels-list').css('display', 'block');

  // var pullCategoryUp = function (code) {
  //   var categories = document.querySelectorAll('.category')
  //   $.each(categories, function (category) {
  //     var country = categories[category].dataset.country
  //     var categoryDom = categories[category]
  //     if (country === code) {
  //       var list = $(categoryDom).next()
  //       $(categoryDom).insertAfter('.left-menu li:first')
  //       $(list).insertAfter(categoryDom)
  //     }
  //   })
  // }

  // var code = docCookies.getItem('code')
  // if (code !== null) {
  //   pullCategoryUp(code)
  //   $('.channels-list:lt(2)').css('display', 'block')
  // } else {
  //   $.get(sanga_geolocate, function (data) {
  //     if (data.success) {
  //       docCookies.setItem('code', data.code)
  //       docCookies.setItem('currency', data.continent)
  //       setCurrency(data.continent)
  //       pullCategoryUp(data.code)
  //     }
  //     $('.channels-list:lt(2)').css('display', 'block')
  //   })
  // }

  var makeActive = function makeActive(channel) {
    $('.flickity-slider .channel-link').removeClass('active');
    var $active = $('.flickity-slider .channel-link[data-id="' + channel + '"]');
    $active.addClass('active');
    $('.sticky').flickity().flickity('selectCell', $active.index());
  };

  // This function is called if mobile orientation has changed
  var onOrientationChanged = function onOrientationChanged(event) {
    // Resize carousel
    if (carousel) {
      clearTimeout(carouselTimerId);
      carouselTimerId = setTimeout(function () {
        carousel.data('flickity').resize();
      }, carouselResizeDelay);
    }
  };

  // Window resize event bidings
  $(window).on('resize', function (e) {
    // Handle mobile orientation changed event
    if (isMobile) {
      var orientation = $(window).width() > $(window).height() ? 'landscape' : 'portrait';
      if (mobileOrientation !== orientation) {
        mobileOrientation = orientation;
        onOrientationChanged({ e: e, orientation: orientation });
      }
    } else {
      // Autoresize player on desktop
      if (hasPlayer()) {
        resizePlayer();
      }
    }
  });
}); // End jQuery.ready

/***/ }),

/***/ "./resources/assets/sass/style.scss":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./resources/assets/js/main.js");
module.exports = __webpack_require__("./resources/assets/sass/style.scss");


/***/ })

/******/ });