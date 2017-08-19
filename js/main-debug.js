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
    $('.male').click(function () {
        $('#check-sex').prop("checked", !$('#check-sex').prop("checked"));
    });

    // $('.female').click(function () {
    //     $('#check-sex').trigger('click');
    // });

    // $('#check-sex').is(":checked"));

    console.log($('input[type="file"]').value);

    console.log('loaded');
});