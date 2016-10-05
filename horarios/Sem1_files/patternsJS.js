/*-------------------------------------------------------------------------------------------------
  -Producto:	PATRONES.
  -Versión: rev. 1.0.0
  -Compatibilidad: FF 3.X y sup., IE 7 y sup., Chrome 12 y sup., Opera 10 y sup., Safari 5 y sup.
  -Autores:	VMMA
  http://www.gestionuniversitariasigma.com/
---------------------------------------------------------------------------------------------------*/

/** A partir de la inclusión del component dialog de jQuery, se mantiene este método por compatibilidad.**/
  function copiarRegistro(numRegistro) 
  {
      var elementos = document.formu_Edi.elements; 
      for(i=0; i< elementos.length; i++) 
      { 
        if ( (elementos[i].name != undefined) && (elementos[i].name.indexOf("iterator." + numRegistro) != -1) ) 
        {
          var tipo = window.opener.document.getElementById(elementos[i].name).type; 
          var tipoOrigen=elementos[i].type; 
          if(tipo!=tipoOrigen){ 
            if(tipoOrigen=='checkbox' || tipoOrigen=='radio'){ 
                if(elementos[i].checked){ 
                window.opener.document.getElementById(elementos[i].name).value=elementos[i].value; 
                }else{ 
                window.opener.document.getElementById(elementos[i].name).value=''; 
                } 
            } else if(tipoOrigen == 'select'){ 
                window.opener.document.getElementById(elementos[i].name).value = elementos[i].selected; 
            } else { 
                window.opener.document.getElementById(elementos[i].name).value = elementos[i].value; 
            }             
          }else{ 
            if(tipo == 'checkbox' || tipo == 'radio'){ 
                if(elementos[i].checked == ''){ 
                    window.opener.document.getElementById(elementos[i].name).removeAttribute('checked'); 
                } 
                window.opener.document.getElementById(elementos[i].name).checked = elementos[i].checked; 
                 
            } else if(tipo == 'select'){ 
                window.opener.document.getElementById(elementos[i].name).selected = elementos[i].selected; 
            } else { 
                window.opener.document.getElementById(elementos[i].name).value = elementos[i].value; 
            } 
          } 
        } 
      } 
  }
  
  function copiarRegistroPopup(numRegistro, formNameOrigen, formNameDestino) 
  {
      if (formNameOrigen == undefined)
      {
        formNameOrigen = 'formu_Edi';
      }
      
      if (formNameDestino == undefined)
      {
        formNameDestino = 'formu_inf';
      }

      var elementos = document.forms[formNameOrigen];
      var formDestino = document.forms[formNameDestino];
      for(i=0; i< elementos.length; i++) 
      {
        if ( (elementos[i].name != undefined) && (elementos[i].name.indexOf("iterator." + numRegistro) != -1) ) 
        {
          var tipo = formDestino.elements[elementos[i].name].type;
          var tipoOrigen=elementos[i].type;
          if(tipo!=tipoOrigen)
          { 
            if(tipoOrigen=='checkbox' || tipoOrigen=='radio')
            { 
              if(elementos[i].checked)
              { 
                formDestino.elements[elementos[i].name].value=elementos[i].value;
              }
              else
              {
                formDestino.elements[elementos[i].name].value='';
              } 
            }
            else if(tipoOrigen == 'select')
            { 
              formDestino.elements[elementos[i].name].value = elementos[i].selected;
            } 
            else 
            { 
              formDestino.elements[elementos[i].name].value = elementos[i].value;
            }             
          }
          else
          { 
            if(tipo == 'checkbox' || tipo == 'radio')
            { 
              if(elementos[i].checked == '')
              { 
                formDestino.elements[elementos[i].name].removeAttribute('checked');
              } 

              formDestino.elements[elementos[i].name].checked = elementos[i].checked; 
            } 
            else if(tipo == 'select')
            { 
              formDestino.elements[elementos[i].name].selected = elementos[i].selected; 
            }
            else 
            { 
              formDestino.elements[elementos[i].name].value = elementos[i].value;
            } 
          } 
        }
      }
  }

  function modificarEstado(elementoEstadoActual, accion)
  {
      estadoActual = document.getElementById(elementoEstadoActual).value;

      if (estadoActual == 'UNCHANGED')
      {
          if (accion == 'MODIFICAR')
          {
              document.getElementById(elementoEstadoActual).value = 'UPDATED';

              if (window.opener != null)
              {
                if (window.opener.beforeunload)
                {
                  window.opener.onbeforeunload=window.opener.beforeunload;
                }
                else
                {
                  window.onbeforeunload=beforeunload;
                }
              }
              else if (window.beforeunload)
              {
                window.onbeforeunload=beforeunload;
              }
          }
          else if (accion == 'ELIMINAR')
          {
              document.getElementById(elementoEstadoActual).value = 'DELETED';
          }
          else if (accion == 'BAJA_LOGICA')
          {
              document.getElementById(elementoEstadoActual).value = 'BAJA_LOGICA';

              if (window.opener != null)
              {
                if (window.opener.beforeunload)
                {
                  window.opener.onbeforeunload=window.opener.beforeunload;
                }
                else
                {
                  window.onbeforeunload=beforeunload;
                }
              }
              else if (window.beforeunload)
              {
                window.onbeforeunload=beforeunload;
              }              
          }
      }
      else if (estadoActual == 'DELETED')
      {
          if (accion == 'ELIMINAR')
          {
              document.getElementById(elementoEstadoActual).value = 'DELETED';
          }
      }
      else if (estadoActual == 'UPDATED')
      {
          if (accion == 'ELIMINAR')
          {
              document.getElementById(elementoEstadoActual).value = 'DELETED';
          }
      }
  }

  function modificarEstadoPopup(elementoEstadoActual, accion, formOrigen)
  {
      var formActual = document.forms[formOrigen];
      estadoActual = formActual.elements[elementoEstadoActual].value;

      if (estadoActual == 'UNCHANGED')
      {
          if (accion == 'MODIFICAR')
          {
              formActual.elements[elementoEstadoActual].value = 'UPDATED';

              if (window.beforeunload)
              {
                window.onbeforeunload=window.beforeunload;
              }
          }
          else if (accion == 'ELIMINAR')
          {
              formActual.elements[elementoEstadoActual].value = 'DELETED';
          }
          else if (accion == 'BAJA_LOGICA')
          {
              formActual.elements[elementoEstadoActual].value = 'BAJA_LOGICA';

              if (window.beforeunload)
              {
                window.onbeforeunload=window.beforeunload;
              }
          }
      }
      else if (estadoActual == 'DELETED')
      {
          if (accion == 'ELIMINAR')
          {
              formActual.elements[elementoEstadoActual].value = 'DELETED';
          }
      }
      else if (estadoActual == 'UPDATED')
      {
          if (accion == 'ELIMINAR')
          {
              formActual.elements[elementoEstadoActual].value = 'DELETED';
          }
      }
  }

  function modificarEstadoDescripcion(elementoEstadoActual, accion)
  {
      estadoPadreActual = window.opener.document.getElementById(elementoEstadoActual).value;

      if (estadoPadreActual == 'UNCHANGED')
      {
          document.getElementById(elementoEstadoActual).value = "UPDATED";
          
          if (window.opener.opener.beforeunload)
          {
            window.opener.opener.onbeforeunload=window.opener.opener.beforeunload;
          }
          else
          {
            window.opener.onbeforeunload=window.opener.beforeunload;
          }
      }
      else if (estadoPadreActual == 'INSERTED')
      {
          document.getElementById(elementoEstadoActual).value = "INSERTED";
      }
      else if (estadoPadreActual == 'UPDATED')
      {
          document.getElementById(elementoEstadoActual).value = "UPDATED";
          if (window.opener.opener.beforeunload)
          {
            window.opener.opener.onbeforeunload=window.opener.opener.beforeunload;
          }
          else
          {
            window.opener.onbeforeunload=window.opener.beforeunload;
          }
      }
  }
  
  function modificarEstadoDescripcionPopup(elementoPadreEstadoActual, accion, formNameOrigen, formNameDestino)
  {
      if (formNameOrigen == undefined)
      {
        formNameOrigen = 'selIdioma'; 
      }

      var formOrigen = document.forms[formNameOrigen];
      var formDestino = document.forms[formNameDestino];
      if (formOrigen == undefined)
      {
        formOrigen = formDestino;
      }

      if ( (formDestino.elements[elementoPadreEstadoActual].value == 'UNCHANGED') && (accion == 'MODIFICAR') )
      {
        formOrigen.elements[elementoPadreEstadoActual].value = 'UPDATED';
      }
      else if ( (formDestino.elements[elementoPadreEstadoActual].value == 'INSERTED') && (accion == 'MODIFICAR') )
      {
        formOrigen.elements[elementoPadreEstadoActual].value = 'INSERTED';
      }
      else if ( (formDestino.elements[elementoPadreEstadoActual].value == 'UPDATED') && (accion == 'MODIFICAR') )
      {
        formOrigen.elements[elementoPadreEstadoActual].value = 'UPDATED';
      }
      
      if (accion == 'MODIFICAR')
      {
        if (window.beforeunload)
        {
          window.onbeforeunload=window.beforeunload;
        }
      }
   }
  
  function paginasConError(elemento)
  {
      var tabs = elemento.childNodes;
      var divs = new Array();
      var errores = new Array();
      var innerCount = 0;
      for (count = 0; count < tabs.length; count++)
      {
          if (tabs[count] && (tabs[count] != 'undefined') )
          {
              if ( (tabs[count].tagName) && (tabs[count].tagName != 'undefined') )
              {
                  if (tabs[count].tagName == 'DIV')
                  {
                      if (tabs[count].id != 'undefined')
                      {
                          divs[innerCount] = tabs[count];
                          innerCount = innerCount + 1;
                      }
                  }
              }
          }
      }

      var errorCount = 0;
      for (count = 0; count < divs.length; count++)
      {
          var div = divs[count];
          var errorValidacion = obtenerErrorValidacion(div);
          
          if (errorValidacion != null)
          {
            errores[errorCount] = count;
            errorCount = errorCount + 1;
          }
      }

      return errores;
  }

  function obtenerErrorValidacion(elemento)
  {
    var element2Ret = null;
    
    var divHijos = elemento.getElementsByTagName('DIV');
    for (innerCount = 0; innerCount < divHijos.length; innerCount++)
    {
        if (divHijos[innerCount].getAttribute("class") == 'error')
        {
            element2Ret = divHijos[innerCount];
            break;
        }
    }

    return element2Ret;
  }
  
  function posicionarTab(idParentTab, selectedTab)
  {
  
      if ( (selectedTab == null) || (selectedTab < 0) )
      {
        selectedTab = 0;
      }
  
      var errores = paginasConError(document.getElementById("tabs"));
      var iFound = -1;
      if ( (errores != null) && (errores.length > 0) )
      {
        for (count = 0; count < errores.length; count++)
        {
          if (errores[count] == selectedTab)
          {
            iFound = count;
            break;
          }
        }
          
        if (iFound != -1)
        {
          selectedTab = errores[iFound];           
        }
        else
        {
          selectedTab = errores[0];
        }
      }
  
      if ( (selectedTab != null) && (selectedTab >= 0) )
      {
          $(function() {
                  $( "#" + idParentTab ).tabs({ selected: selectedTab });
          });
      }
      else
      {
          $(function() {
                  $( "#" + idParentTab ).tabs();
          });
      }
  }
  
  
  function paginaErrorValidacion(tablaPaginacion, registrosPorPagina)
  {
    var i2Ret = 0;
    var registros = tablaPaginacion.getElementsByTagName('TR');
    for (count = 0; count < registros.length; count++)
    {
      var tr = registros[count];
      var errorValidacion = obtenerErrorValidacion(tr);
      if (errorValidacion != null)
      {
        i2Ret = count;
        break;
      }
    }

    return i2Ret;
  }
  
  /**
   * Se manteniene éste método por compatibilidad con los primeros mantenimiento que no contenían el parámetro idioma
   */     
  function posicionarPaginacion(totalRegistros, registrosPorPagina, idTablaPaginacion, idDivPaginacion)
  {
    posicionarPaginacion(totalRegistros, registrosPorPagina, idTablaPaginacion, idDivPaginacion, 'es');
  }
  
  function posicionarPaginacion(totalRegistros, registrosPorPagina, idTablaPaginacion, idDivPaginacion, idioma)
  {
    var i2Ret = 1;
    var tablaPaginacion = document.getElementById(idTablaPaginacion);
    if (tablaPaginacion)
    {
      var errorValidacion = obtenerErrorValidacion(tablaPaginacion);
      if (errorValidacion != null)
      {
        i2Ret = paginaErrorValidacion(tablaPaginacion, registrosPorPagina);
      }
    }

    if (i2Ret > 1)
    {
      i2Ret = i2Ret /registrosPorPagina;
      i2Ret = Math.ceil(i2Ret);
    }

    $(document).ready(function() {
        $('#' + idDivPaginacion).smartpaginator({ totalrecords: totalRegistros,
                                               recordsperpage: registrosPorPagina,
                                               divPaginacion: idDivPaginacion,
                                               datacontainer: idTablaPaginacion,
                                               dataelement: 'tr', initval: i2Ret, 
                                               next: '', prev: '', first: '',
                                               last: '', display: 'single', idioma: idioma });
    });
  }
  
  /**
   * A partir de código HTML determina si existe algún error de validación.
   */     
  function existeError(htmlData)
  {
    var b2Ret = false;
    var divElements = $(htmlData).find('div');
    for (i = 0; i< divElements.length; i++)
    {
      if (divElements[i].className == 'error')
      {
        b2Ret = true;
        break;
      }
    }
    
    return b2Ret;
  }
