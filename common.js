$(document).ready(function() {

    /******************************************
    ヘッダーメニュー表示時の対応
    *******************************************/
    var headerCheck = $('input.nav-unshown');
    headerCheck.prop('checked', false);

    headerCheck.on('click', function() {
        if (!$(this).hasClass('is-nav-visible')) {
            $(this).addClass('is-nav-visible');
            $('#nav-content').addClass('is-content-visible', 700, 'linear');
            $('html,body').css('overflow', 'hidden');
            $(window).on('touchmove.noScroll', function(e) {
                e.preventDefault;
            });
        } else {
            $(this).removeClass('is-nav-visible');
            $('#nav-content').removeClass('is-content-visible', 700, 'linear');
            $('html,body').css('overflow', 'visible');
            $(window).off('.noScroll');
        }
    });

    /******************************************
    ログインフォーム対応
    *******************************************/
    $('#loginId').keypress(function(e) {
        if (e.which == 13) {
            $('#password').focus();
            return false;
        }
    });

    /******************************************
    タブナビゲーション固定
    *******************************************/
    if ($('.nav-tabs')[0]) {
        var carRoot = $('.car-another-contents');
        var carNav = carRoot.find('.nav-tabs');
        var tabHeight = carNav.height();
        var windowHeight = $(window).height() + tabHeight;
        var distance = carNav.offset().top;

        $('#nav-final').css('min-height', windowHeight + 'px');

        $(window).on('scroll', function() {
            var scrollAmout = $(document).scrollTop();
            if (scrollAmout > distance) {
                carNav.addClass('tab-fixed', 700, 'linear');
            } else {
                carNav.removeClass('tab-fixed', 700, 'linear');
            }
        });

        carNav.find('.nav-link').on('click', function() {
            if (carNav.hasClass('tab-fixed')) {
                $(window).scrollTop(distance);
            }
        });
    }


    /******************************************
    トグルコンテンツ対応
    *******************************************/
    if ($('.toggle-title-area')[0]) {
        var toggleController = $('.toggle-title-area');

        toggleController.on('click', function() {
            var toggleContents = $(this).next('.invisible-contents');
            if (toggleContents.hasClass('show')) {
                toggleContents.removeClass('show');
                $(this).find('.btn-visible').text("＋");
            } else {
                toggleContents.addClass('show');
                $(this).find('.btn-visible').text("－");
            }
        });
    }

    /******************************************
    フォーカス対応
    *******************************************/
    $('input[type="text"],input[type="number"],textarea').focus(function() {
        $('footer').fadeOut();
    });

    $(document).on('click', function(event) {
        var tName = $(event.target)[0].tagName;
        var visibleModal = $(".picker-modal").is(":visible");
        if (tName != "INPUT" && tName != "TEXTAREA" && visibleModal === false) {
            setTimeout(function() {
                $('footer').show();
            }, 400);
        }
    });

    /******************************************
    点検メモ対応
    *******************************************/
    var detailRoot = $('.detail-main'),
        editButton = detailRoot.find('#checkMemoEdit'),
        cancelButton = detailRoot.find('#checkMemoChacel'),
        saveButton = detailRoot.find('#checkMemoSave'),
        checkMemo = detailRoot.find('#checkMemo');

    if (editButton[0] && cancelButton[0] && saveButton[0]) {

        editButton.on('click', function() {
            checkMemo.css('background', '#fff');
        });

        cancelButton.on('click', function() {
            checkMemo.css('background', '#f4f4f4');
        });

        saveButton.on('click', function() {
            checkMemo.css('background', '#f4f4f4');
        });

    }

    /******************************************
    ラジオボタンを二度押しした際にチェックが外れるための関数(誤操作対応)
    *******************************************/

    var checklist = [];
    $('input[type="radio"]:checked:not(.notcancel)').each(function() {
        checklist.push($(this).attr('id'));
    });

    $('input[type="radio"]:not(.notcancel)').on('click', function() {

        var index = $.inArray($(this).attr('id'), checklist);

        /* クリックした対象にチェックが付いているとき */
        if (index >= 0) {
            $(this).prop('checked', false);
            checklist.splice(index, 1);
            pushTwiceRadio($(this), false);
        } else {

            /* クリックした対象にチェックが付いていないとき */
            var name = $(this).attr('name');

            $('input[name="' + name + '"]').each(function() {

                var sameIdx = $.inArray($(this).attr('id'), checklist);
                if (sameIdx >= 0) {
                    checklist.splice(sameIdx, 1);
                }
            });
            checklist.push($(this).attr('id'));
        }
    });

    /******************************************
    チェックボックス対応
    *******************************************/
    var checkLabel = $('.contents-checkbox-box label');
    checkLabel.each(function() {
        var checkBox = $(this).find('input[type="checkbox"]');

        /* ロード後の処理 */
        if (checkBox.prop('checked') != false) {
            checkBox.nextAll('.check-title').addClass('selected');
        } else {
            checkBox.nextAll('.check-title').removeClass('selected');
        }

        /* チェンジ後の処理 */
        checkBox.change(function() {
            if ($(this).nextAll('.check-title').hasClass('selected')) {
                $(this).nextAll('.check-title').removeClass('selected');
            } else {
                $(this).nextAll('.check-title').addClass('selected');
            }
        });
    });



    /******************************************
    メンテナンス照会
    *******************************************/
    if ($('.maintenance').length > 0 && $('.is-inquiry').length > 0) {

        /* テキストエリア対策 */
        $('input[type="number"],input[type="month"],input[type="date"],input[type="text"]').each(function() {
            if ($(this).val() !== '' && !$(this).hasClass('onTeedaError')) {
                $(this).css({
                    background: '#fff',
                    color: '#333'
                });
            }
        });

        /* ラジオボタン対策 */
        $('input[type="radio"]').each(function() {
            if (!$(this).hasClass('onTeedaError') && $(this).attr('checked') == 'checked') {
                $(this).parent('.content-radio-block').css({
                    background: '#fff',
                    color: '#333'
                });
            } else if ($(this).hasClass('onTeedaError') && $(this).attr('checked') == 'checked') {
                $(this).parent('.content-radio-block').css({
                    background: '#fdeef0',
                    color: '#333',
                    borderColor: '#d10606'
                });
            }
        });

        $('input[type="checkbox"]').each(function () {
            if ($(this).hasClass('onTeedaError')) {
                $(this).parent('label').css({
                    background: '#fdeef0',
                    borderColor: '#d10606'
                });
            } else if (!$(this).hasClass('onTeedaError') && $(this).attr('checked') == 'checked') {
                 $(this).parent('label').css({
                    background: '#fff',
                    color: '#333'
                });
            }
        });

        $('select').each(function() {
            if ($(this).hasClass('onTeedaError')) {
                $(this).css({
                    background: '#fdeef0',
                    borderColor: '#d10606'
                });
            }
        });

    } else {
        $('input[type="month"],input[type="date"],input[type="number"],textarea,input[type="text"]').each(function() {
            if ($(this).hasClass('onTeedaError')) {
                $(this).css({
                    background: '#fdeef0',
                    borderColor: '#d10606'
                });
            }
        });

        $('input[type="radio"]').each(function() {
            if ($(this).hasClass('onTeedaError')) {
                $(this).parent('.content-radio-block').css({
                    background: '#fdeef0',
                    borderColor: '#d10606'
                });
            }
        });

        $('input[type="checkbox"]').each(function() {
            if ($(this).hasClass('onTeedaError')) {
                $(this).parent('label').css({
                    background: '#fdeef0',
                    borderColor: '#d10606'
                });
            }
        });

        $('select').each(function () {
            if ($(this).hasClass('onTeedaError')) {
                $(this).css({
                    background: '#fdeef0',
                    borderColor: '#d10606'
                });
            }
        });
    }

    /******************************************
    アラートモーダル
    *******************************************/
    var alertModal = $('.alert-modal .alert-modal-content');
    if (alertModal[0]) {
        alertModal.each(function() {
            var alertHeight = $(this).outerHeight();
            $(this).css('margin-top', '-' + alertHeight / 2 + 'px');
        });
    }

    /******************************************
    照会画面対策
    *******************************************/
    var inquiryRoot = $('.is-inquiry');

    if ($('.maintenance').length <= 0) {
        inquiryRoot.find('input').each(function() {
            if ($(this).attr('checked') == 'checked' && $(this).attr('type') == 'radio') {
                if ($(this).hasClass('error')) {
                    $(this).parent('.content-radio-block').addClass('error-display');
                    $(this).parents('.content-radio').next('span').find('textarea').addClass('error-display');
                } else {
                    $(this).parent('.content-radio-block').addClass('normal-display');
                }
            } else if ($(this).attr('checked') == 'checked' && $(this).attr('type') == 'checkbox') {
                if ($(this).hasClass('error')) {
                    $(this).parent('label').addClass('error-display');
                } else {
                    $(this).parent('label').addClass('normal-display');
                }
            }

        });

        inquiryRoot.find('input[type="month"],input[type="date"],input[type="number"],input[type="text"]').each(function() {

            var iValue = $(this).val();

            if (iValue !== "") {
                $(this).css('background', '#fff');
            }

        });

        inquiryRoot.find('select').each(function () {
            var iValue = $(this).val();
            if (iValue !== "") {
                $(this).css('background', '#fff');
            }
        });

        /*        inquiryRoot.find('.sending-text').each(function(){
                    if($(this).text() !== ""){
                        $(this).css('background','#fff');
                    }
                });*/
    }

    /******************************************
    諸々あわせ
    *******************************************/
    var hiRoot = $('.inquiry-block');
    hiRoot.each(function() {
        var hiHeight = $(this).outerHeight();
        $(this).find('.inquiry-text').css({
            height: hiHeight + 'px',
            lineHeight: hiHeight + 'px'
        });
    });

    /******************************************
    出発前確認、帰着時確認
    *******************************************/
    var tabNaviRoot = $('.tab-nav-area');
    var tabNavi = tabNaviRoot.find('.tab-nav');

    if (tabNavi[0]) {
        tabNavi.each(function() {
            $(this).on('click', function() {
                if (!$(this).hasClass('active')) {

                    /* 初期化 */
                    tabNavi.removeClass('active');
                    $('.tav-display').removeClass('is-visible');

                    /* 切替 */
                    $(this).addClass('active');

                    var iName = $(this).attr('id').replace('-nav', '');
                    $(`#${iName}`).addClass('is-visible');

                }
            });
        });
    }

    /******************************************
    ラジオボタン無効時対応
    *******************************************/
    var disableRadio = $('input[type="radio"]:disabled');

    if (disableRadio[0]) {
        disableRadio.each(function() {
            if ($('.is-inquiry').length <= 0) {
                $(this).parent('.content-radio-block').css('background', '#f4f4f4');
                // ラジオボタン無効 かつ 貸出準備画面 給油カードの確認 で 1：OK の場合
                if ( $(this).attr('id') == 'fuelCardCondition1' ){
                    $(this).parent('.content-radio-block').css('borderColor', '#afafaf');
                }
            }

        });
    }

    /******************************************
    必須項目の初期段階赤枠対応
    *******************************************/
    // ラジオボタン2回押しの赤枠対応
    function pushTwiceRadio(obj, checked) {
        var radio = $(obj).parents('.content-radio');
        if ($(obj).parents('.contents-block').prev().find('span').css('display') === 'none') {
            radio.find('.content-radio-block').removeClass('needs-input');
        } else {
            radio.find('.content-radio-block').addClass('needs-input');
            // ラジオボタン2回押しが 貸出準備画面 給油カードの確認 で 2：OK（交換） または 3：NG（稼動停止）
            if ( $(obj).attr('id') == 'fuelCardCondition2' || $(obj).attr('id') == 'fuelCardCondition3') {
                // 給油カードの確認 が 1：OK かつ disabled
                if ($('#fuelCardCondition1').prop('disabled')) {
                    $('#fuelCardConditionOK1').removeClass('needs-input');
                }
            }
        }
    }

    /******************************************
    ページの先頭に戻るボタン対応
    *******************************************/
    $('#pagetop a[href^="#"]').on('click', function() {
        var speed = 500;
        var href = $(this).attr('href');
        var target = $(href === '#' || href === '' ? 'html' : href);
        var position = target.offset().top;
        $('html, body').animate({scrollTop: position}, speed, 'swing');
        return false;
    });

    var pagetop = $('#pagetop');
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            pagetop.fadeIn();
        } else {
            pagetop.fadeOut();
        }
    });

    /******************************************
    スムーススクロール追加（在庫状況検索）
    *******************************************/
    $('.stocksearch-list-main a[href^="#"]').on('click', function() {
        var speed = 500;
        var href = $(this).attr('href');
        var target = $(href === '#' || href === '' ? 'html' : href);
        var position = target.offset().top;
        $('html, body').animate({scrollTop: position}, speed, 'swing');
        return false;
    });

    /******************************************
    アコーディオンの開閉（車両詳細、在庫状況確認画面）
    *******************************************/
    $("#btnStockPlace").on("click", function() {
      $(this).parent().toggleClass('isActive');
      $(this).parent().parent().next().toggle();
    });

    /******************************************
    もっと見る（車両詳細、出発予定一覧、帰着予定一覧）
    *******************************************/
    $('.morelink').on('click', function() {
        var elm = $(this).parent();
        elm.toggleClass('isOpend'); //.morelink-wrap
        elm.prev().toggleClass('isOpend');  //.more
    });

});

$(window).on('load', function () {
    /******************************************
    必須項目の初期段階赤枠対応
    *******************************************/
    var needsClass = $('h2.needs span');
    var contentsBlock = $('h2.needs + div.contents-block');

    if (location.href.match(/taw010[2-8]001.html\?/gi) !== null || location.href.match(/taw010[2-8]001.html$/gi) !== null
        || location.href.match(/taw0101005.html\?/gi) !== null || location.href.match(/taw0101005.html$/gi) !== null
        || location.href.match(/taw010[2-46-8]003.html\?/gi) !== null || location.href.match(/taw010[2-46-8]003.html$/gi) !== null
        || location.href.match(/taw040100[1-2].html\?/gi) !== null || location.href.match(/taw040100[1-2].html$/gi) !== null
        || location.href.match(/dailyCheckInput.html\?/gi) !== null || location.href.match(/dailyCheckInput.html$/gi) !== null
        || location.href.match(/carInteriorCheckInput.html\?/gi) !== null || location.href.match(/carInteriorCheckInput.html$/gi) !== null
        || location.href.match(/carWashInput.html\?/gi) !== null || location.href.match(/carWashInput.html$/gi) !== null
        || location.href.match(/carExteriorCheckInput.html\?/gi) !== null || location.href.match(/carExteriorCheckInput.html$/gi) !== null
        || location.href.match(/lendArrangeInput.html\?/gi) !== null || location.href.match(/lendArrangeInput.html$/gi) !== null
        || location.href.match(/deployCarArrange.html\?/gi) !== null || location.href.match(/deployCarArrange.html$/gi) !== null
        || location.href.match(/deployCarArrangeInput.html\?/gi) !== null || location.href.match(/deployCarArrangeInput.html$/gi) !== null)
    {
        // 初期処理
        needsClass.each(function(index) {
            if ($(this).css('display') !== 'none') {
                $(contentsBlock[index]).find('input[type="number"],input[type="month"],input[type="text"]').addClass('needs-input');
                $(contentsBlock[index]).find('input[type="radio"]').parent('.content-radio-block').addClass('needs-input');
                $(contentsBlock[index]).find('.year-select select, .month-select select, .day-select select').addClass('needs-input');
                $(contentsBlock[index]).find('input[type="checkbox"]').parent('label').addClass('needs-input');
            }
        });

        // タイヤ（溝・空気圧）等の赤印が付いていないものは赤枠撤去する
        $('ul.contents-list input[type="number"]').each(function() {
            if (!$(this).hasClass('required-red')) {
                $(this).removeClass('needs-input');
            }
        });

        // 特装車タブ限定
        $('#special .twoChoices, #special .tripleChoices').each(function () {
            $(this).find('input[type="radio"]').parent('.content-radio-block').addClass('needs-input');
        });

        // 初期入力値がある場合の赤枠撤去
        $('input[type="number"]').each(function() {
            if ($(this).val() !== '') {
                $(this).removeClass('needs-input');
            }
        });

        // 初期入力値がある場合の赤枠撤去
        $('input[type="text"]').each(function() {
            if ($(this).val() !== '') {
                $(this).removeClass('needs-input');
            }
        });

        // 検索ワード欄(id="searchWord")が存在する場合の赤枠撤去
        if ($('#searchWord').length > 0){
            $('#searchWord').removeClass('needs-input');
        }

        if (location.href.match(/taw0108003.html/gi) !== null || location.href.match(/lendArrangeInput.html/gi) !== null) {
            // 給油カード番号、給油カード有効期限の場合の赤枠撤去　※選択状況により変化するため別途設定する
            $('.fuelGroup').removeClass('needs-input');
            // 給油カードの確認 1：OK が disabled の場合の赤枠撤去
            if ($('#fuelCardCondition1').prop('disabled')){
                $('#fuelCardConditionOK1').removeClass('needs-input');
            }
        }

        if (location.href.match(/taw0401002.html/gi) !== null || location.href.match(/deployCarArrangeInput.html/gi) !== null) {
            // 発炎筒有効期限 が disabled の場合の赤枠撤去
            if ($('#flaresLimit').prop('disabled')){
                $('#flaresLimit').removeClass('needs-input');
            }
        }

        // 入力項目にchangeイベントを設定
        $('input#mileage, input#meter').on('change', function() {
            if ($(this).val() !== '') {
                $(this).removeClass('needs-input');
            } else {
                $(this).addClass('needs-input');
            }
        });

        // 確認不可チェック時の製造年週項目設定
        if ($('input[name="tireMfrCheckRowFlgFrontRightCm"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgFrontRightCm", "#tireMfrFrontRightCm");
        }

        if ($('input[name="tireMfrCheckRowFlgFrontLeftCm"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgFrontLeftCm", "#tireMfrFrontLeftCm");
        }

        if ($('input[name="tireMfrCheckRowFlgRearLeftBi4"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgRearLeftBi4", "#tireMfrRearLeftBi4");
        }

        if ($('input[name="tireMfrCheckRowFlgRearRightBi4"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgRearRightBi4", "#tireMfrRearRightBi4");
        }

        if ($('input[name="tireMfrCheckRowFlgRearLeftBi6"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgRearLeftBi6", "#tireMfrRearLeftBi6");
        }

        if ($('input[name="tireMfrCheckRowFlgRearLeftBo6"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgRearLeftBo6", "#tireMfrRearLeftBo6");
        }

        if ($('input[name="tireMfrCheckRowFlgRearRightBi6"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgRearRightBi6", "#tireMfrRearRightBi6");
        }

        if ($('input[name="tireMfrCheckRowFlgRearRightBo6"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgRearRightBo6", "#tireMfrRearRightBo6");
        }

        if ($('input[name="tireMfrCheckRowFlgRearLeftFi10"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgRearLeftFi10", "#tireMfrRearLeftFi10");
        }

        if ($('input[name="tireMfrCheckRowFlgRearLeftFo10"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgRearLeftFo10", "#tireMfrRearLeftFo10");
        }

        if ($('input[name="tireMfrCheckRowFlgRearLeftBi10"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgRearLeftBi10", "#tireMfrRearLeftBi10");
        }

        if ($('input[name="tireMfrCheckRowFlgRearLeftBo10"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgRearLeftBo10", "#tireMfrRearLeftBo10");
        }

        if ($('input[name="tireMfrCheckRowFlgRearRightBi10"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgRearRightBi10", "#tireMfrRearRightBi10");
        }

        if ($('input[name="tireMfrCheckRowFlgRearRightBo10"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgRearRightBo10", "#tireMfrRearRightBo10");
        }

        if ($('input[name="tireMfrCheckRowFlgRearRightFi10"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgRearRightFi10", "#tireMfrRearRightFi10");
        }

        if ($('input[name="tireMfrCheckRowFlgRearRightFo10"]:checked').val()) {
            controlTireMfrCheckRow("#tireMfrCheckRowFlgRearRightFo10", "#tireMfrRearRightFo10");
        }

        $('input[type="month"]').each(function() {
            // 初期入力値がある場合の赤枠撤去
            if ($(this).val() !== '') {
                $(this).removeClass('needs-input');
            }

            // 入力項目にchangeイベントを設定
            $(this).on('change', function() {
                if ($(this).val() !== '') {
                    $(this).removeClass('needs-input');
                } else {
                    $(this).addClass('needs-input');
                }
            });
        });

        $('.twoChoices, .tripleChoices, .fourChoices').each(function() {
            var radio = $(this).find('input[type="radio"]');

            // 初期入力値がある場合の赤枠撤去
            var isRemoveClass = [];
            radio.each(function() {
                isRemoveClass.push($(this).prop('checked'));
            });
            for (var i = 0; i < isRemoveClass.length; i++) {
                if (isRemoveClass[i] === true) {
                    radio.each(function() {
                        $(this).parent('.content-radio-block').removeClass('needs-input');
                    });
                    break;
                }
            }

            // 入力項目にchangeイベントを設定
            radio.on('change', function() {
                var isAllRadioChecked = [];
                radio.each(function() {
                    isAllRadioChecked.push($(this).prop('checked'));
                });

                for (var i = 0; i < isAllRadioChecked.length; i++) {
                    if (isAllRadioChecked[i] === true) {
                        radio.each(function() {
                            $(this).parent('.content-radio-block').removeClass('needs-input');
                        });
                        break;
                    }
                }
            });
        });

        $('input[type="checkbox"]').each(function() {
            // 初期入力値がある場合の赤枠撤去
            if ($(this).prop('checked') || $(this).attr("id") == 'runFlatTireFlg' || $(this).attr("id") == 'tireMfrCheckRowFlgFrontRightCm'
                || $(this).attr("id") == 'tireMfrCheckRowFlgFrontLeftCm' || $(this).attr("id") == 'tireMfrCheckRowFlgRearLeftBi4'
                || $(this).attr("id") == 'tireMfrCheckRowFlgRearRightBi4' || $(this).attr("id") == 'tireMfrCheckRowFlgRearLeftBi6'
                || $(this).attr("id") == 'tireMfrCheckRowFlgRearLeftBo6' || $(this).attr("id") == 'tireMfrCheckRowFlgRearRightBi6'
                || $(this).attr("id") == 'tireMfrCheckRowFlgRearRightBo6' || $(this).attr("id") == 'tireMfrCheckRowFlgRearLeftFi10'
                || $(this).attr("id") == 'tireMfrCheckRowFlgRearLeftFo10' || $(this).attr("id") == 'tireMfrCheckRowFlgRearLeftBi10'
                || $(this).attr("id") == 'tireMfrCheckRowFlgRearLeftBo10' || $(this).attr("id") == 'tireMfrCheckRowFlgRearRightBi10'
                || $(this).attr("id") == 'tireMfrCheckRowFlgRearRightBo10' || $(this).attr("id") == 'tireMfrCheckRowFlgRearRightFi10'
                || $(this).attr("id") == 'tireMfrCheckRowFlgRearRightFo10') {
                $(this).parent('label').removeClass('needs-input');
            }

            // 入力項目にchangeイベントを設定
            $(this).on('change', function() {
                if ($(this).prop('checked') || $(this).attr("id") == 'runFlatTireFlg' || $(this).attr("id") == 'tireMfrCheckRowFlgFrontRightCm'
                    || $(this).attr("id") == 'tireMfrCheckRowFlgFrontLeftCm' || $(this).attr("id") == 'tireMfrCheckRowFlgRearLeftBi4'
                    || $(this).attr("id") == 'tireMfrCheckRowFlgRearRightBi4' || $(this).attr("id") == 'tireMfrCheckRowFlgRearLeftBi6'
                    || $(this).attr("id") == 'tireMfrCheckRowFlgRearLeftBo6' || $(this).attr("id") == 'tireMfrCheckRowFlgRearRightBi6'
                    || $(this).attr("id") == 'tireMfrCheckRowFlgRearRightBo6' || $(this).attr("id") == 'tireMfrCheckRowFlgRearLeftFi10'
                    || $(this).attr("id") == 'tireMfrCheckRowFlgRearLeftFo10' || $(this).attr("id") == 'tireMfrCheckRowFlgRearLeftBi10'
                    || $(this).attr("id") == 'tireMfrCheckRowFlgRearLeftBo10' || $(this).attr("id") == 'tireMfrCheckRowFlgRearRightBi10'
                    || $(this).attr("id") == 'tireMfrCheckRowFlgRearRightBo10' || $(this).attr("id") == 'tireMfrCheckRowFlgRearRightFi10'
                    || $(this).attr("id") == 'tireMfrCheckRowFlgRearRightFo10') {
                    $(this).parent('label').removeClass('needs-input');
                    $('#puncRepairKitExist1').parent('label').removeClass('needs-input');
                } else {
                    $(this).parent('label').addClass('needs-input');
                }
            });
        });

        $('.year-select select, .month-select select, .day-select select').each(function() {
            // 初期入力値がある場合の赤枠撤去
            if ($(this).val() !== '') {
                $(this).removeClass('needs-input');
            }

            // 入力項目にchangeイベントを設定
            $(this).on('change', function() {
                if ($(this).val() !== '') {
                    $(this).removeClass('needs-input');
                } else {
                    $(this).addClass('needs-input');
                }
            })
        });
    }

    /******************************************
    タブナビゲーション固定(一時的にこっちのファイルに記述)
    *******************************************/
    var tabHeight = $('.tab-container').outerHeight();
    var footerHeight = $('.footer').outerHeight();
    var windowHeight = $(window).height() - tabHeight - footerHeight - 4; // 4はタブの可変サイズ（46px → 50px）の差分

    var ua = navigator.userAgent;
    var hVal;
    if (ua.indexOf('iPhone') !== -1 || ua.indexOf('Android') !== -1 && ua.indexOf('Mobile') !== -1) {
        // SP & PCのMobile表示
        hVal = 50;
        // 詳細不明なので高さは724pxで決め打ちする（PC&タブレット）
        $('.tab-contents').css('min-height', '724px');
        $('.tab-contents').each(function () {
            if ($(this).outerHeight() > windowHeight && $(this).outerHeight() < (windowHeight + hVal)) {
                $(this).css('min-height', windowHeight + hVal + 'px');
            }
        });
    } else if (ua.indexOf('iPad') !== -1 || ua.indexOf('Android') !== -1) {
        // Androidタブレット
        hVal = 100;
        // 詳細不明なので高さは724pxで決め打ちする（PC&タブレット）
        $('.tab-contents').css('min-height', '724px');
        $('.tab-contents').each(function () {
            if ($(this).outerHeight() > windowHeight && $(this).outerHeight() < (windowHeight + hVal)) {
                $(this).css('height', windowHeight + hVal + 'px');
            }
        });
        // 特装車タブ対応
        $('#special input[type="checkbox"]').each(function() {
            $(this).on('change', function() {
                var allCheckedBtn = [];
                $('#special input[type="checkbox"]').each(function() {
                    allCheckedBtn.push($(this).prop('checked'));
                });

                var changeBox = $('#special .change-box.initial-hidden');
                changeBox.each(function () {
                    $(this).css('margin-bottom', '0');
                });
                for (var i = allCheckedBtn.length - 1; i >= 0; i--) {
                    // 特装車タブの一番最後のボックスにだけ下マージンを付ける
                    if (allCheckedBtn[i] === true && $(changeBox[i]).css('margin-bottom') !== '100px') {
                        $(changeBox[i]).css('margin-bottom', '100px');
                        break;
                    }
                }
            });
        });

        // 日常点検（エラー）画面対応
        if (location.href.match(/taw0102001.html$/gi) || location.href.match(/taw0102001.html\?dailyCheckId/gi)
        || location.href.match(/dailyCheckInput.html$/gi) || location.href.match(/dailyCheckInput.html\?dailyCheckId/gi)) {
            var allCheckedBtn = [];
            $('#special input[type="checkbox"]').each(function () {
                allCheckedBtn.push($(this).prop('checked'));
            });

            var changeBox = $('#special .change-box.initial-hidden');

            for (var i = allCheckedBtn.length - 1; i >= 0; i--) {
                // 特装車タブの一番最後のボックスにだけ下マージンを付ける
                if (allCheckedBtn[i] === true) {
                    $(changeBox[i]).css('margin-bottom', '100px');
                    break;
                }
            }
        }
    }

});

// 選択状況によって必須が変わる項目の赤枠対応関数
function showRedFrame(name) {
    var numberBlock = $(name).parent().next().find('input[type="number"]');
    var radioBlock = $(name).parent().next().find('.twoChoices, .tripleChoices, .fourChoices');
    var selectBlock = $(name).parent().next().find('.year-select select, .month-select select, .day-select select');
    var monthBlock = $(name).parent().next().find('input[type="month"]');
    // .unRequiredMeasureだけ別処理にする(HTML構造が違う)
    if (name === '.unRequiredMeasure') {
        numberBlock = $(name).find('input[type="number"]');
        radioBlock = $(name).find('.twoChoices, .tripleChoices, .fourChoices');
        selectBlock = $(name).find('.year-select select, .month-select select, .day-select select');
        monthBlock = $(name).find('input[type="month"]');
    }

    numberBlock.each(function() {
        if ($(this).hasClass('required-red') && $(this).val() === '') {
            $(this).addClass('needs-input');
        }

        // 確認不可がチェックONの場合、赤枠撤去する
        // 共通(前輪)
        if ($(this).attr('name') === 'tireMfrFrontRightCm' && $('input[name="tireMfrCheckRowFlgFrontRightCm"]:checked').val()) {
            $(this).removeClass('needs-input');
        }
        if ($(this).attr('name') === 'tireMfrFrontLeftCm' && $('input[name="tireMfrCheckRowFlgFrontLeftCm"]:checked').val()) {
            $(this).removeClass('needs-input');
        }

        // 4輪車
        if ($(this).attr('name') === 'tireMfrRearLeftBi4' && $('input[name="tireMfrCheckRowFlgRearLeftBi4"]:checked').val()) {
            $(this).removeClass('needs-input');
        }
        if ($(this).attr('name') === 'tireMfrRearRightBi4' && $('input[name="tireMfrCheckRowFlgRearRightBi4"]:checked').val()) {
            $(this).removeClass('needs-input');
        }

        // 6輪車
        if ($(this).attr('name') === 'tireMfrRearLeftBi6' && $('input[name="tireMfrCheckRowFlgRearLeftBi6"]:checked').val()) {
            $(this).removeClass('needs-input');
        }
        if ($(this).attr('name') === 'tireMfrRearLeftBo6' && $('input[name="tireMfrCheckRowFlgRearLeftBo6"]:checked').val()) {
            $(this).removeClass('needs-input');
        }
        if ($(this).attr('name') === 'tireMfrRearRightBi6' && $('input[name="tireMfrCheckRowFlgRearRightBi6"]:checked').val()) {
            $(this).removeClass('needs-input');
        }
        if ($(this).attr('name') === 'tireMfrRearRightBo6' && $('input[name="tireMfrCheckRowFlgRearRightBo6"]:checked').val()) {
            $(this).removeClass('needs-input');
        }

        // 10輪車
        if ($(this).attr('name') === 'tireMfrRearLeftFi10' && $('input[name="tireMfrCheckRowFlgRearLeftFi10"]:checked').val()) {
            $(this).removeClass('needs-input');
        }
        if ($(this).attr('name') === 'tireMfrRearLeftFo10' && $('input[name="tireMfrCheckRowFlgRearLeftFo10"]:checked').val()) {
            $(this).removeClass('needs-input');
        }
        if ($(this).attr('name') === 'tireMfrRearLeftBi10' && $('input[name="tireMfrCheckRowFlgRearLeftBi10"]:checked').val()) {
            $(this).removeClass('needs-input');
        }
        if ($(this).attr('name') === 'tireMfrRearLeftBo10' && $('input[name="tireMfrCheckRowFlgRearLeftBo10"]:checked').val()) {
            $(this).removeClass('needs-input');
        }
        if ($(this).attr('name') === 'tireMfrRearRightBi10' && $('input[name="tireMfrCheckRowFlgRearRightBi10"]:checked').val()) {
            $(this).removeClass('needs-input');
        }
        if ($(this).attr('name') === 'tireMfrRearRightBo10' && $('input[name="tireMfrCheckRowFlgRearRightBo10"]:checked').val()) {
            $(this).removeClass('needs-input');
        }
        if ($(this).attr('name') === 'tireMfrRearRightFi10' && $('input[name="tireMfrCheckRowFlgRearRightFi10"]:checked').val()) {
            $(this).removeClass('needs-input');
        }
        if ($(this).attr('name') === 'tireMfrRearRightFo10' && $('input[name="tireMfrCheckRowFlgRearRightFo10"]:checked').val()) {
            $(this).removeClass('needs-input');
        }

        // タイヤ（溝・空気圧）等の赤印が付いていないものは赤枠撤去する
        if (!$(this).hasClass('required-red') && $(this).prev('h3').length !== 0) {
            $(this).removeClass('needs-input');
        }

        // スペアタイヤ類が一つの場合
        if ($(this).parents('#trunk').length !== 0) {
            if ($(this).prev('p').children('span').text().length !== 0) {
                if ($(this).val().length > 0) {
                    $(this).removeClass('needs-input');
                } else {
                    $(this).addClass('needs-input');
                }
            }
        }
    });
    radioBlock.each(function() {
        $(this).children('.content-radio-block').addClass('needs-input');

        var radio = $(this).find('input[type="radio"]');

        // 既に選択していた場合の赤枠撤去
        var isRemoveClass = [];
        radio.each(function() {
            isRemoveClass.push($(this).prop('checked'));
        });
        for (var i = 0; i < isRemoveClass.length; i++) {
            if (isRemoveClass[i] === true) {
                radio.each(function() {
                    $(this).parent('.content-radio-block').removeClass('needs-input');
                });
                break;
            }
        }
    });
    selectBlock.each(function() {
        if ($(this).val() === '') {
            $(this).addClass('needs-input');
        }
    });
    monthBlock.each(function() {
        if ($(this).val() === '') {
            $(this).addClass('needs-input');
        }
    });
}

// 選択状況によって必須が変わる項目の赤枠対応関数
function hideRedFrame(name) {
    var numberBlock = $(name).parent().next().find('input[type="number"]');
    var radioBlock = $(name).parent().next().find('.twoChoices, .tripleChoices, .fourChoices');
    var selectBlock = $(name).parent().next().find('.year-select select, .month-select select, .day-select select');
    var monthBlock = $(name).parent().next().find('input[type="month"]');
    // .unRequiredMeasureだけ別処理にする(HTML構造が違う)
    if (name === '.unRequiredMeasure') {
        numberBlock = $(name).find('input[type="number"]');
        radioBlock = $(name).find('.twoChoices, .tripleChoices, .fourChoices');
        selectBlock = $(name).find('.year-select select, .month-select select, .day-select select');
        monthBlock = $(name).find('input[type="month"]');
    }

    numberBlock.each(function() {
        $(this).removeClass('needs-input');
    });
    radioBlock.each(function() {
        $(this).children('.content-radio-block').removeClass('needs-input');
    });
    selectBlock.each(function() {
        $(this).removeClass('needs-input');
    });
    monthBlock.each(function() {
        $(this).removeClass('needs-input');
    });
}

// 赤枠クラス付け替え関数(モーダル用)
function toggleRedFrame(obj) {

    if ($(obj).parents('.contents-block').prev().find('span').css('display') !== 'none') {
        // 非必須のタイヤは赤枠を付けない
        if (!$(obj).hasClass('required-red')) {
            $(obj).removeClass('needs-input');
        } else {
            // $(obj).prev('h3').length !== 0
            if ($(obj).hasClass('required-red') && $(obj).val().length > 0) {
                $(obj).removeClass('needs-input');
            } else {
                $(obj).addClass('needs-input');
            }
        }
        // スペアタイヤ類が一つの場合
        if ($(obj).parents('#trunk').length !== 0) {
            if ($(obj).prev('p').children('span').text().length !== 0) {
                if ($(obj).val().length > 0) {
                    $(obj).removeClass('needs-input');
                } else {
                    $(obj).addClass('needs-input');
                }
            }
        }
    } else {
        // 簡易点検の場合 かつ タイヤの調整後の場合

        if($(obj).is('[id*=Adj]')){
            if ($(obj).prev('p').children('span').text().length !== 0) {
                if ($(obj).val().length > 0) {
                    $(obj).removeClass('needs-input');
                } else {
                    $(obj).addClass('needs-input');
                }
            }
        } else {
            $(obj).removeClass('needs-input');
        }
    }
}

//文字数をカウントし上限設定値を超えた場合に.morelinkを表示
function setMoreLink(elm, showChar) {
    var more = elm.find('.more');

    if (more.length >= 0) {
        more.each(function() {
            var content = $(this).html();
            if(content.length > showChar) {
                var str1 = content.substr(0, showChar);
                var str2 = content.substr(showChar, content.length-showChar);　
                var html = str1 + '<span class="morecontent">' + str2 + '</span>';
                $(this).html(html);
                $(this).parent().find('.morelink-wrap').addClass('isActive');
            }
        });
    };
    return false;
}

// 「確認不可」ON/OFF時の製造年週テキストボックスの活性、非活性処理関数
function controlTireMfrCheckRow(disFlgName, tireMfrName) {
    if ($(disFlgName).prop('checked')) {
        $(tireMfrName).prop('disabled', true);
        $(tireMfrName).val("");
        if ($(tireMfrName).hasClass('required-red')) {
            $(tireMfrName).removeClass('needs-input');
        }
        if ($(tireMfrName).hasClass('onTeedaError')) {
            $(tireMfrName).removeAttr("style");
        }
    } else {
        $(tireMfrName).prop('disabled', false);
        if ($(tireMfrName).hasClass('required-red')) {
            $(tireMfrName).addClass('needs-input');
        }
        if ($(tireMfrName).hasClass('onTeedaError')) {
            $(tireMfrName).css('background', '#fdeef0');
            $(tireMfrName).css('borderColor', '#d10606');
        }
    }
}