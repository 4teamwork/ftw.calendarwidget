jq(function(){

    //read out language cookie
    var language = 'de';
    var language_cookie = document.cookie.match ( '(^|;) ?' + 'I18N_LANGUAGE' + '=([^;]*)(;|$)' );
    if (language_cookie != null){
        var language = language_cookie[2].substring(1,3);
    }
    //initialize datepicker widget for date search
    var datepicker_lang = jq.datepicker.regional[language];
    jq.datepicker.setDefaults(jq.extend(datepicker_lang));
        
    jq('div.datepicker').each(function(){
        var field = jq(this).children('input:first')
        var default_value = jq(this).children('input:first').attr('value');
        var temp = default_value.split('/');
        var default_date = new Date(temp[0], temp[1], temp[2]);

        picker = field.datepicker({
            showOn: 'button',
            onClose: insert_date,
            buttonImage: portal_url + '/popup_calendar.gif',
            buttonImageOnly: true,
            dateFormat: 'd. MM yy',
            changeMonth: true,
            changeYear: true,
            defaultDate: default_date
        });
    });
});


function update_datepicker(id){
    var year = jq('#'+ id+'_year').attr('value');
    var day = jq('#'+ id+'_day').attr('value');
    var mf = jq('#'+ id+'_month');
    
    var month = mf.children(':selected').text()
    var input = jq('#'+ id).parents('div.datepicker:first').children('input:first');
    input.attr('value', day+ '. ' + month +' '+ year);
}

function insert_date(date, e){
    field_id = jq(e).attr('id');
    yf = jq('#' + field_id +'_year')
    yf.attr('value', e.selectedYear);

    mf = jq('#' + jq('#edit_form_start_date_0').attr('id')+'_month');
    mf.attr('value', mf.attr('options')[e.selectedMonth + 1].value);

    df = jq('#' + jq('#edit_form_start_date_0').attr('id')+'_day')
    df.attr('value', e.selectedDay);
}
