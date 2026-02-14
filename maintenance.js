$(document).ready(function(){

    /******************************************
    事前準備
    *******************************************/

    //タブボタンの数を取得
    var tabQuantity = $('.tab-button').length;

    var tabTotal = 0;
    $('.tab-button').each(function(){
        tabTotal += $(this).outerWidth();
    });

    $('.tab').css('width',tabTotal + 1);


    //タブの長さとボディの長さの差分を取得
    var tabExtraDistance = $('.tab').width() - $('.tab-container').width();

    /******************************************
    スライダー発動
    *******************************************/

    var slider = $('.contents').bxSlider({
        pager:false,
        controls:false,
        oneToOneTouch: false,
        preventDefaultSwipeX: false,
        onSlideBefore: function($slideElement, oldIndex, newIndex){
            //スライドする時に関数を呼び出す。newIndexはスライダーの現在地。
            slideChange(newIndex);
        }
    });

    /******************************************
    スライドする時に発動する関数。タブの表示調整を行う。
    *******************************************/

    function slideChange(newIndex){

        //クラスを調整
        $('.tab-button').removeClass('active');
        $('.tab > div:nth-child(' + ( newIndex + 1 ) + ')').addClass('active');

        //スクロールするべき距離を取得。タブ全体の長さ / ( タブの個数 - 1 ) * スライドの現在地
        var scrollDestination = ( tabExtraDistance / (tabQuantity - 1) ) * ( newIndex );

        //スクロール位置を調整
        $('.tab-container').animate({ scrollLeft: scrollDestination }, 500);

    }

    /******************************************
    タブナビゲーション固定
    *******************************************/
    var distance = $('.tab-container').offset().top;
    var tabHeight = $('.tab-container').height();
    var footerHeight = $('.footer').height();
    var windowHeight = $(window).height() - tabHeight - footerHeight + 25; // -35 → +25 に修正(+60)

    $('.tab-contents').css('min-height', windowHeight + 'px');

    $(window).on('scroll',function(){
        scrollAmount = $(document).scrollTop();
        if(scrollAmount > distance) {
            $('.tab-container').addClass('tab-fixed',700,'linear');
        } else {
            $('.tab-container').removeClass('tab-fixed',300,'linear');
        }
    });

    /******************************************
    タブボタンクリックで発動する関数
    *******************************************/
    var newdistance = 0;
    var parent = $('.click-change-contents');
    $('#engine').show();

    $('.tab-button').on('click',function(e){

        //何番目の要素かを取ってスライドを移動する
        var nth = $('.tab-button').index(this);
        /*slider.goToSlide(nth);*/
        slideChange(nth);

        var t_name = $(this).attr('data-name');
        // コンテンツの表示・非表示
        parent.find('.tab-contents').hide();
        parent.find('#' + t_name).fadeIn(400);

        if($(this).parents('.tab-container').hasClass('tab-fixed')) {
            $(window).scrollTop(distance);
        }

        //クリックイベントを無効化
        e.preventDefault();

    });

    /******************************************
    表示に関する関数
    *******************************************/

    $('html,body').animate({ scrollTop: 0}, '1');

    var flg = false;
    var headerHight = $('header').outerHeight();

    $('#nav-close').css('top', headerHight);

    $('#nav-input').on('click', function() {
        if (!flg) {
            $('#nav-content').css('top', headerHight);
            flg = true;
        } else {
            $('#nav-content').css('top', '0px');
            flg = false;
        }
    });


    /* フッター調整 */
    var footerHeight = $('footer').height();
    var maxHeight = 0;
    $('.tab-contents').each(function(){
        if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
        }

/*        if($(this).height() == maxHeight) {
            $(this).css('padding-bottom',footerHeight + 'px');
        }*/
    });

    /* 特捜車対応 */
    $('.contents-change-title').on('click',function(){
        if($(this).next().hasClass('initial-hidden')){
          $(this).next().removeClass('initial-hidden');
          $(this).find('span').text('－');
        } else {
          $(this).next().addClass('initial-hidden');
          $(this).find('span').text('＋');
        }
    });


    /******************************************
    ラジオボタンを二度押しした際にチェックが外れるための関数(誤操作対応)
    *******************************************/

    var checklist = [];
    $('input[type="radio"]:checked:not(.notcancel)').each(function(){
        checklist.push($(this).attr('id'));
    });

    $('input[type="radio"]:not(.notcancel)').on('click',function(){

        var index = $.inArray($(this).attr('id'),checklist);

        /* クリックした対象にチェックが付いているとき */
        if(index >= 0) {
            $(this).prop('checked',false);
            checklist.splice(index,1);
        } else {

            /* クリックした対象にチェックが付いていないとき */
            var name = $(this).attr('name');

            $('input[name="' + name + '"]').each(function(){

                var sameIdx = $.inArray($(this).attr('id'), checklist);
                if (sameIdx >= 0) {
                    checklist.splice(sameIdx,1);
                }
            });
            checklist.push($(this).attr('id'));
        }
    });

    /******************************************
    「溝の深さ」などの連続入力対応
    *******************************************/
    $('input[type=number]').keypress(function(e){

        var parentLi = $(this).parent('li');


        if( e.which == 13 ){
            parentLi.next().find('input[type=number]').focus();
            return false;
        }
    });

});