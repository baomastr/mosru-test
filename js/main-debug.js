$(document).ready(function () {

    /*маска для телефона*/
    $(function(){
        $("#phone").mask("+7 (999) 999-99-99");
    });

    /*показать/скрыть пароль*/
    function show() {
        var p = document.getElementById('pwd'),
            closed = document.getElementById('closed'),
            opened = document.getElementById('opened');
        p.setAttribute('type', 'text');
        closed.style.display = 'none';
        opened.style.display = 'block';
    }

    function hide() {
        var p = document.getElementById('pwd'),
            closed = document.getElementById('closed'),
            opened = document.getElementById('opened');
        p.setAttribute('type', 'password');
        closed.style.display = 'block';
        opened.style.display = 'none';
    }

    var pwShown = 0;

    document.getElementById("eye").addEventListener("click", function () {
        if (pwShown == 0) {
            pwShown = 1;
            show();
        } else {
            pwShown = 0;
            hide();
        }
    }, false);



    /*чекбокс "пол"*/
    // $('.male').click(function () {
    //     $('#check-sex').prop("checked", !$('#check-sex').prop("checked"));
    // });
    //
    // $('.female').click(function () {
    //     $('#check-sex').trigger('click');
    // });

    // $('#check-sex').is(":checked"));



    /*
     custom select
     */

    $('select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select form__input form__select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //console.log($this.val());
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });


    function validate() {
        var msg   = $('.form').serialize();
        $.ajax({
            type: 'POST',
            url: 'res.php',
            data: msg,
            success: function(data) {
                // $('#results').html(data);
            },
            error:  function(xhr, str){
                alert('Возникла ошибка: ' + xhr.responseCode);
                $('.form__item--required').addClass('invalid');
            }
        });
    };

    $('input[type="email"]').blur(function() {
        var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        if (testEmail.test(this.value)) console.log('passed');
        else console.log('failed');
    });


    console.log($('input[type="file"]').value);

    console.log('loaded');
});