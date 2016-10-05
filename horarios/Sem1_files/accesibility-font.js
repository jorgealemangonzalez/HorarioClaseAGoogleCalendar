$(document).ready(function(){
    



  var section = new Array('.tiles-footer','.text', 'span', 'a');
  section = section.join(',');
  
  /*$("#iframeprototipos").load(function (){
  var tmp = $('#iframeprototipos').contents().find('.Titulo').html();
});   */

  
   //Reset Font Size
  var originalFontSize = $(section).css('font-size');
  $(".resetFont").click(function(){
    $(section).css('font-size', originalFontSize);
  });
 
  // Increase Font Size
  $(".increaseFont").click(function(){
    var currentFontSize = $(section).css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum*1.1;
    $(section).css('font-size', newFontSize);
    
    $('#iframeprototipos').contents().find('.Titulo').css('background-color', 'red');
    
    
    return false;
  });
 
  // Decrease Font Size
  $(".decreaseFont").click(function(){
    var currentFontSize = $(section).css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum*0.9;
    $(section).css('font-size', newFontSize);
    return false;
  });
});




/*$(document).ready(function(){
  var section = new Array('.tiles-footer','.text', 'span', 'a');
  section = section.join(',');
 
  // Reset Font Size
  var originalFontSize = $(section).css('font-size');
  $(".resetFont").click(function(){
    $(section).css('font-size', originalFontSize);
  });
 
  // Increase Font Size
  $(".increaseFont").click(function(){
    var currentFontSize = $(section).css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum*1.2;
    $(section).css('font-size', newFontSize);
    return false;
  });
 
  // Decrease Font Size
  $(".decreaseFont").click(function(){
    var currentFontSize = $(section).css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum*0.8;
    $(section).css('font-size', newFontSize);
    return false;
  });*/
