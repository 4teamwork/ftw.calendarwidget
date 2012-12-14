$(function(){

    function init_datepicker(){
        //read out language cookie
        var language = 'de';
        var language_cookie = document.cookie.match ( '(^|;) ?' + 'I18N_LANGUAGE' + '=([^;]*)(;|$)' );
        if (language_cookie !== null){
            language = language_cookie[2].substring(1,3);
        }
        //initialize datepicker widget for date search
        var datepicker_lang = $.datepicker.regional[language];
        $.datepicker.setDefaults($.extend(datepicker_lang));

        $('div.datepicker').each(function(){
            var field = $(this).children('input:first');
            var default_date;
            default_value = $(this).children('input:first').attr('value');
            if (default_value.length){
                var temp = default_value.split('-');
                // month - 1 because Date(1,0,2000) => 1th January 2000
                default_date = new Date(temp[0], temp[1]-1, temp[2].slice(0, 2));
            }
            else{
                default_date = null;
            }

            //console.info(default_date);
            picker = field.datepicker({
                showOn: 'button',
                onClose: insert_date,
                buttonImage: portal_url + '/popup_calendar.png',
                buttonImageOnly: true,
                dateFormat: 'd. MM yy',
                changeMonth: true,
                changeYear: true,
                defaultDate: default_date
                });

});
}
init_datepicker();

function insert_date(date, e){
    var field_id = $(e).attr('id');
    var yf = $('#' + field_id +'_year');
    yf.attr('value', e.selectedYear);

    var mf = $('#' + field_id +'_month');
    mf.attr('value', $(mf.attr('options')[e.selectedMonth + 1]).attr('value'));

    var df = $('#'+ field_id +'_day');
    var day = e.selectedDay;
    if(day < 10){
        day = '0'+ day.toString();
    }
    df.attr('value', day);
    $('#' + field_id).trigger('calendar_after_change');

}


});
