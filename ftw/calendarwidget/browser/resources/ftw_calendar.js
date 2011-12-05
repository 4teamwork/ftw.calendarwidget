jq(function(){


    function init_datepicker(){
        //read out language cookie
        var language = 'de';
        var language_cookie = document.cookie.match ( '(^|;) ?' + 'I18N_LANGUAGE' + '=([^;]*)(;|$)' );
        if (language_cookie !== null){
            language = language_cookie[2].substring(1,3);
        }
        //initialize datepicker widget for date search
        var datepicker_lang = jq.datepicker.regional[language];
        jq.datepicker.setDefaults(jq.extend(datepicker_lang));

        jq('div.datepicker').each(function(){
            var field = jq(this).children('input:first');
            default_value = jq(this).children('input:first').attr('value');
            if (default_value.length){
                var temp = default_value.split('/');
                var default_date = new Date(temp[0], temp[1], temp[2]);         
            }
            else{
                default_date = null;
            }

            picker = field.datepicker({
                showOn: 'button',
                onClose: insert_date,
                buttonImage: portal_url + '/popup_calendar.png',
                buttonImageOnly: true,
                dateFormat: 'd. MM yy',
                changeMonth: true,
                changeYear: true,
                defaultDate: default_date,
                onClose: function(dateText, inst){
                        // XXX refactor me, please - it works, but OMFG
                        inst.input.attr('value', dateText);
                        var new_field = inst.input.parents('[id*=archetypes-fieldname]');
                        jq('select[id*=year]', new_field).attr('value', inst.currentYear);
                        // hack adding leading zero
                        var currentMonth = inst.currentMonth+1; // XXX: for some reason the wrong month is stored, ARGH
                        if (inst.currentMonth.toString().length == 1){
                            currentMonth = "0"+currentMonth;
                        }
                        var currentDay = inst.currentDay;
                        if (currentDay.toString().length == 1){
                            currentDay = "0"+currentDay;
                        }
                        jq('select[id*=month]', new_field).attr('value', currentMonth);
                        jq('select[id*=day]', new_field).attr('value', currentDay);
                        
                        // Trigger an after change events for further actions
                        new_field.trigger('calendar_after_change');
                    
                }
            });
                        
        });        
    }
    init_datepicker();
    
    function insert_date(date, e){
        var field_id = jq(e).attr('id');
        var yf = jq('#' + field_id +'_year');
        yf.attr('value', e.selectedYear);

        var mf = jq('#' + field_id +'_month');
        mf.attr('value', jq(mf.attr('options')[e.selectedMonth + 1]).attr('value'));

        var df = jq('#'+ field_id +'_day');
        var day = e.selectedDay;
        if(day < 10){
            day = '0'+ day.toString();
        }
        df.attr('value', day);
    }

    
});
