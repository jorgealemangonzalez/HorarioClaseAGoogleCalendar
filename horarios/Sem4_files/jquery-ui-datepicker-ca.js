/* Inicializacion en español para la extensión 'UI date picker' para jQuery. */
jQuery(function($){
	$.datepicker.regional['ca'] = {
		closeText: 'Tancar',
		prevText: '&#x3c;Ant',
		nextText: 'Sig&#x3e;',
		currentText: 'Avui',
		monthNames: ['gener','febrer','març','abril','maig','juny',
		'juliol','agost','setembre','octubre','novembre','desembre'],
		monthNamesShort: ['gen.','febr.','març','abr.','maig','juny',
		'jul.','ag.','set.','oct.','nov.','des.'],
		dayNames: ['diumenge','dilluns','dimarts','dimecres','dijous','divendres','dissabte'],
		dayNamesShort: ['diu','dil','dim','dmc','dij','div','dis'],
		dayNamesMin: ['dg.','dl.','dt.','dc.','dj.','dv.','ds.'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ca']);
});