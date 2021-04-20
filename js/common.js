$(".image_stick").click(function(){
	var click_event = $(this).attr("id");
	var status_event = $(this).attr("data-active");
	for(i = 8; i <= 20; i++) {
		if(i == click_event) {
			if(status_event == 0) {
				$(this).attr("data-active", "1");
				$(this).css('border', '2px solid #1de7e7');
				$(this).css('border-radius', '10px');
				$("#select_id_arena").html(i);

			}
		} else {
			if($("#" + i).attr("data-active") == 1) {
				$("#" + i).attr("data-active", 0);
				$("#" + i).css('border', '');
			} else {
				$("#" + i).attr("data-active", 0);
			}
		}
	}
});

$('#add_account').click(function(){

	$.ajax({

		type: "POST",
		url: "/core/lib.php",
		data: {

			event_add_account: $('#add_account').val(),
			arena: $('#select_id_arena').html(),
			title: $('#title').val(),
			description: $('#description').val(),
			level: $('#level_add').val(),
			trophy: $('#trophy').val(),
			cards: $('#cards').val(),
			priced: $('#priced').val()

		},

		success: function(getter) {

			$('#result').html(getter);

		}

	});

});

$('#return_captcha').click(function(){

	$.ajax({

		type: "POST",
		url: "/api/lib.api.php",
		data: {

			event_go: $('#return_captcha').val(),
			response: $('#g-recaptcha-response').val()

		},

		success: function(getter) {

			$('#result').html(getter);

		}

	});

});

$('#search').click(function(){

	$.ajax({

		type: "POST",
		url: "/api/lib.api.php",
		data: {

			event_search: $('#search').val(),
			tag: $('#tag').val(),
			type: $('#check').val()

		},
		beforeSend: function() {
			$('#search').hide();
			$('#loader_show').show();
		},
		success: function(data) {
			$('#search').show();
			$('#loader_show').hide();
			if (data.response.type == 'success') {
				location.href = data.response.link;
			} else {
				modalShow('error', data.response.msg);
			}

		}

	});

});

function load(a) {

	if(a == 'colds') {

		$('#sub_one').css('border-bottom', '6px solid #8515e5');
		$('#sub_two').css('border-bottom', '');

		$('#colds_type').css('display', '');
		$('#cards_type').css('display', 'none');

	} else if(a == 'cards') {

		$('#sub_two').css('border-bottom', '6px solid #8515e5');
		$('#sub_one').css('border-bottom', '');

		$('#colds_type').css('display', 'none');
		$('#cards_type').css('display', '');

	} else {

		alert('Error / Unexpacted error!');

	}

}

$('.container-dropdown').click(function(e){
    e.preventDefault();
    $(this).find('.dropdown, .select').toggleClass('active');
});

function myFunction(name){
    document.getElementById("select").innerHTML = "" + name;
    $(function() {
       $('.dropdown li').on("click", function() {
           $('.dropdown li.active').not(this).removeClass('active');
           $(this).toggleClass('active');
       });  
    });
}




window.onload = function() {
	var numlok = $('img[data-active=0]').length;
	
	$('.Carousel__info').html('<h2> 1/'+numlok+' </h2>');
	if ($("div").is(".Carousel")) {
		var krcar = 
		$('.Carousel').krCarousel(
			'.Carousel__item',
			'.Carousel__nav',
			'.Carousel__next',
			'.Carousel__back',
			null,
			'.Carousel__info'
		);

		$('#zoomAp').click(function(){
			app();
		});


		$(window).bind('resizeEnd', function() {
			if ($('.bgforcar').css('position') == 'fixed') {
				krcar[0].setMaxHeight(1);
			}	else {
				krcar[0].setMaxHeight(0);
			}
			if (!$('.divtoggle').is(':visible') && !$('.Profile_menu').is(':visible')) {
				$('.Profile_menu').toggle();
			}
		});
		$(window).resize(function() {
			if(this.resizeTO) clearTimeout(this.resizeTO);
			this.resizeTO = setTimeout(function() {
				$(this).trigger('resizeEnd');
			}, 500);
		});
	}

	var krcar2;
	$('body').on('click', '.AdminScreen img', function(){
		$('.admcar').show();
		if ($('.bgforcar').css('position') != 'fixed') {
			krcar2 = 
			$('.Carousel').krCarousel(
				'.Carousel__item',
				'.Carousel__nav',
				'.Carousel__next',
				'.Carousel__back',
				null,
				'.Carousel__info',
				false
			);
			$('.bgforcar').css({
					'position': 'fixed', 'left': 0, 'right': 0, 'top': 0, 'bottom': 0, 'background-color': 'rgba(0,0,0,0.75)', 'z-index': 120
				});
			$('.Account__carousel').css({
					'position': 'fixed', 'left': 0, 'right': '20px', 'top': 0, 'bottom': 0, 'z-index': 130
				});
			$('.Carousel__item').css ({'height': 'auto'});
			krcar2[0].setMaxHeight(1);
		}
		var clicked = $(this).get( 0 );
		
		$('.AdminScreen').find("img").each(function( index ) {
			if ($(this).get( 0 ) == clicked) krcar2[0].scroll(index);
		});
	});
};
//krCarousel
(function($){
	var items,
		nav,
		timeout,
		maxheightimg = 510;
	$.fn.krCarousel = function(items, nav, next, back, custom, shownum, custom) {
		var config = {
			animate: 'scroll',
		};
		config = $.extend(config, custom);
		this.each(function () {
			var carousel = this;
			
			carousel.heightWith = function(n) {
				var height,
					lh = $(this).height();
				$(this).css('height', 'auto');
				this.items[n].css('position', 'static');
				height = $(this).height();
				$(this).height(lh);
				this.items[n].css('position', 'absolute');
				return height;
			}
			
			carousel.setMaxHeight = function(limit) {
				var height = 0,
					hdoc = document.documentElement.clientHeight;
				if (typeof (items) === "undefined") {
					var items = '.Carousel__item';
				}
				$(this).css('height', 'auto');
				$(items).css('height', 'auto');
				$(this).find(items).each(function( index ) {
					
					$(this).css('position', 'static');
					$(this).children( "img" ).css('margin-top', 0);
					height =  this.clientHeight > height ? this.clientHeight : height;
					if (height >maxheightimg && limit<1) {
						height = 510;
					}
					if (height>hdoc) {
						height = hdoc;
					}
					$(this).css('height', height+'px');
					$(this).css('position', 'absolute');
				});
				$(this).css('height', height+'px');
				if (limit <1) {
					$(this).find(items+" img").each(function( index ) {
						var ch = 0;
						ch = $(this).height();
						if (ch>0 && ch < height) {
							$(this).css('margin-top', Math.floor( (height-ch)/2)+'px');
						}
					});
				}	else {
					var tt = 0;
					$(this).find(items).each(function( index ) {
						if ($(this).children( "img" ).height() < hdoc) {
							tt = Math.floor( (hdoc-$(this).children( "img" ).height())/2);
							$(this).children( "img" ).css('margin-top', tt +'px');
							if ($(carousel).height()< (tt+$(this).children( "img" ).height())) $(carousel).css('height',  (tt+$(this).children( "img" ).height())+'px');

						}
					});
				}
				if (carousel.items.length > 1) $(nav).css('display', 'block');
			}
			
			carousel.items = [];
			if (items) $(this).find(items).each(function () {
				carousel.items[carousel.items.length] = $(this).css({
					position: 'absolute',
					left: '-100%',
					display: 'flex'
				});
			});
			if (carousel.items.length < 2) {
				$(nav).hide();
				$(back).hide();
				$(next).hide();
			}
			if (nav) carousel.nav = $(this).find(nav).click(function() {
				var n = $(this).index();
				carousel.scroll(n);
				return false;
			});
			carousel.nav = $(carousel.nav);
			if (next) $(next).click(function() {
				carousel.scrollNext(1);
				return false;
			});
			if (back) $(back).click(function() {
				carousel.scrollBack(1);
				return false;
			});

			$(carousel).css({overflow: 'hidden', position: 'relative'});
			carousel.active = 0;

			if (carousel.items.length >0 ) carousel.items[0].css('left', 0);
			carousel.nav.eq(0).addClass('_active');

			
			carousel.scroll = function(i) {
				var n = i - this.active,
					altn = -(n/Math.abs(n)) * (this.items.length - Math.abs(n));
				if (Math.abs(altn) < Math.abs(n)) n = altn;
				if (n > 0) {
					this.scrollNext(Math.abs(n));
				} else if (n < 0) {
					this.scrollBack(Math.abs(n));
				}
			}
			carousel.scrollNext = function(x) {
				if ( x == 0 ) return false;
				var l = this.items.length,
					a = this.active,
					el;
				if (config.animate=='fade') {
					a += x;
					carousel.fade(a);
				} else {
					for (var i=0; i<=x; i++) {
						el = this.items[a];
						var posStart = (i*100) + '%',
							posEnd = ((i-x)*100) + '%';
						el.css('left', posStart).animate({left: posEnd}, 500);
						this.active = a;
						a = ((a+1) < l) ? a+1 : 0;
					}
				}
				this.nav.removeClass('_active').eq(this.active).addClass('_active');
				if (this.timeout) $(this).runCarousel();
				if ((shownum)&&(carousel.items.length > 1)) {
					tmp = '<h2>'+(this.active+1)+'/'+carousel.items.length+'</h2>';
					$(shownum).html(tmp);
				}
			}
			carousel.scrollBack = function(x) {
				if ( x == 0 ) return false;
				var l = this.items.length,
					a = this.active,
					el;
				if (config.animate=='fade') {
					a -= x;
					carousel.fade(a);
				} else {
					for (var i=0; i<=x; i++) {
						el = this.items[a];
						var posStart = (-i*100) + '%',
							posEnd = ((x-i)*100) + '%';
						el.css('left', posStart).animate({left: posEnd}, 500);
						this.active = a;
						a = ((a-1) >= 0) ? a-1 : l-1;
					}
				}
				this.nav.removeClass('_active').eq(this.active).addClass('_active');
				if (this.timeout) $(this).runCarousel();
				if ((shownum)&&(carousel.items.length > 1)) {
					tmp = '<h2>'+(this.active+1)+'/'+carousel.items.length+'</h2>';
					$(shownum).html(tmp);
				}
			}

			carousel.fade = function(i) {
				if (i<0) i = this.items.length-1;
				else if (i>=this.items.length) i = 0;
				var a = $(this.items[this.active]),
					el = $(this.items[i]);
				el.hide().css({'z-index': 2, left: a.css('left')}).fadeIn(500);
				this.active = i;
				setTimeout(function(){ a.hide(); el.css({'z-index': 1}) }, 500);
			}

			carousel.setMaxHeight(0);
			//$(window).load(function(){carousel.setMaxHeight(0)});
		});

		return this;
	}

}(jQuery));




// Р С™Р В°РЎР‚РЎС“РЎРѓР ВµР В»РЎРЉ Р Т‘Р В»РЎРЏ РЎРѓРЎвЂљРЎР‚Р В°Р Р…Р С‘РЎвЂ РЎвЂ№ РЎРѓР С—Р ВµРЎвЂ  Р С—РЎР‚Р ВµР Т‘Р В»Р С•Р В¶Р ВµР Р…Р С‘РЎРЏ
var owl = $(".spec_prdlojenie .slider");
owl.owlCarousel({
	loop : true,
	items : 1,
	navigation : true,
	navigationText : ["",""],
	smartSpeed: 1200
});

$(".spec_prdlojenie .next_button").click(function() {
	owl.trigger("next.owl.carousel");
});
$(".spec_prdlojenie .prev_button").click(function() {
	owl.trigger("prev.owl.carousel");
});

var ds = $("#Drawing__res");
if (ds.children('a').length >3) {
	if (ds.width()>=490) {
		ds.owlCarousel({
			items:3,
			autoWidth: true,
			nav:true,
			navText: ["",""]
		});
	}	else {
		ds.owlCarousel({
			items:2,
			autoWidth: true,
			nav:true,
			navText: ["",""]
		});
	}
}

fs2 = $(".tost");
fs2.owlCarousel({
	items:1,
	autoWidth: true,
	loop : true,
	nav:true
});

//Init
function setOpt ()
{
	$('.Account__carousel').attr('style', '');
	return $('.Account__carousel').attr('style', '');
}

function app ()
{
	$('.Account__carousel').click();
}

function close_modal(id) {
	$('#' + id).hide();
}

function modalShow(type, text, custom = '', id = '') {

	if (id == '') {
		var id = randAa(8);
	}

	if (custom == 'reviews_success') {
		custom = '<input class="bt-menu _green coupon-btn btnbuy" value="РћРє" style="padding:10px 10px !important; border-radius: 6px; width: 150px !important; margin-bottom: 10px;" type="button" onclick="close_modal(\'' + id + '\')">';
	} else if (custom == 'buy_lottery') {
		custom = '<input class="bt-menu _green coupon-btn btnbuy" value="Р—Р°РЅСЏС‚СЊ РµС‰С‘ 10 РјРµСЃС‚" style="padding:10px 10px !important; border-radius: 6px; width: 250px !important; margin-bottom: 10px;" type="button" onclick="window.location.href=\'/buy.php?o=6\';">';
	}

	if (type == 'error') {
		var resp = '<div style="display: flex;justify-content: center;"> <a class="but" style="margin: 0px;border-radius: 5px;color:red; font-family: SupercellMagic, Arial; font-size: 20px; height: 5px;">РћС€РёР±РєР°!</a> </div><br> <p style="color:white;font-size: 19px;margin-top: 10px;margin-bottom: 0px; font-family: \'Ubuntu\', sans-serif; font-style: italic;">' + text + '</p>';
	} else if (type == 'warning') {
		var resp = '<div style="display: flex;justify-content: center;"> <a class="but" style="margin: 0px;border-radius: 5px;color:orange; font-family: SupercellMagic, Arial; font-size: 20px; height:5px;">Р’РЅРёРјР°РЅРёРµ!</a> </div><br><p style="color:white;font-size: 19px;margin-top: 10px;margin-bottom: 0px; font-family: \'Ubuntu\', sans-serif; font-style: italic;">' + text + '</p>';
	} else {
		var resp = '<div style="display: flex;justify-content: center;"> <a class="but" style="margin: 0px;border-radius: 5px;color:#13a51d; font-family: SupercellMagic, Arial; font-size: 20px; height: 5px;">РЈСЃРїРµС…!</a> </div><br><p style="color:white;font-size: 19px;margin-top: 10px;margin-bottom: 0px; font-family: \'Ubuntu\', sans-serif; font-style: italic;">' + text + '</p>';
	}
	$('#modals').append('<!--<script> location.hash = \'\'; <\/script><script> location.hash = \'' + type + '\'; </script> -->' +
	'<div id="' + id + '" class="modalDialog animated fadeIn" style="overflow-y: auto; z-index: 100; display: none; pointer-events: unset;">' +
	'<div class="ModalShadow">' +
	'<a title="" class="close" onclick="close_modal(\'' + id + '\')">X</a>' +
	'<center>' +
	'<div class="form-group">' +
	'<div id="nnameError">' + resp + '</div>' +
	'</div>' + 
	custom +
	'</center>' +
	'</div>' +
	'</div>');
	$('#' + id).show();
}

function randAa(n){  // [ 5 ] random big/small letters
  var s ='';
  while(s.length < n)
    s += String.fromCharCode(Math.random() *127).replace(/\W|\d|_/g,'');
  return s; //such as "AujlgLpHLVfDVpNEP"
}