$(function(){

    init_datepicker = function(){
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
              /* Strip negative GMT-timezone in order to not match tests for "-" below.
                 We dont need the timezone. */
              default_value = default_value.replace(/ *gmt-\d{1,2}/i, '');

                var temp;
                if (default_value.search('-') !== -1){
                    temp = default_value.split('-');
                }else{
                    temp = default_value.split('/');
                }
                // month - 1 because Date(1,0,2000) => 1th January 2000
                default_date = new Date(temp[0], temp[1]-1, temp[2].slice(0, 2));
            }
            else{
                default_date = null;
            }
            var options = $(this).find('select[name$=year] option');

            var option_values = new Array();
            var option_index = 0;
            for (index = 0; index < options.length; ++index) {

                if (isNaN(parseInt(options[index].value, 10)) || parseInt(options[index].value, 10) === 0){
                    continue;
                }
                else{
                option_values[option_index] = options[index].value;
                ++option_index;
                }
            }
            var max_year = Math.max.apply(Math, option_values);
            var min_year = Math.min.apply(Math, option_values);
            //console.info(default_date);
            picker = field.datepicker({
                showOn: 'button',
                onClose: insert_date,
                buttonImage: portal_url + '/popup_calendar.png',
                buttonImageOnly: true,
                dateFormat: 'd. MM yy',
                changeMonth: true,
                changeYear: true,
                defaultDate: default_date,
                yearRange: min_year + ':' + max_year
            });


        });
    };

    init_datepicker();
});


function insert_date(date, e){
    var field_id = $(e).attr('id');
    var yf = $('#' + field_id +'_year');
    yf.attr('value', e.selectedYear);

    var mf = $('#' + field_id +'_month');
    mf.find('option')[e.selectedMonth + 1].selected = true;

    var df = $('#'+ field_id +'_day');
    var day = e.selectedDay;
    if(day < 10){
        day = '0'+ day.toString();
    }
    df.attr('value', day);
    $('#' + field_id).trigger('calendar_after_change');

}
