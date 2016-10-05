// ------------------------------
// Menú principal
// ------------------------------

$(function () {
        
    $('body').on('click', 'ul.acc-menu a', function() {
        var LIs = $(this).closest('ul.acc-menu').children('li');
        $(this).closest('li').addClass('clicked');
        $.each( LIs, function(i) {
            if( $(LIs[i]).hasClass('clicked') ) {
                $(LIs[i]).removeClass('clicked');
                return true;
            }
            if($.cookie('admin_leftbar_collapse') !== 'collapse-leftbar' || $(this).parents('.acc-menu').length > 1) $(LIs[i]).find('ul.acc-menu:visible').slideToggle();
            $(LIs[i]).removeClass('open');
        });
        if($(this).siblings('ul.acc-menu:visible').length>0)
            $(this).closest('li').removeClass('open');
        else
            $(this).closest('li').addClass('open');
        if($.cookie('admin_leftbar_collapse') !== 'collapse-leftbar' || $(this).parents('.acc-menu').length > 1) $(this).siblings('ul.acc-menu').slideToggle({
            duration: 200,
            progress: function(){
                checkpageheight();
                if ($(this).closest('li').is(":last-child")) { //only scroll down if last-child
                    $("#sidebar").animate({
                        scrollTop: $("#sidebar").height()
                    },0);
                }

            },
            complete: function(){
                $("#sidebar").getNiceScroll().resize();
            }
        });
    });

    var targetAnchor;
    $.each ($('ul.acc-menu a'), function() {
        //console.log(this.href);
       
        if( this.href == window.location ) {
            targetAnchor = this;
            return false;
        }
    });

    var parent = $(targetAnchor).closest('li');
    while(true) {
        parent.addClass('active');
        parent.closest('ul.acc-menu').show().closest('li').addClass('open');
        parent = $(parent).parents('li').eq(0);
        if( $(parent).parents('ul.acc-menu').length <= 0 ) break;
    }

    var liHasUlChild = $('li').filter(function(){
        return $(this).find('ul.acc-menu').length;
    });
    $(liHasUlChild).addClass('hasChild');

    if($.cookie('admin_leftbar_collapse') === 'collapse-leftbar') {
        $('ul.acc-menu:first ul.acc-menu').css('visibility', 'hidden');
    }
    $('ul.acc-menu:first > li').hover(function() {
        if($.cookie('admin_leftbar_collapse') === 'collapse-leftbar')
            $(this).find('ul.acc-menu').css('visibility', '');
    }, function() {
        if($.cookie('admin_leftbar_collapse') === 'collapse-leftbar')
            $(this).find('ul.acc-menu').css('visibility', 'hidden');
    });


    // Reads Cookie for Collapsible Leftbar 
    // if($.cookie('admin_leftbar_collapse') === 'collapse-leftbar')
    //     $("body").addClass("collapse-leftbar");

    //Make only visible area scrollable
    $("#widgetarea").css({
        "max-height":$("body").height()
    });
    //Bind widgetarea to nicescroll
    $("#widgetarea").niceScroll({
        horizrailenabled:false
    });

    // Toggle Buttons
    // ------------------------------

    //On click of left menu
    $("a#leftmenu-trigger").click(function () {
        if ((window.innerWidth)<768) {
            $("body").toggleClass("show-leftbar");
        } else {
            $("body").toggleClass("collapse-leftbar");

            //Sets Cookie for Toggle
            if($.cookie('admin_leftbar_collapse') === 'collapse-leftbar') {
                $.cookie('admin_leftbar_collapse', '');
                $('ul.acc-menu').css('visibility', '');

            } else {
                $.each($('.acc-menu'), function() {
                    if($(this).css('display') == 'none')
                        $(this).css('display', '');
                });
                
                $('ul.acc-menu:first ul.acc-menu').css('visibility', 'hidden');
                $.cookie('admin_leftbar_collapse', 'collapse-leftbar');
            }
        }
        checkpageheight();
        leftbarScrollShow();
    });

    // On click of right menu
    $("a#rightmenu-trigger").click(function () {
        $("body").toggleClass("show-rightbar");
        widgetheight();
        
        if($.cookie('admin_rightbar_show') === 'show-rightbar')
            $.cookie('admin_rightbar_show', '');
        else
            $.cookie('admin_rightbar_show', 'show-rightbar');
    });

    resizeIframesScroll();
  

});



// Recalculate widget area on a widget being shown
$(".widget-body").on('shown.bs.collapse', function () {
    widgetheight();
});

// -------------------------------
// Sidebars Positionings
// -------------------------------

$(window).scroll(function(){
    $("#widgetarea").getNiceScroll().resize();
    $(".chathistory").getNiceScroll().resize();
    rightbarTopPos();
    leftbarTopPos();
});

$(window).resize(function(){
    widgetheight();

    rightbarRightPos();
    $("#sidebar").getNiceScroll().resize();
    
    resizeIframesScroll();
   
});
rightbarRightPos();





// -------------------------------
// Mobile Only - set sidebar as fixed position, slide
// -------------------------------

enquire.register("screen and (max-width: 767px)", {
    match : function() {
        // For less than 768px
        $(function() {

            //Bind sidebar to nicescroll
            $("#sidebar").niceScroll({
                horizrailenabled:false
            });
            leftbarScrollShow();  

            //Click on body and hide leftbar
            $("#wrap").click(function(){
                if ($("body").hasClass("show-leftbar")) {
                    $("body").removeClass("show-leftbar");
                    leftbarScrollShow();
                }
            });

            //Fix a bug
            $('#sidebar ul.acc-menu').css('visibility', '');

            //open up leftbar
            $("body").removeClass("show-leftbar");
            $.removeCookie("admin_leftbar_collapse");

            $("body").removeClass("collapse-leftbar");
            
             $("body").removeClass("show-rightbar");
            $.removeCookie("admin_rightbar_show");    
        });

        console.log("match");
    },
    unmatch : function() {

        //Remove nicescroll to clear up some memory
        $("#sidebar").niceScroll().remove();
        $("#sidebar").css("overflow","visible");

        console.log("unmatch");

        //hide leftbar
        $("body").removeClass("show-leftbar");

    }
});

//Helper functions
//---------------

//Fixing the show of scroll rails even when sidebar is hidden
function leftbarScrollShow () {
    if ($("body").hasClass("show-leftbar")) {
        $("#sidebar").getNiceScroll().show();
    } else {
        $("#sidebar").getNiceScroll().hide();
    }
    $("#sidebar").getNiceScroll().resize();
}

//set Top positions for changing between static and fixed header
function leftbarTopPos() {
    var scr=$('body.static-header').scrollTop();
    if (scr<41) {
        $('ul#sidebar').css('top',40-scr + 'px');
    } else {
        $('ul#sidebar').css('top',0);
    }
}

function rightbarTopPos() {
    var scr=$('body.static-header').scrollTop();
    if (scr<41) {
        $('#page-rightbar').css('top',40-scr + 'px');
    } else {
        $('#page-rightbar').css('top',0);
    }
}

//Set Right position for fixed layouts
function rightbarRightPos () {
    if ($('body').hasClass('fixed-layout')) {
        var $pc = $('#page-content');
        var ending_right = ($(window).width() - ($pc.offset().left + $pc.outerWidth()));
        if (ending_right<0) ending_right=0;
        $('#page-rightbar').css('right',ending_right);
    }
}

// Match page height with Sidebar Height
function checkpageheight() {
    sh=$("#page-leftbar").height();
    ch=$("#page-content").height();

    if (sh>ch) $("#page-content").css("min-height",sh+"px");
}

// Recalculate widget area to area visible
function widgetheight() {
    $("#widgetarea").css({
        "max-height":$("body").height()
    });
    $("#widgetarea").getNiceScroll().resize();
}





// -------------------------------
// Tornar amunt
// -------------------------------

$('#back-to-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
    return false;
});

   
// -------------------------------
// Menú aplicacions
// -------------------------------

    adjustMenuAplis();

    $(window).resize(function(){
        adjustMenuAplis();
    });


    function adjustMenuAplis(){

        var windowHeight = $(window).height();
        var zonaAplis = $('#headerbar').height() + 20;


        if (zonaAplis > windowHeight){
            $('#headerbar').css('position','absolute');  
        }

        else{
            $('#headerbar').css('position','fixed');  
        }


    }



var ua = navigator.userAgent;
event2 = (ua.match(/iPad/i)) ? "touchstart" : "click";
var bajo = true;

$('#headerbardropdown').bind("click",function() {
    $('#headerbar').css('top',0);
    bajo = false;          
    return false;   
});



if ($('iframe#frameApp').length) {
    $('#frameApp').load(function() {

        window.scrollTo(0,0);

        var bodyIframes = $('iframe').contents().find('body');
        var bodyIframes2 = $('iframe').contents().find('iframe').contents().find('body');

        $(bodyIframes).bind(event2,function() {
            if (bajo == false){
                $('#headerbar').css('top','-5000px'); 
                $('.perfiles').popover('hide');
                bajo = true;  
            }else{
        }
        });

        $(bodyIframes2).bind(event2,function() {
            if (bajo == false){
                $('#headerbar').css('top','-5000px');
                $('.perfiles').popover('hide');
                bajo = true; 
            }else{
        }
        });
    });
} 

   
  $('#page-container').bind(event2,function() {
      $('#headerbar').css('top','-5000px');
      //$('.perfiles').popover('hide');
  });
  
  $('#wrap').bind(event2,function() {
      $('#headerbar').css('top','-5000px'); 
     //$('.perfiles').popover('hide');
  });
  
  $('#buttonDropDown').click(function() {
      $('#headerbar').css('top','-5000px');
      $('.perfiles').popover('hide');
  });   

// -------------------------------
// Iframe resizing SCS
// -------------------------------

function resizeIframesScroll(){

    $("#frameApp").load(function(){
        
        if ($('iframe#frameApp').length) {

            recalcularFrameApp();
        }

        
    })

    // -------------------------------
    // Gestion del footer y page-content
    // -------------------------------

    $(document).ready(function(){
        
        var headerAlt2 = $("header").height()
        var ventanaAlt = $(window).height();
        var ventanaAltFinal = ventanaAlt - headerAlt2


        $("#page-content").css("min-height", ventanaAltFinal);
        $("footer").css("position", "fixed");
        $("footer").css("bottom", "0");
        $("footer").css("width", "100%");
        $("footer").css("display", "none");
    });


    $(window).scroll(function() {
        if ($(this).scrollTop() < 200) {
            $("footer").fadeOut(500);
        }
        else {
            $("footer").fadeIn(500);
        }
    });

}

function recalcularFrameApp(){

            var IframeBody = $('#frameApp').contents().find('body');
           
            var imatgePortada = $('#frameApp').contents().find('#portada');
            
            
            var iframeAlt = $(IframeBody).height();
            
            if ($(imatgePortada).length) {
            
              var iframeTotal = iframeAlt + 400;                           
            }
            else{
              var iframeTotal = iframeAlt + 100;
            }                             
            var pageContent = iframeAlt + 300;
            $("#frameApp").height(iframeTotal);

            if (iframeAlt <= pageContent){
                var headerAlt2 = $("header").height()
                var ventanaAlt = $(window).height();
                var ventanaAltFinal = ventanaAlt - headerAlt2
                $("#page-content").css("min-height", ventanaAltFinal);

            }else{
                $("#page-content").css("min-height", pageContent);

        }
}
    
// -------------------------------
//   Mostar/Amagar aplicacions dashboard
// -------------------------------

$(".verMas").click(function(){

    /*$(".BotonesAesconder").removeClass('VermasOcultos');*/
    $(".menuInicio .BotonesAesconder").fadeIn(500);
    /*$(".BotonesAesconder").fadeIn(500);*/

    $(".verMas").fadeOut(function(){
        $(".verMas2").fadeIn();
    });

    $(".mostrando2").fadeOut(0);
    $(".mostrando3").fadeIn(500);

});


$(".verMas2").click(function(){

    $(".menuInicio .BotonesAesconder").fadeOut(500);
    /*$(".BotonesAesconder").addClass('VermasOcultos');*/
    
    $(".verMas2").fadeOut(function(){
        $(".verMas").fadeIn();
    });


    $(".mostrando3").fadeOut(0);
    $(".mostrando2").fadeIn(500);
    
    $('body,html').animate({
        scrollTop: 0
    }, 500);
   
});

// -------------------------------
//   Perfil - claves
// -------------------------------

$('.perfiles').popover();

$('.perfiles').on('shown.bs.popover', function () {
    function toggleChevron(e) {
        $(e.target).prev('.panel-heading').find('i.desplegable').toggleClass('fa-chevron-right fa-chevron-down');
    }

    $('.accordion').on('show.bs.collapse', toggleChevron);
    $('.accordion').on('hide.bs.collapse', toggleChevron);
  
});

$('body').on('click', function (e) {
    $('.perfiles').each(function () {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            $(this).popover('hide');
        }
    });
});
 

// -------------------------------
//  Mobile
// -------------------------------




if (ua.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {

    if ($('iframe#frameApp').length) {
        $('iframe#frameApp').load(function() {
      
            var exps =  $('iframe#frameApp').contents().find('#navInterna');
            var exps2 =  $('iframe#frameApp').contents().find('#navInterna ul ul li a');
      
            $(exps).addClass('mobil');
      
            event3 = (ua.match(/iPad/i)) ? "touchstart" : "click";
      
            $(exps2).bind(event3,function() {
                var link = $(this).attr('href');

                $('iframe#frameApp').attr('src', link)
            });
        });
    } 
    
}    
   
else {
    $('.tooltips').tooltip();
}