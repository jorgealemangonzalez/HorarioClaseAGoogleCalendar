/*-------------------------------------------------------------------------------------------------
  -Producto:	PATRONES.
  -Versión: rev. 1.0.2 
  - último cambio: 19/09/13
  -Compatibilidad: FF 3.X y sup., IE 7 y sup., Chrome 12 y sup., Opera 10 y sup., Safari 5 y sup.
  -Autores:	VMMA, ERO 
  http://www.gestionuniversitariasigma.com/
---------------------------------------------------------------------------------------------------*/

//El id por defecto para el paginador de resultados
var idPaginator = "paginadorResultados";

(function(jQuery) {
    makeDefaultPaginator(jQuery);
})(jQuery);

function makeDefaultPaginator(jQuery) {
    jQuery.fn.extend({
        smartpaginator: function(options) {
            var settings = jQuery.extend({
                totalrecords: 0,
                recordsperpage: 10,
                length: 10,
                next: '',
                titNext: 'P&aacute;gina siguiente',
                prev: '',
                titPrev: 'P&aacute;gina  anterior',
                first: '',
                titFirst: 'Primera p&aacute;gina',
                last: '',
                titLast: '&Uacute;ltima p&aacute;gina',
                go: 'Go',
                theme: 'green',
                display: 'double',
                initval: 1,
                divPaginacion: '',
                datacontainer: '', //data container id
                dataelement: 'tr', //children elements to be filtered e.g. tr or div
                onchange: null,
                idioma: 'es',
                viewId: ''
            }, options);
            return this.each(function() {
                var literalesRegPorPagina = new Array();
                literalesRegPorPagina['es'] = ' registros por p&aacute;gina';
                literalesRegPorPagina['ca'] = ' registres per p&agrave;gina';
                literalesRegPorPagina['en'] = ' registers per page';
                literalesRegPorPagina['eu'] = ' orri bakoitzeko erregistroa';
                var literalesPagina = new Array();
                literalesPagina['es'] = ' p&aacute;ginas';
                literalesPagina['ca'] = ' p&agrave;gines';
                literalesPagina['en'] = ' pages';
                literalesPagina['eu'] = ' orriak';
                var literalesTitNext = new Array();
                literalesTitNext['es'] = 'P&aacute;gina siguiente';
                literalesTitNext['ca'] = 'P&agrave;gina seg&Uuml;ent';
                literalesTitNext['en'] = 'Next page';
                literalesTitNext['eu'] = 'Hurrengo orria';
                var literalesTitPrev = new Array();
                literalesTitPrev['es'] = 'P&aacute;gina anterior';
                literalesTitPrev['ca'] = 'P&agrave;gina anterior';
                literalesTitPrev['en'] = 'Previous page';
                literalesTitPrev['eu'] = 'Aurreko orria';
                var literalesTitFirst = new Array();
                literalesTitFirst['es'] = 'Primera p&aacute;gina';
                literalesTitFirst['ca'] = 'Primera p&agrave;gina';
                literalesTitFirst['en'] = 'First page';
                literalesTitFirst['eu'] = 'Lehendabiziko orria';
                var literalesTitLast = new Array();
                literalesTitLast['es'] = '&Uacute;ltima p&aacute;gina';
                literalesTitLast['ca'] = '&Ugrave;ltima p&agrave;gina';
                literalesTitLast['en'] = 'Last page';
                literalesTitLast['eu'] = 'Azkeneko orria';

                var currentPage = 0;
                var startPage = 0;
                var totalpages = parseInt(settings.totalrecords / settings.recordsperpage);
                if (settings.totalrecords % settings.recordsperpage > 0) totalpages++;
                var initialized = false;
                var container = jQuery(this).addClass('pager').addClass(settings.theme);
                container.find('ul').remove();
                container.find('div').remove();
                container.find('span').remove();
                var dataContainer;
                var dataElements;
                if (settings.datacontainer != '') {
                    dataContainer = jQuery('#' + settings.datacontainer);
                    dataElements = jQuery('' + settings.dataelement + '', dataContainer);
                }
                var tamano = 0;
                if(totalpages>9){
                    tamano = 10;
                }else{
                    tamano = totalpages;
                }                
                var div1 = jQuery('<div/>').addClass('paginas'+tamano);
                var div2 = jQuery('<div/>').addClass('rotulos');
                var select = jQuery('<select/>').addClass('select').attr('id', 'select' + settings.divPaginacion).attr('name','paginas').attr('selectedIndex', 1).change(function(){
                    //var group = jQuery(this).find(':selected').attr('value');
                    //var group = document.getElementById('select').children[document.getElementById('select').selectedIndex].innerHTML;
                    var group = document.getElementById('select' + settings.divPaginacion).options[document.getElementById('select' + settings.divPaginacion).selectedIndex].innerHTML;
                    group = parseInt(group);

                    if (settings.viewId != '')
                    {
                      jQuery.ajax({
                          url: '../../ajaxViewBuilder?operation=reloadAttribute&attributeName=recordsPerPage&attributeValue=' + group + '&viewId=' + settings.viewId
                      });
                    }

                    jQuery(document).ready(function() {
                        jQuery('#' + settings.divPaginacion).smartpaginator({ totalrecords: settings.totalrecords, recordsperpage: group, 
                                                                              divPaginacion: settings.divPaginacion, datacontainer: settings.datacontainer,
                                                                              dataelement: settings.dataelement, initval: settings.initval,
                                                                              next: settings.next, prev: settings.prev, first: settings.first,
                                                                              last: settings.last, display: settings.display, viewId: settings.viewId });
                    });                    

                    if(group == 10){
                        document.getElementById('select' + settings.divPaginacion).selectedIndex = 0;
                    }else if(group == 20){
                        document.getElementById('select' + settings.divPaginacion).selectedIndex = 1;
                    }else if(group == 50){
                        document.getElementById('select' + settings.divPaginacion).selectedIndex = 2;
                    }else if(group == 100){
                        document.getElementById('select' + settings.divPaginacion).selectedIndex = 3;
                    }else if(group == 200){
                        document.getElementById('select' + settings.divPaginacion).selectedIndex = 4;
                    }
                });

                var label = jQuery('<label/>').html(literalesRegPorPagina[settings.idioma]).attr('for', literalesPagina[settings.idioma]);
                var option1 = jQuery('<option/>').addClass('option').attr('id','opt1').text('10');
                var option2 = jQuery('<option/>').addClass('option').attr('id','opt2').text('20');
                var option3 = jQuery('<option/>').addClass('option').attr('id','opt3').text('50');
                var option4 = jQuery('<option/>').addClass('option').attr('id','opt4').text('100');
                var option5 = jQuery('<option/>').addClass('option').attr('id','opt5').text('200');

                if(settings.recordsperpage == 10){
                    option1.attr('selected','selected');
                }else if(settings.recordsperpage == 20){
                    option2.attr('selected','selected');
                }else if(settings.recordsperpage == 50){
                    option3.attr('selected','selected');
                }else if(settings.recordsperpage == 100){
                    option4.attr('selected','selected');
                }else if(settings.recordsperpage == 200){
                    option5.attr('selected','selected');
                }

                var list = jQuery('<ul/>').addClass('tamano'+tamano);
                var btnPrev = jQuery('<div/>').attr("title",htmlDecode(literalesTitPrev[settings.idioma])).html(settings.prev).click(function() {
                    currentPage = parseInt(list.find('li a.active').text()) - 1;
                    navigate(--currentPage);
                }).addClass('btnPrev');
                var btnNext = jQuery('<div/>').attr("title",htmlDecode(literalesTitNext[settings.idioma])).html(settings.next).click(function() {
                    currentPage = parseInt(list.find('li a.active').text());
                    navigate(currentPage);
                }).addClass('btnNext');
                var btnFirst = jQuery('<div/>').attr("title",htmlDecode(literalesTitFirst[settings.idioma])).html(settings.first).click(function() {
                    currentPage = 0;
                    navigate(0);
                }).addClass('btnFirst');
                var btnLast = jQuery('<div/>').attr("title",htmlDecode(literalesTitLast[settings.idioma])).html(settings.last).click(function() {
                    currentPage = totalpages - 1;
                    navigate(currentPage);
                }).addClass('btnLast');
                var inputPage = jQuery('<input/>').attr('type', 'text').keydown(function(e) {
                    if (isTextSelected(inputPage)) inputPage.val('');
                    if (e.which >= 48 && e.which < 58) {
                        var value = parseInt(inputPage.val() + (e.which - 48));
                        if (!(value > 0 && value <= totalpages)) e.preventDefault();
                    } else if (!(e.which == 8 || e.which == 46)) e.preventDefault();
                });
                var btnGo = jQuery('<input/>').attr('type', 'button').attr('value', settings.go).addClass('btn').click(function() {
                    if (inputPage.val() == '') return false;
                    else {
                        currentPage = parseInt(inputPage.val()) - 1;
                        navigate(currentPage);
                    }
                });
                div1.append(btnFirst).append(btnPrev).append(btnLast).append(btnNext).append(list);

                if (settings.display == 'single') {
                    btnGo.css('display', 'none');
                    inputPage.css('display', 'none');
                }
                buildNavigation(startPage);
                if (settings.initval == 0) settings.initval = 1;
                currentPage = settings.initval - 1;
                navigate(currentPage);
                initialized = true;
                function showLabels(pageIndex) {
                    container.find('span').remove();
                    var upper = (pageIndex + 1) * settings.recordsperpage;
                    if (upper > settings.totalrecords) upper = settings.totalrecords;
                    if(settings.totalrecords < 11){
                        div2.append(jQuery('<span/>').append(jQuery('<b/>').text(pageIndex * settings.recordsperpage + 1)))
                        .append(jQuery('<span/>').text(' - '))
                        .append(jQuery('<span/>').append(jQuery('<b/>').text(upper)))
                        .append(jQuery('<span/>').text('/'))
                        .append(jQuery('<span/>').append(jQuery('<b/>').text(settings.totalrecords)));
                        container.append(div1);
                        container.append(div2);
                    }else if(settings.totalrecords < 21){
                        div2.append(jQuery('<span/>').append(jQuery('<b/>').text(pageIndex * settings.recordsperpage + 1)))
                        .append(jQuery('<span/>').text(' - '))
                        .append(jQuery('<span/>').append(jQuery('<b/>').text(upper)))
                        .append(jQuery('<span/>').text('de'))
                        .append(jQuery('<span/>').append(jQuery('<b/>').text(settings.totalrecords)))
                        .append(select.append(option1).append(option2))
                        .append(label);
                        container.append(div1);
                        container.append(div2);
                    }else if(settings.totalrecords < 51){
                        div2.append(jQuery('<span/>').append(jQuery('<b/>').text(pageIndex * settings.recordsperpage + 1)))
                        .append(jQuery('<span/>').text(' - '))
                        .append(jQuery('<span/>').append(jQuery('<b/>').text(upper)))
                        .append(jQuery('<span/>').text('de'))
                        .append(jQuery('<span/>').append(jQuery('<b/>').text(settings.totalrecords)))
                        .append(select.append(option1).append(option2).append(option3))
                        .append(label);
                        container.append(div1);
                        container.append(div2);

                    }else if(settings.totalrecords < 101){
                        div2.append(jQuery('<span/>').append(jQuery('<b/>').text(pageIndex * settings.recordsperpage + 1)))
                        .append(jQuery('<span/>').text(' - '))
                        .append(jQuery('<span/>').append(jQuery('<b/>').text(upper)))
                        .append(jQuery('<span/>').text('de'))
                        .append(jQuery('<span/>').append(jQuery('<b/>').text(settings.totalrecords)))
                        .append(select.append(option1).append(option2).append(option3).append(option4))
                        .append(label);
                        container.append(div1);
                        container.append(div2);
                    }else if(settings.totalrecords < 201){
                        div2.append(jQuery('<span/>').append(jQuery('<b/>').text(pageIndex * settings.recordsperpage + 1)))
                        .append(jQuery('<span/>').text(' - '))
                        .append(jQuery('<span/>').append(jQuery('<b/>').text(upper)))
                        .append(jQuery('<span/>').text('de'))
                        .append(jQuery('<span/>').append(jQuery('<b/>').text(settings.totalrecords)))
                        .append(select.append(option1).append(option2).append(option3).append(option4).append(option5))
                        .append(label);
                        container.append(div1);
                        container.append(div2);
                    }else{
                        div2.append(jQuery('<span/>').append(jQuery('<b/>').text(pageIndex * settings.recordsperpage + 1)))
                        .append(jQuery('<span/>').text(' - '))
                        .append(jQuery('<span/>').append(jQuery('<b/>').text(upper)))
                        .append(jQuery('<span/>').text('de'))
                        .append(jQuery('<span/>').append(jQuery('<b/>').text(settings.totalrecords)))
                        .append(select.append(option1).append(option2).append(option3).append(option4).append(option5))
                        .append(label);
                        container.append(div1);
                        container.append(div2);
                    }

                }
                function buildNavigation(startPage) {
                    list.find('li').remove();
                    if (settings.totalrecords <= settings.recordsperpage) return;
                    for (var i = startPage; i < startPage + settings.length; i++) {
                        if (i == totalpages) break;
                        list.append(jQuery('<li/>')
                            .append(jQuery('<a>').attr('id', (i + 1)).addClass(settings.theme).addClass('normal')
                                .attr('href', 'javascript:void(0);')
                                .text(i + 1))
                            .click(function() {                                
                                currentPage = startPage + jQuery(this).closest('li').prevAll().length;
                                navigate(currentPage);
                            }));
                    }
                    showLabels(startPage);
                    inputPage.val((startPage + 1));
                    list.find('li a').addClass(settings.theme).removeClass('active');
                    list.find('li:eq(0) a').addClass(settings.theme).addClass('active');
                    showRequiredButtons(startPage);
                }
                function navigate(topage) {
                    //make sure the page in between min and max page count
                    var index = topage;
                    var mid = settings.length / 2;
                    if (settings.length % 2 > 0) mid = (settings.length + 1) / 2;
                    var startIndex = 0;
                    if (topage >= 0 && topage < totalpages) {
                        if (topage >= mid) {
                            if (totalpages - topage > mid)
                                startIndex = topage - (mid - 1);
                            else if (totalpages > settings.length)
                                startIndex = totalpages - settings.length;
                        }
                        buildNavigation(startIndex);
                        showLabels(currentPage);
                        list.find('li a').removeClass('active');
                        inputPage.val(currentPage + 1);
                        list.find('li a[id="' + (index + 1) + '"]').addClass('active');
                        var recordStartIndex = currentPage * settings.recordsperpage;
                        var recordsEndIndex = recordStartIndex + settings.recordsperpage;
                        if (recordsEndIndex > settings.totalrecords)
                            recordsEndIndex = settings.totalrecords % recordsEndIndex;
                        if (initialized) {
                            if (settings.onchange != null) {
                                settings.onchange((currentPage + 1), recordStartIndex, recordsEndIndex);
                            }
                        }
                        if (dataContainer != null) {
                            if (dataContainer.length > 0) {
                                //hide all elements first
                                dataElements.css('display', 'none');
                                //display elements that need to be displayed
                                if (jQuery(dataElements[0]).find('th').length > 0) { //if there is a header, keep it visible always
                                    jQuery(dataElements[0]).css('display', '');
                                    recordStartIndex++;
                                    recordsEndIndex++;
                                }
                                for (var i = recordStartIndex; i < recordsEndIndex; i++)
                                    jQuery(dataElements[i]).css('display', '');                             
                            }
                        }

                        showRequiredButtons();
                    }
                }
                function showRequiredButtons() {
                    if (totalpages > settings.length) {
                        if (currentPage > 0) {
                            btnPrev.css('display', '');
                        }
                        else {
                            btnPrev.css('display', 'none');
                        }
                        if (currentPage > settings.length / 2 - 1) {
                            btnFirst.css('display', '');
                        }
                        else {
                            btnFirst.css('display', 'none');
                        }

                        if (currentPage == totalpages - 1) {
                            btnNext.css('display', 'none');
                        }
                        else btnNext.css('display', '');
                        if (totalpages > settings.length && currentPage < (totalpages - (settings.length / 2)) - 1) {
                            btnLast.css('display', '');
                        }
                        else {
                            btnLast.css('display', 'none');
                        };
                    }
                    else {
                        btnFirst.css('display', 'none');
                        btnPrev.css('display', 'none');
                        btnNext.css('display', 'none');
                        btnLast.css('display', 'none');
                    }
                }
                function isTextSelected(el) {
                    var startPos = el.get(0).selectionStart;
                    var endPos = el.get(0).selectionEnd;
                    var doc = document.selection;
                    if (doc && doc.createRange().text.length != 0) {
                        return true;
                    } else if (!doc && el.val().substring(startPos, endPos).length != 0) {
                        return true;
                    }
                    return false;
                }

                function htmlDecode(input)
                {
                    var e = document.createElement('div');
                    e.innerHTML = input;
                    return e.childNodes[0].nodeValue;
                }

            });
        }
    });
}

function makePaginatorSortable() {
    jQuery.fn.extend({
        smartpaginator: function(options) {
            var settings = jQuery.extend({
                context: document,
                totalrecords: 0,
                recordsperpage: 0,
                length: 10,
                next: '',
                titNext: 'Página siguiente',
                prev: '',
                titPrev: 'Página  anterior',
                first: '',
                titFirst: 'Primera página',
                last: '',
                titLast: 'Última página',
                go: 'Go',
                theme: 'green',
                display: 'double',
                initval: 1,
                divPaginacion: '',
                datacontainer: '', //data container id
                dataelement: 'tr', //children elements to be filtered e.g. tr or div
                onchange: null,
                idioma: 'es'
            }, options);
            return this.each(function() {
                var literalesRegPorPagina = new Array();
                literalesRegPorPagina['es'] = ' registros por página';
                literalesRegPorPagina['ca'] = ' registres per pàgina';
                literalesRegPorPagina['en'] = ' registers per page';
                literalesRegPorPagina['eu'] = ' orri bakoitzeko records';
                var literalesPagina = new Array();
                literalesPagina['es'] = ' páginas';
                literalesPagina['ca'] = ' pàgines';
                literalesPagina['en'] = ' pages';
                literalesPagina['eu'] = ' orriak';
                var literalesTitNext = new Array();
                literalesTitNext['es'] = 'Página siguiente';
                literalesTitNext['ca'] = 'Pàgina següent';
                literalesTitNext['en'] = 'Next page';
                literalesTitNext['eu'] = '';
                var literalesTitPrev = new Array();
                literalesTitPrev['es'] = 'Página anterior';
                literalesTitPrev['ca'] = 'Pàgina anterior';
                literalesTitPrev['en'] = 'Previous page';
                literalesTitPrev['eu'] = '';
                var literalesTitFirst = new Array();
                literalesTitFirst['es'] = 'Primera página';
                literalesTitFirst['ca'] = 'Primera pàgina';
                literalesTitFirst['en'] = 'First page';
                literalesTitFirst['eu'] = '';
                var literalesTitLast = new Array();
                literalesTitLast['es'] = 'Última página';
                literalesTitLast['ca'] = 'Darrera pàgina';
                literalesTitLast['en'] = 'Last page';
                literalesTitLast['eu'] = '';
                var literalesTodos = new Array();
                literalesTodos['es'] = 'Todos';
                literalesTodos['ca'] = 'Tots';
                literalesTodos['en'] = 'All';
                literalesTodos['eu'] = 'Guztiak';

                var currentPage = 0;
                var startPage = 0;
                var totalpages = parseInt(settings.totalrecords / settings.recordsperpage);
                if (settings.totalrecords % settings.recordsperpage > 0) totalpages++;
                var initialized = false;
                var container = jQuery(this, settings.context).addClass('pager').addClass(settings.theme);
                container.find('ul').remove();
                container.find('div').remove();
                container.find('span').remove();
                var dataContainer;
                var dataElements;
                if (settings.datacontainer != '') {
                    dataContainer = jQuery('#' + settings.datacontainer, settings.context);
                    dataElements = jQuery('' + settings.dataelement + '', dataContainer);
                }
                var tamano = 0;
                if(totalpages>9){
                    tamano = 10;
                }else{
                    tamano = totalpages;
                }                
                var div1 = jQuery('<div/>').addClass('paginas'+tamano);
                var div2 = jQuery('<div/>').addClass('rotulos');
                var select = jQuery('<select/>').addClass('select').attr('id','select').attr('name','paginas').change(function(){
                    var group = jQuery(this).find(':selected').attr('id');
                    if ( group == 'opt1' ) {
                        group = 10;
                    } else if ( group == 'opt2' ) {
                        group = 20;
                    } else if ( group == 'opt3' ) {
                        group = 50;
                    } else if ( group == 'opt4' ) {
                        group = 100;
                    } else if ( group == 'opt5' ) {
                        group = 200;
                    } else if ( group == 'opt6' ) {
                        group = -1;
                    }
                    jQuery('#' + settings.divPaginacion, settings.context).smartpaginator({
                        context: settings.context,
                        totalrecords: settings.totalrecords,
                        recordsperpage: group, 
                        divPaginacion: settings.divPaginacion, 
                        datacontainer: settings.datacontainer,
                        dataelement: settings.dataelement, 
                        initval: settings.initval,
                        next: settings.next, 
                        prev: settings.prev, 
                        first: settings.first,
                        last: settings.last, 
                        display: settings.display
                    });

                    var select =  jQuery("#select", settings.context)[0];
                    if(group == 10){
                        select.selectedIndex = 0;
                    }else if(group == 20){
                        select.selectedIndex = 1;
                    }else if(group == 50){
                        select.selectedIndex = 2;
                    }else if(group == 100){
                        select.selectedIndex = 3;
                    }else if(group == 200){
                        select.selectedIndex = 4;
                    }else if(group == -1){
                        if(settings.totalrecords < 21){
                            select.selectedIndex = 2;
                        }else if(settings.totalrecords < 51){
                            select.selectedIndex = 3;
                        }else if(settings.totalrecords < 101){
                            select.selectedIndex = 4;
                        }else{
                            select.selectedIndex = 5;
                        }
                    }
                });        
                var label = jQuery('<label/>').text(literalesRegPorPagina[settings.idioma]).attr('for', literalesPagina[settings.idioma]);
                var option1 = jQuery('<option/>').addClass('option').attr('id','opt1').text('10');
                var option2 = jQuery('<option/>').addClass('option').attr('id','opt2').text('20');
                var option3 = jQuery('<option/>').addClass('option').attr('id','opt3').text('50');
                var option4 = jQuery('<option/>').addClass('option').attr('id','opt4').text('100');
                var option5 = jQuery('<option/>').addClass('option').attr('id','opt5').text('200'); 
                var option6 = jQuery('<option/>').addClass('option').attr('id','opt6').text(literalesTodos[settings.idioma]);
                
                var list = jQuery('<ul/>').addClass('tamano'+tamano);
                var btnPrev = jQuery('<div/>').attr("title",literalesTitPrev[settings.idioma]).text(settings.prev).click(function() {
                    currentPage = parseInt(list.find('li a.active').text()) - 1;
                    navigate(--currentPage);
                }).addClass('btnPrev');
                var btnNext = jQuery('<div/>').attr("title",literalesTitNext[settings.idioma]).text(settings.next).click(function() {
                    currentPage = parseInt(list.find('li a.active').text());
                    navigate(currentPage);
                }).addClass('btnNext');
                var btnFirst = jQuery('<div/>').attr("title",literalesTitFirst[settings.idioma]).text(settings.first).click(function() {
                    currentPage = 0;
                    navigate(0);
                }).addClass('btnFirst');
                var btnLast = jQuery('<div/>').attr("title",literalesTitLast[settings.idioma]).text(settings.last).click(function() {
                    currentPage = totalpages - 1;
                    navigate(currentPage);
                }).addClass('btnLast');
                var inputPage = jQuery('<input/>').attr('type', 'text').keydown(function(e) {
                    if (isTextSelected(inputPage)) inputPage.val('');
                    if (e.which >= 48 && e.which < 58) {
                        var value = parseInt(inputPage.val() + (e.which - 48));
                        if (!(value > 0 && value <= totalpages)) e.preventDefault();
                    } else if (!(e.which == 8 || e.which == 46)) e.preventDefault();
                });
                var btnGo = jQuery('<input/>').attr('type', 'button').attr('value', settings.go).addClass('btn').click(function() {
                    if (inputPage.val() == '') return false;
                    else {
                        currentPage = parseInt(inputPage.val()) - 1;
                        navigate(currentPage);
                    }
                });
                div1.append(btnFirst).append(btnPrev).append(btnLast).append(btnNext).append(list);

                if (settings.display == 'single') {
                    btnGo.css('display', 'none');
                    inputPage.css('display', 'none');
                }
                buildNavigation(startPage);
                if (settings.initval == 0) settings.initval = 1;
                currentPage = settings.initval - 1;
                navigate(currentPage);
                initialized = true;
                function showLabels(pageIndex) {
                    container.find('span').remove();
                    var upper = (pageIndex + 1) * settings.recordsperpage;
                    if (upper > settings.totalrecords) upper = settings.totalrecords;
                    if(settings.totalrecords < 11){
                        div2.append(jQuery('<span/>').append(jQuery('<b/>').text(pageIndex * settings.recordsperpage + 1)))
                        .append(jQuery('<span/>').text(' - '))
                        .append(jQuery('<span/>').append(jQuery('<b/>').text(upper)))
                        .append(jQuery('<span/>').text('/'))
                        .append(jQuery('<span/>').append(jQuery('<b/>').text(settings.totalrecords)));
                        container.append(div1);
                        container.append(div2);
                    }else if(settings.totalrecords < 21){
                        if(upper > -1) {
                            div2.append(jQuery('<span/>').append(jQuery('<b/>').text(pageIndex * settings.recordsperpage + 1)))
                            .append(jQuery('<span/>').text(' - '))
                            .append(jQuery('<span/>').append(jQuery('<b/>').text(upper)))
                            .append(jQuery('<span/>').text('de'))
                            .append(jQuery('<span/>').append(jQuery('<b/>').text(settings.totalrecords)))
                            .append(select.append(option1).append(option2).append(option6))
                            .append(label);
                        }else{
                            div2.append(jQuery('<span/>').append(jQuery('<b/>').text("Todos")))
                            .append(select.append(option1).append(option2).append(option6));
                        }
                        container.append(div1);
                        container.append(div2);
                    }else if(settings.totalrecords < 51){
                        if(upper > -1) {
                            div2.append(jQuery('<span/>').append(jQuery('<b/>').text(pageIndex * settings.recordsperpage + 1)))
                            .append(jQuery('<span/>').text(' - '))
                            .append(jQuery('<span/>').append(jQuery('<b/>').text(upper)))
                            .append(jQuery('<span/>').text('de'))
                            .append(jQuery('<span/>').append(jQuery('<b/>').text(settings.totalrecords)))
                            .append(select.append(option1).append(option2).append(option3).append(option6))
                            .append(label);
                        }else{
                            div2.append(jQuery('<span/>').append(jQuery('<b/>').text("Todos")))
                            .append(select.append(option1).append(option2).append(option3).append(option6));
                        }
                        container.append(div1);
                        container.append(div2);

                    }else if(settings.totalrecords < 101){
                        if(upper > -1) {
                            div2.append(jQuery('<span/>').append(jQuery('<b/>').text(pageIndex * settings.recordsperpage + 1)))
                            .append(jQuery('<span/>').text(' - '))
                            .append(jQuery('<span/>').append(jQuery('<b/>').text(upper)))
                            .append(jQuery('<span/>').text('de'))
                            .append(jQuery('<span/>').append(jQuery('<b/>').text(settings.totalrecords)))
                            .append(select.append(option1).append(option2).append(option3).append(option4).append(option6))
                            .append(label);
                        }else{
                            div2.append(jQuery('<span/>').append(jQuery('<b/>').text("Todos")))
                            .append(select.append(option1).append(option2).append(option3).append(option4).append(option6));
                        }
                        container.append(div1);
                        container.append(div2);
                    }else if(settings.totalrecords < 201){
                        if(upper > -1) {
                            div2.append(jQuery('<span/>').append(jQuery('<b/>').text(pageIndex * settings.recordsperpage + 1)))
                            .append(jQuery('<span/>').text(' - '))
                            .append(jQuery('<span/>').append(jQuery('<b/>').text(upper)))
                            .append(jQuery('<span/>').text('de'))
                            .append(jQuery('<span/>').append(jQuery('<b/>').text(settings.totalrecords)))
                            .append(select.append(option1).append(option2).append(option3).append(option4).append(option5).append(option6))
                            .append(label);
                        }else{
                            div2.append(jQuery('<span/>').append(jQuery('<b/>').text("Todos")))
                            .append(select.append(option1).append(option2).append(option3).append(option4).append(option5).append(option6));
                        }
                        container.append(div1);
                        container.append(div2);
                    }else{
                        var div2Span; 
                        var tmpLabel = label;
                        if(upper > -1) {
                            div2Span = div2.append(jQuery('<span/>').append(jQuery('<b/>').text(pageIndex * settings.recordsperpage + 1)))
                            .append(jQuery('<span/>').text(' - '))
                            .append(jQuery('<span/>').append(jQuery('<b/>').text(upper)))
                            .append(jQuery('<span/>').text('de'))
                            .append(jQuery('<span/>').append(jQuery('<b/>').text(settings.totalrecords)))
                        }
                        else {
                            div2Span = div2.append(jQuery('<span/>').append(jQuery('<b/>').text("Todos")))
                            tmpLabel = jQuery('<label/>');
                        }
                        div2Span.append(select.append(option1).append(option2).append(option3).append(option4).append(option5).append(option6))
                        .append(tmpLabel);
                        container.append(div1);
                        container.append(div2);
                    }
                }
                function buildNavigation(startPage) {
                    list.find('li').remove();
                    if (settings.totalrecords <= settings.recordsperpage){
                        return;
                    } else if(settings.recordsperpage != -1) {
                        for (var i = startPage; i < startPage + settings.length; i++) {
                            if (i == totalpages) break;
                            list.append(jQuery('<li/>')
                                .append(jQuery('<a>').attr('id', (i + 1)).addClass(settings.theme).addClass('normal')
                                    .attr('href', 'javascript:void(0)')
                                    .text(i + 1))
                                .click(function() {                                
                                    currentPage = startPage + jQuery(this).closest('li').prevAll().length;
                                    navigate(currentPage);
                                }));
                        }
                    } else {
                        navigate(-1);
                    }
                    showLabels(startPage);
                    inputPage.val((startPage + 1));
                    list.find('li a').addClass(settings.theme).removeClass('active');
                    list.find('li:eq(0) a').addClass(settings.theme).addClass('active');
                    showRequiredButtons(startPage);
                }
                function navigate(topage) {
                    
                    //make sure the page in between min and max page count
                    var index = topage;
                    var mid = settings.length / 2;
                    if (settings.length % 2 > 0) mid = (settings.length + 1) / 2;
                    var startIndex = 0;
                    if ((topage >= 0 && topage < totalpages) || topage == -1) {
                        
                        
                        var recordStartIndex;
                        var recordsEndIndex;
                        
                        if (topage != -1)  {
                            
                            if (topage >= mid) {
                                if (totalpages - topage > mid)
                                    startIndex = topage - (mid - 1);
                                else if (totalpages > settings.length)
                                    startIndex = totalpages - settings.length;
                            }
                            buildNavigation(startIndex);
                            showLabels(currentPage);
                            list.find('li a').removeClass('active');
                            inputPage.val(currentPage + 1);
                            list.find('li a[id="' + (index + 1) + '"]').addClass('active');

                            recordStartIndex = currentPage * settings.recordsperpage;
                            recordsEndIndex = recordStartIndex + settings.recordsperpage;
                            if (recordsEndIndex > settings.totalrecords)
                                recordsEndIndex = settings.totalrecords % recordsEndIndex;
                            if (initialized) {
                                if (settings.onchange != null) {
                                    settings.onchange((currentPage + 1), recordStartIndex, recordsEndIndex);
                                }
                            }
                        } else {
                                recordStartIndex = 0;
                                recordsEndIndex = settings.totalrecords;
                        }
                        
                    
                        if (dataContainer != null) {
                            if (dataContainer.length > 0) {
                                //hide all elements first
                                dataElements.css('display', 'none');
                                //display elements that need to be displayed
                                if (jQuery(dataElements[0]).find('th').length > 0) { //if there is a header, keep it visible always
                                    jQuery(dataElements[0]).css('display', '');
                                    recordStartIndex++;
                                    recordsEndIndex++;
                                }
                                for (var i = recordStartIndex; i < recordsEndIndex; i++)
                                    jQuery(dataElements[i]).css('display', '');                             
                            }
                        }

                        showRequiredButtons();
                    }
                }
                function showRequiredButtons() {
                    if (totalpages > settings.length) {
                        if (currentPage > 0) {
                            btnPrev.css('display', '');
                        } else {
                            btnPrev.css('display', 'none');
                        }
                        if (currentPage > settings.length / 2 - 1) {
                            btnFirst.css('display', '');
                        } else {
                            btnFirst.css('display', 'none');
                        }

                        if (currentPage == totalpages - 1) {
                            btnNext.css('display', 'none');
                        } else { 
                            btnNext.css('display', '');
                        }
                        if (totalpages > settings.length && currentPage < (totalpages - (settings.length / 2)) - 1) {
                            btnLast.css('display', '');
                        } else {
                            btnLast.css('display', 'none');
                        };
                    } else {
                        btnFirst.css('display', 'none');
                        btnPrev.css('display', 'none');
                        btnNext.css('display', 'none');
                        btnLast.css('display', 'none');
                    }
                }
                function isTextSelected(el) {
                    var startPos = el.get(0).selectionStart;
                    var endPos = el.get(0).selectionEnd;
                    var doc = document.selection;
                    if (doc && doc.createRange().text.length != 0) {
                        return true;
                    } else if (!doc && el.val().substring(startPos, endPos).length != 0) {
                        return true;
                    }
                    return false;
                }
            });
        }
    });
}

/**
   * Función que reedita las configuraciones básicas del smartPaginator haciendo 
   * que sea sorteable por toda la tabla.
   * 
   * @param   table   El id de la tabla
   * @param   idiomaSelected  El idioma seleccionado
   * @param   totalRegistros   El total de registros en la tabla
   * @param   sortable   Si se ordenará por toda la tabla o no
   * 
   */
function loadSortablePaginator(table, idiomaSelected, totalRegistros, sortable){
      
      //Si el paginador es sortable (y no es nulo) modificamos las propiedades del paginador
      if (sortable === true) {
          makePaginatorSortable();
      } else {
          makeDefaultPaginator();
      }
      
      //Si existen registros, procedemos a crear la estructura del paginador
      if (totalRegistros > 0) {
          //Creamos el div con el paginador
          crearPaginador(table);
          //Creamos el contenedor para efectuar el evento de ordenar
          crearAnchors(table);
  
          var context = jQuery('#' + idPaginator + table).parent();
          //recuperamos el contenedor para crear el paginador y lo inicializamos
          jQuery('#' + idPaginator + table).smartpaginator({
              context: context,
              totalrecords: totalRegistros,
              recordsperpage: 10,
              divPaginacion: idPaginator + table,
              datacontainer: table ,
              dataelement: 'tr', 
              initval: 1, 
              next: '', 
              prev: '', 
              first: '',
              last: '', 
              display: 'single', 
              idioma: idiomaSelected
          });
          iniciarOrdenarTabla();
          
        //Reemplazamos la clase smartSort con la clase sort y le añadimos su icono
        var sort = jQuery("#" + table).find(".header").addClass('sort');
        if (sort.children("span.tableSortArrow").size() == 0) {
            sort.append('<span class="tableSortArrow">\u00A0\u00A0</span>'); 
        }
            
        //asociamos el evento de ordenar a todos los elementos con clase .anchor
        jQuery('.anchor', sort).click(function(e) {
            jQuery("#" + table + " tr").show(); //para ordenar han de ser todos visibles
            standardistaTableSorting.headingClicked(e); //se realiza la ordenación
            jQuery("#popup", parent.document).css("overflow", "scroll"); // Se activa el scroll  
            jQuery('#select').change(); //Obligamos al paginador a que se mueva a la primera página, mostrando los registros que ponga en la combo
        });   

      }
  }
  
  /**
   * Se crea el paginador que contendrá todos los elementos para el filtro y la navegación entre los resultados.
   */
  function crearPaginador(table) {
      //Creamos un div con el id por defecto para el paginador, le añadimos la clase de paginación y el margin automático
      //Lo insertamos justo después de nuesta tabla.
      jQuery("<div id='" + idPaginator + table + "'></div>").addClass("aplZonaPaginacion").css("margin", "auto").insertAfter(jQuery("#" + table));
  }
  
  /**
   * Se inicializan los contenedores para asociar posteriormente el evento de ordenado.
   */
  function crearAnchors(table) {
      //Encapsulamos cada titulo dentro de un elemento a que será quien realice la peticion para ordenar
      jQuery.each(jQuery.makeArray(jQuery("#" + table + " .header")), function() {
          jQuery("<a href='javascript:void(0)'></a>").html(jQuery(this).html()).appendTo(jQuery(this).html("")).addClass("anchor");
      });
      
  }