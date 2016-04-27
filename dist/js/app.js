$(document).ready(function() {
    (function($) {
        $.fn.menu = function(opts) {
            // default configuration
            var config = $.extend({}, {
                opt1: null
            }, opts);
            // main function
            function init(obj) {
                var dObj = $(obj);
                var dMenulink = dObj.find('.nav-btn');
                var dAllLink = dObj.find('.nav-menu a');

                dMenulink.click(function() {
                    dObj.toggleClass('nav--active');
                    // $('body').toggleClass('_freeze');
                });

                dAllLink.click(function() {
                    dObj.removeClass('active')
                });
            }
            // initialize every element
            this.each(function() {
                init($(this));
            });
            return this;
        };
        // start
        $(function() {
            $(".nav").menu();
        });
    })(jQuery);

});

$(document).ready(function() {
    var md = new MobileDetect(window.navigator.userAgent);
    var isMobile = md.phone() != null || md.tablet() != null  || window.innerWidth <= 640;
    var isIE = true;
    //
    var martrix_length = [9,9];

    //viewport options
    var viewport_w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    var viewport_h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    console.log(viewport_w);
    console.log(viewport_h);
    //images options
    var imgUrl = [
        '',
        '/images/bg-1.jpg',
        '/images/bg-2.jpg',
        '/images/bg-3.jpg',
        '/images/bg-4.jpg'
    ];
    var img_w = 1980;
    var img_h = 1200;

    


    //tween options
    var delayUnit= 0.1;
    var switchType = {};


    //status
    var isFront = true;
    var current = 0;

    var tl_switch = new TimelineLite({
        paused: true,
        immediaterender:false,
        smoothChildTiming: true,
        onComplete: function(){
            // TweenMax.to(".demo-item",1.5, {boxShadow: "0 0 0px 0px rgba(255,255,255,0)"});

        }
    });

    var itemHtml = '';
    var $items = {};
    var imageCorpPos = [];
    var matrix = math.zeros(martrix_length[1], martrix_length[0]);
    var itemSize = [ Math.ceil(viewport_w/martrix_length[0]) , Math.ceil(viewport_h/martrix_length[1])];//寬高


    function calculateLayout(){
        if(isMobile){
            martrix_length = [5,5];
            imgUrl = [
                '',
                '/images/bg-1.jpg',
                '/images/bg-2.jpg',
                '/images/bg-3.jpg',
                '/images/bg-4.jpg'
            ];
        }else {
            if(viewport_w > 1440){
                imgUrl = [
                    '',
                    '/images/bg-1.jpg',
                    '/images/bg-2.jpg',
                    '/images/bg-3.jpg',
                    '/images/bg-4.jpg'
                ];
                img_w = 1920;
                img_h = 1080;
            } else if(viewport_w > 1280) {
                imgUrl = [
                    '',
                    '/images/bg-1.jpg',
                    '/images/bg-2.jpg',
                    '/images/bg-3.jpg',
                    '/images/bg-4.jpg'
                ];
                img_w = 1920;
                img_h = 1080;
            } else {
                imgUrl = [
                    '',
                    '/images/bg-1.jpg',
                    '/images/bg-2.jpg',
                    '/images/bg-3.jpg',
                    '/images/bg-4.jpg'
                ];
                img_w = 1920;
                img_h = 1080;
            }
        }
        imageCorpPos = [Math.floor((viewport_w - img_w)/2),Math.floor((viewport_h - img_h)/2)]
        matrix = math.zeros(martrix_length[1], martrix_length[0]);
        itemSize = [ Math.ceil(viewport_w/martrix_length[0]) , Math.ceil(viewport_h/martrix_length[1])];//寬高
    };

    function loadSence(){
    };


    function resetSence(){
        current = 0;
        tl_switch.clear();
    };


    function generationSence(opts){
        
        $('.demo__area').css({
            width: itemSize[0]*martrix_length[0]+'px',
            height: itemSize[1]*martrix_length[1]+'px'
        });

        matrix.forEach(function(value, index, matrix) {
            var bgStyle = 'background-position:'+(index[1]*itemSize[0]*-1+imageCorpPos[0])+'px '+(index[0]*itemSize[1]*-1+imageCorpPos[1])+'px;';
            var bgCurrentImg = 'background-image: url('+imgUrl[0]+');';
            var bgNextImg = 'background-image: url('+ imgUrl[1]+');';
            var wStyle = 'width:'+itemSize[0]+'px;';
            var hStyle = 'height:'+itemSize[1]+'px;';
            
            itemHtml = itemHtml +'<div class="demo__item" data-x='+index[0]
                                +' data-y='+index[1]
                                +' style='+ wStyle+hStyle
                                +' data-index='+index[0]+'-'+index[1]+'><span class="front" style="'+bgStyle+bgCurrentImg+'"></span><span class="back" style="'+bgStyle+bgNextImg+'"></span></div>'; 
        });

        $('.demo__area').html(itemHtml);
        TweenMax.set(".demo__area", {
            perspective:1000,
            backgroundPosition: imageCorpPos[0]+'px '+ imageCorpPos[1]+'px'
        });
        TweenMax.set(".demo__item", {transformStyle:"preserve-3d"});
        TweenMax.set(".demo__item .back", {rotationY:-180});
        TweenMax.set([".demo__item .back", ".demo__item .front"], {backfaceVisibility:"hidden"});


    };

    function generationTl(next){
        tl_switch.clear();
        var dNextFace = {};
        var tranOpacity = 1;
        
        if(isIE){
            TweenMax.set('.demo__item .front', {backgroundImage:'url('+imgUrl[current]+')'});
            TweenMax.set('.demo__area', {backgroundImage:'url('+imgUrl[next]+')'});
            TweenMax.set(".demo__item",{
                opacity:1,
                rotationY: 0
            });
            tranOpacity = 0;
        } else {
            if(isFront){
                dNextFace = $(".demo__item .back");
            }else {
                dNextFace = $(".demo__item .front");    
            }
            TweenMax.set(dNextFace, {backgroundImage:'url('+imgUrl[next]+')'});
        }

        // console.log(dNextFace);
        // console.log(isFront);
        // console.log(imgUrl[next]);

        $('.demo__item').each(function(idnex,item) {
            var dItem = $(item);
            var startTime = delayUnit*((dItem.data('x')+1)+(dItem.data('y')+1)-1);

            tl_switch
            .add(TweenMax.to(dItem,2,{ 
                transformOrigin:"50% 50%",
                rotationY: '+='+180*3,
                boxShadow: "0 0 0px 2px rgba(255,255,255,0.3)",
                opacity: tranOpacity,
                ease: Power2.easeInOut
            }),startTime)
            .add(TweenMax.to(dItem,0.3,{ 
                transformOrigin:"50% 50%",
                boxShadow: "0 0 0px 0px rgba(255,255,255,0.0)",
                ease: Power2.easeInOut
            }),startTime+2+0.25)
            ;
        });

        tl_switch.add(function(){
            isFront = isFront? false:true;
            current = next;
        },'+=0');


    };

    function init(){
        resetSence();
        calculateLayout();
        generationSence();
        goNext(1);
    };

    function goNext(next){
        generationTl(next);
        tl_switch.play();
    };

    init();

    $('.demo__ctrl--next').click(function(){
        if(current < imgUrl.length-1){
            next = current+1;
        }else {
            next = 0;
            current = 0;
        }
        goNext(next);           
    });

    $( window ).resize(function() {
        tl_switch.clear();
        init();
    });




});
