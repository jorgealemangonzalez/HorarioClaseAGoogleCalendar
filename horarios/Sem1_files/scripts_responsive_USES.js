function addEvent(obj, evType, fn){
    if (obj.addEventListener){
        obj.addEventListener(evType, fn, false);
        return true;
    } else if (obj.attachEvent){
        var r = obj.attachEvent("on"+evType, fn);
        return r;
    } else {
        return false;
    }
}

/* Añadir una llamada a window.onload() , encadenándola a las existentes. */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

function expandCollapseLeftSide(){
        // Ocultar div que contiene 'HtmlLeftSide'
        jQuery("#infoLeftSide").toggle();
        // Recuperar elemento 'fieldsetLeftSide'
        var fieldset = jQuery("#fieldsetLeftSide");
        // Expandir/Contraer 'fieldsetLeftSide'      
        fieldset.toggleClass("fieldcollapsed");
        // Expandir/Contraer frame lateral i guardar estado
        if(fieldset.hasClass("fieldcollapsed")) {
            jQuery("#barra").width("1%");
            var literalMostrar = jQuery("#textoMostrarInfoAdicional").text();
            fieldset.attr("title",literalMostrar);
            setCookie('NavFrameIzqdo','oculta');
        }
        else {
            jQuery("#barra").width("20%");
            var literalOcultar = jQuery("#textoOcultarInfoAdicional").text();
            fieldset.attr("title",literalOcultar);
            setCookie('NavFrameIzqdo','visible');
        }
}

function ocultarSiVacio() { 
 
     var contenidorContingutLeftSide = jQuery("#infoLeftSide");

     // Validem si el GENS_Template_Uninavs.jsp ja està amb el 'fieldset' ocultable      
     if(contenidorContingutLeftSide.length > 0) {
        // Nova versió per ocultar/mostrar el frame lateral
        if ( jQuery.trim(contenidorContingutLeftSide.text()) ==''){  
          // Ocultar el 'td' del frame lateral      
           jQuery("#barra").hide();         
         
          if(document.getElementById("iFrameAplZonaAplicacion")){
                document.getElementById("iFrameAplZonaAplicacion").style.marginLeft= '1px';
          }             
         }
        else {
            // Ocultem el contingut del 'fieldset' en el cas que ja estigués ocult en la petició anterior
            if (getCookie('NavFrameIzqdo') == 'oculta') expandCollapseLeftSide();                         
        }
    } 
    else {
      // Versió original per ocultar/mostrar el frame lateral
      if ((document.getElementById("barra").childNodes.length == 1 && navigator.appName!="Microsoft Internet Explorer") ||
          (document.getElementById("barra").childNodes.length == 0 && navigator.appName=="Microsoft Internet Explorer"))
      {
          document.getElementById("barra").style.width= '1%';
            
          if(document.getElementById("iFrameAplZonaAplicacion")){
              document.getElementById("iFrameAplZonaAplicacion").style.marginLeft= '1px';
          }
      }
    }
}
 


function CerrarMensaje()
{
    document.body.style.overflow = 'scroll';
    var zona = document.getElementById('MensajeOculto');
    zona.style.display = 'none';
    var zona2 = document.getElementById('AplFondoZonaOculta');
    zona2.style.display = 'none';
}

var firefoxVersion = navigator.userAgent.substring(navigator.userAgent.indexOf("Firefox")).split("/")[1]
var firefoxExtraHeight = parseFloat(firefoxVersion)>=0.1? 16 : 0 //extra height in px to add to iframe in FireFox 1.0+ browsers

function resizeIframe()
{
    var iframePrincipal = document.getElementById("iFrameAplZonaAplicacion");
    if (iframePrincipal.contentDocument && iframePrincipal.contentDocument.body.offsetHeight) //ns6 syntax
    {
        iframePrincipal.height = iframePrincipal.contentDocument.body.offsetHeight + firefoxExtraHeight;
    } else if (iframePrincipal.Document && iframePrincipal.Document.body.scrollHeight) { //ie5+ syntax
        iframePrincipal.height = iframePrincipal.Document.body.scrollHeight + firefoxExtraHeight;
    }
}

function setCookie(name, value){
    //If name is the empty string, it places a ; at the beginning
    //of document.cookie, causing clearCookies() to malfunction.
    if(name != '')
        document.cookie = name + '=' + value;
}

function getCookie(name){
    //Without this, it will return the first value
    //in document.cookie when name is the empty string.
    if(name == '')
        return('');
    name_index = document.cookie.indexOf(name + '=');
    if(name_index == -1)
        return('');
    cookie_value =  document.cookie.substr(name_index + name.length + 1,document.cookie.length);

    //All cookie name-value pairs end with a semi-colon, except the last one.
    end_of_cookie = cookie_value.indexOf(';');
    if(end_of_cookie != -1)
        cookie_value = cookie_value.substr(0, end_of_cookie);
    //Restores all the blank spaces.
    space = cookie_value.indexOf('+');
    while(space != -1){
        cookie_value = cookie_value.substr(0, space) + ' ' +
        cookie_value.substr(space + 1, cookie_value.length);
        space = cookie_value.indexOf('+');
    }
    return(cookie_value);
}

function clearCookie(name){
    expires = new Date();
    expires.setYear(expires.getYear() - 1);
    document.cookie = name + '=null' + '; expires=' + expires;
}

function clearCookies(){
    Cookies = document.cookie;
    Cookie = Cookies;
    expires = new Date();
    expires.setYear(expires.getYear() - 1);
    while(Cookie.length > 0){
        //All cookie name-value pairs end with a semi-colon, except the last one.
        Cookie = Cookies.substr(0, Cookies.indexOf(';'));
        Cookies = Cookies.substr(Cookies.indexOf(';') + 1, Cookies.length);
        if(Cookie != '')
            document.cookie = Cookie + '; expires=' + expires;
        else
            document.cookie = Cookies + '; expires=' + expires;
    }
}

var off = 1
function nolanzar() {
    if(off!=1) {
        return false;
    }
    else {
        off++;
    }
    return true;
}


/************************** Mensaje Mostrar Espere ************************/

function mostrarEspere(mensaje){

    var zona = document.getElementById('espere');                           //Buscar element espere
    zona.style.display = 'block';
    var zona2 = document.getElementById('bajoespere');                      //Buscar element bajoespere (fons)
    zona2.style.display = 'block';
    var tabla = document.getElementById('tablamensajeespere');              //Buscar tablamensajeespere
    tabla.tBodies[0].rows[0].cells.item(0).innerHTML=mensaje;               //En tablamensajeespere s'hi afegeix el missatge que s'afegeix al javascript des de la jsp
    return false;
}


/************************** Botones Rango/NoRango *************************/

var locked = new Array(1);
var i = 0;

locked[i] = false;

lock   = new Image(22, 13);
unlock = new Image(22, 13);


function swapImages(i,imag, from, to) {

    if (locked[i] == true) { //Joel canviat de false a true i canviat el codi, aixo es perque aixi tambe es contempla la opcio de que locked[i] encara no tingi cap valor assignat

        imag.className ="btnSinrango";
        imag.title='<j2ee:LiteralIdioma campo="kInfoCandado" recurso="General" />'
        locked[i] = false;
    } else {
        to.value = from.value;

        imag.className ="btnRango";
        imag.title='<j2ee:LiteralIdioma campo="kInfoCandadoDes" recurso="General" />'
        locked[i] = true;
    }
}

function swapImagesAsig(i, imag, from, to) {
    swapImages(i, imag, from, to);
    cambioAsig();
}


function lockCampoTexto(i, order, from, to) {

    iFrom  = from.value;
    iTo    = to.value;

    if (locked[i] == true) {

        if (order == 0) {

            to.value = iFrom;
        } else {

            from.value = iTo;
        }
    } else {

        if (isNaN(from.value)) {
            if (iFrom > to.value ) {
                to.value = iFrom;
            }
        } else {
            if (iFrom > parseInt(to.value) ) {
                to.value = iFrom;
            }
        }
    }
}


function lockCampoTextoAsig(i, order, from, to) {
    lockCampoTexto(i, order, from, to);
    cambioAsig();

}

function lockCombos(i, order, from, to) {

    iFrom  = from.selectedIndex;
    iTo    = to.selectedIndex;

    if (locked[i] == true || iFrom > iTo) { //Joel afegit el || iFrom > iTo ja que els select l'ordre tambe es determina per l'index, no cal el else d'abans, simplement aquesta comprovacio ja fa que el desti mai sobrepassi l' origen
        if (order == 0) {
            to.selectedIndex = iFrom;
        } else {
            from.selectedIndex = iTo;
        }
    }

/*/else {
            fromNum = parseInt(from[iFrom].value);
            if (isNaN(fromNum)) {
                if (from[iFrom].value > to[iTo].value ) {
                    to.selectedIndex = iFrom;
                }
            } else {
                if (fromNum > parseInt(to[iTo].value) ) {
                    to.selectedIndex = iFrom;
                }
            }
        }*/

}


/****************************** Zona Oculta ***********************************/

//La funció ObtenerParent serveix per anar a buscar varios nivells per sobre
//Per solucionar els pop-ups dintre de iframes

function ObtenerParent() {

    var tmpvar = parent.window;
    var control = false;
    var resultado;
    while (control == false){
        if (tmpvar == null){
            control = true;
        }
        else {
            resultado = tmpvar;
            tmpvar = parent.tmpvar;
        }
    }
    return resultado = resultado.parent.parent.parent.parent;
}


function AbrirOculto(ruta) {

    // En cas que la informació per pantallasigui menor de 700, obliga a que el
    // height sigui igual a 700. Solucionem el problema del pop-up tallat. FF & IE
    /*
    var scroll_id = parent.document.getElementById('iFrameAplZonaAplicacion');

    if( scroll_id.scrollHeight<700 ) {
        scroll_id.style.height = '700px';
       }

    if( scroll_id.offsetHeight<700 ) {
        scroll_id.style.height = '700px';
       }  */

    top.window.scrollTo(0,0);
    var zona = document.getElementById('AplZonaOculta');
    zona.style.display = 'block';

    var id_iframe = document.getElementById('iframe_oculto');
    id_iframe.src = ruta;
    id_iframe.style.overflow='auto';

}
function CerrarOculto() {

    var zona = parent.document.getElementById('AplZonaOculta');
    zona.style.display = 'none';

}


function mostrarMensaje(mensaje,tipo){

    var resultado = ObtenerParent();
    resultado.document.body.style.overflow = 'hidden';
    top.window.scrollTo(0,0);
    var zona = resultado.document.getElementById('MensajeOculto');
    zona.style.display = 'block';
    var zona2 = resultado.document.getElementById('AplFondoZonaOculta');
    zona2.style.display = 'block';
    var tabla = resultado.document.getElementById('divmensaje');
    if(tipo=="informativo"){
        tabla.tBodies[0].rows[0].cells.item(0).innerHTML=mensaje;
        tabla.tBodies[0].rows[0].cells.item(0).className='mensaje_informativo';
    }
    else if (tipo=="error"){
        tabla.tBodies[0].rows[0].cells.item(0).innerHTML=mensaje;
        tabla.tBodies[0].rows[0].cells.item(0).className='mensaje_error';
    }
    else if (tipo=="warning"){
        tabla.tBodies[0].rows[0].cells.item(0).innerHTML=mensaje;
        tabla.tBodies[0].rows[0].cells.item(0).className='mensaje_warning';
    }
    else if (tipo==null) {
        tabla.tBodies[0].rows[0].cells.item(0).innerHTML=mensaje;
        tabla.tBodies[0].rows[0].cells.item(0).className='mensaje_informativo';
    }
}


/*Afegit per a NIS (Responsive)*/


var DYNIFSCDNA = {
    // Storage for known IFrames.
    iframes: {},
    // Here we save any previously installed onresize handler.
    oldresize: null,
    // Flag that tell us if we have already installed our onresize handler.
    ready: false,
    // The document dimensions last time onresize was executed.
    dim: [-1,-1],
    // Timer ID used to defer the actual resize action.
    timerID: 0,
    // Obtain the dimensions (width,height) of the given document.
    getDim: function(d) {
        var w=200, h=1500, scr_h, off_h;
        //SI TIENE ALTURA EL DOCUMENT:
        if( d.height ) {
            return [d.width,d.height];
        }
        //si HAY FRAMESET:
        var cells="";
        cells=d.getElementsByTagName('frame');
        if (cells.length>0) {  //hay frames
            fsCollection=d.getElementsByTagName('frameset');
            if (fsCollection.length == 1) //usamos solo el primer frameset
            {
                //variable per controloar si n'hi ha framests anidats:
                var anidados=false;

                //si algun frame necesita el resto de pantalla
                // o sea no se ha determinado todos los tamaños o todos los porcentajes (o bien ya se ha resizado desde este procedimiento):
                if ((fsCollection.item(0).getAttribute("rows").indexOf("*")>=0) || (fsCollection.item(0).getAttribute("resized")=="yes")) //algun frame se ha dimensionado con *
                {
                    var at_rows =""
                    h=0;
                    for (var i=0;i<cells.length;i++)
                    {
                        //SI EL FRAME CONTIENE DENTRO UN FRAMSET (FRAMESETS ANIDADOS) CANCELAMOS EL RESIZAR:
                        if (cells[i].contentDocument) {
                            if  (cells[i].contentDocument.getElementsByTagName('frameset').length > 0) {
                                anidados=true;
                            };
                        }
                        else  if (cells[i].Document) {
                            if  (cells[i].Document.getElementsByTagName('frameset').length > 0) {
                                anidados=true;
                            };
                        }

                        //CONTAMOS LAS ALTURAS  DE LOS FRAMES: (DIFERENTE EN IE Q EN F F)

                        /*
                        if (cells[i].contentDocument) {
                            h=h+cells[i].contentDocument.body.offsetHeight;
                            at_rows=at_rows+(cells[i].contentDocument.body.offsetHeight+30)+',';

                        }
                        else if (cells[i].Document) {
                            h=h+cells[i].Document.body.scrollHeight;
                            at_rows=at_rows+(cells[i].Document.body.scrollHeight+30)+',';
                        }
                        */
                        if (navigator.userAgent.indexOf("MSIE")!=-1){ 
                          h=h+cells[i].Document.body.scrollHeight; 
                          at_rows=at_rows+(cells[i].Document.body.scrollHeight+30)+','; 
                        }else{ 
                          h=h+cells[i].contentDocument.body.offsetHeight; 
                          at_rows=at_rows+(cells[i].contentDocument.body.offsetHeight+30)+','; 
                        }

                        //Deberiamos hacer que en el onload de cada frame llamara al resize del iframe:
                        //solo lo haremos si el frameset no tenía ya el resized="yes" pq no será necesario
                        if (fsCollection.item(0).getAttribute("resized")!="yes")
                        {
                            addEvent(cells[i], 'load', new Function("parent.parent.DYNIFSCDNA.resize('iFrameAplZonaAplicacion');"));
                        }


                    }

                    if (anidados)  // si hay frameset anidados no hacemos nada, dejamos todo en el estado original
                    {
                        if (fsCollection.item(0).getAttribute("resized")=="yes")
                        {
                            //recuperamos el rows original del framset
                            fsCollection.item(0).setAttribute("rows",fsCollection.item(0).getAttribute("rows_back"));
                            fsCollection.item(0).setAttribute("resized","no");
                        }
                        return [w,575];
                    }
                    else //sólo redimensionamos si no hay framesets anidados
                    {
                        if (fsCollection.item(0).getAttribute("resized")!="yes")
                        {
                            //nos guardamos el rows anterior del framset
                            fsCollection.item(0).setAttribute("rows_back",fsCollection.item(0).getAttribute("rows"));
                        }
                        //redimensionem els frames al framset:
                        fsCollection.item(0).setAttribute("rows",at_rows.substring(0,at_rows.length-1));
                        //marcamos  el framset como que se ha redimensionado automaticamente:
                        fsCollection.item(0).setAttribute("resized","yes");

                        if (h>0) {
                            h=h+30*(cells.length-1); //per cada frame hem de sumar 30px
                            return [w,h];
                        }
                    //alert(fsCollection.item(0).getAttribute("rows"));
                    //fsCollection.item(0).setAttribute("id", "ULID"+u);
                    }
                }
                else {
                    return [w,575];
                } // si se han dimensionado todos los frames no resizamos el iframe
            }
        }

        //SI TIENE ALTURA EL BODY:
        with( d.body ) {
            if( scrollHeight ) {
                h=scr_h=scrollHeight;
                w=scrollWidth;
            }
            if( offsetHeight ) {
                h=off_h=offsetHeight;
                w=offsetWidth;
            }
            if( scr_h && off_h ) h=Math.max(scr_h, off_h);
            }
        return [w,h];
    },
    // This is our window.onresize handler.
    onresize: function() {
        // Invoke any previously installed onresize handler.
        if( typeof this.oldresize == 'function' ) {
            this.oldresize();
        }
        // Check if the document dimensions really changed.
        var dim = this.getDim(document);
        if( this.dim[0] == dim[0] && this.dim[1] == dim[1] ) return;
        // Defer the resize action to prevent endless loop in quirksmode.
        if( this.timerID ) return;
        this.timerID = setTimeout('DYNIFSCDNA.deferred_resize();', 10);
    },
    // This is where the actual IFrame resize is invoked.
    deferred_resize: function() {
        // Walk the list of known IFrames to see if they need to be resized.
        for( var id in this.iframes ) this.resize(id);
        // Store resulting document dimensions.
        this.dim = this.getDim(document);
        // Clear the timer flag.
        this.timerID = 0;
    },
    // This is invoked when the IFrame is loaded or when the main window is resized.
    resize: function(id) {
        // Browser compatibility check.
        if( !window.frames || !window.frames[id] || !document.getElementById || !document.body )
            return;
        // Get references to the IFrame window and layer.

        var iframe = window.frames[id];
        var div = document.getElementById(id);
        if( !div ) return;
        // Save the IFrame id for later use in our onresize handler.
        if( !this.iframes[id] ) {
            this.iframes[id] = true;
        }

        // Should we inject our onresize event handler?
        if( !this.ready ) {
            this.ready = true;
            this.oldresize = window.onresize;
            window.onresize = new Function('DYNIFSCDNA.onresize();');
        }
        // This appears to be necessary in MSIE to compute the height

        // when the IFrame'd document is in quirksmode.
        // OTOH, it doesn't seem to break anything in standards mode, so...
        if( document.all ) div.style.height = '0px';
        // Resize the IFrame container.
        var dim = this.getDim(iframe.document);
        //la altura mínima ha de ser 700, pq hay divs ocultos que se abren con altura 700
        if (dim[1]+30<700){
            dim[1]=670;
        }
        div.style.height = (dim[1]+130) + 'px'; 
        
        //Hacemos scroll hasta el top de la pantalla
        top.window.scrollTo(0,0);
          
    }
};