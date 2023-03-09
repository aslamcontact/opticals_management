//const sqlite3 = require('sqlite3').verbose();

//mo=require('./mod')
window.addEventListener('DOMContentLoaded', () => {

  $(window).on('load',dply1);
  $(document).on('keypress', 'input,select', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        var $next = $('[tabIndex=' + (+this.tabIndex + 1) + ']');
       // console.log($next.length);
      $next.focus();
    }
});

  // Changed to on() method to use delegation from the body
//$("body").on("click", "#boundOnPageLoaded", al);
$("body").on("click", "#sdply1",dply1);
$("body").on("click", "#sdply2",dply2);
 $("body").on("click", "#sdply3",dply3);
 $("body").on("click", "#sdply4",dply4);
 $("#print").click(
   function()
    {
      $("#print").hide();
      window.print();
      $("#print").show();
    }
 );
 $("#cash2,#card,#gpay").keyup(
     function()
      {
        tamt=parseInt($("#tamt").val());
        cash=parseInt($("#cash2").val());
        gpay=parseInt($("#gpay").val());
        card=parseInt($("#card").val());
          if($("#bno").val()=="") { $("#s2").text("");$("#er2").text("Please Enter Bill Number");$("#bno").focus()}

         else if(card+gpay+cash>tamt){ $("#s2").text("");$("#er2").text("Received Amount is more than Total Amount");}
          else {
            $("#bal").val(tamt-(card+gpay+cash));
            $("#recv").val((card+gpay+cash));
            $("#er2").text("")
          }
      }
   );

   $("body").on("change", "input[name='ordel']",function()
   {
  
    
      
        for(i in document.getElementsByName("ordel"))
         {
            if(document.getElementsByName("ordel")[i].checked)
            {
              $("#bno").val(document.getElementsByName("ordel")[i].value);
              $("#tamt").val(0);
              $("#cash2").val(0);
              $("#gpay").val(0);
              $("#card").val(0);
              $("#bal").val("");
              $("#recv").val("");
              $("#s2").text("");
              $("#er2").text("");
              $("#dordr").focus();
              //alert(document.getElementsByName("ordel")[i].value);
            }
         }
      //alert("nj");


     // alert(tst);
   

   

   });



   $("body").on("change", "input[name='expdel']",function()
   {
  
    
      
        for(i in document.getElementsByName("expdel"))
         {
            if(document.getElementsByName("expdel")[i].checked)
            {
              $("#exp").val(document.getElementsByName("expdel")[i].value);
              $("#eamt").val("");
             
              $("#dexp").focus();
              //alert(document.getElementsByName("ordel")[i].value);
            }
         }
      //alert("nj");


     // alert(tst);
   

   

   });

  
  // Rest of code stays the same
//$( "#removeButton" ).click(al);
  
 // $( "#addButton" ).click(ad);
   //document.getElementById("home").addEventListener("click",hmpg);
 //  document.getElementById("chk").addEventListener("click",clr); 
 
  
   })

   
    function dply1()
     {
      // $("#out").text("sdf");
     
      $("#dply2").hide();
      $("#dply3").hide();
      $("#dply4").hide();
      $("#dply1").show();
      $('form').get(0).reset();
     }
     function dply2()
     {
      // $("#out").text("sdf");
      $("#dply1").hide();
      $("#dply3").hide();
      $("#dply4").hide();
      $("#dply2").show();
     }
     function dply3()
     {
      // $("#out").text("sdf");
      $("#dply1").hide();
     
      $("#dply4").hide();
      $("#dply2").hide();
      $("#dply3").show();
      
     }
     function dply4()
     {
      // $("#out").text("sdf");
      $("#dply1").hide();
      $("#dply3").hide();
      
      $("#dply2").hide();
      $("#dply4").show();
     }
     function al()
      {
        alert("sd")
      }
      function bal_check()
       {
         var tamt=$("#tamt").value;
         $("#bal").value=tamt;
       }






     function rm() {
      $("#boundOnPageLoaded").remove();
      }
      function ad() {
        $("#container").html('<button id="btn">Click Me</button><div id="out">f</div>');
      //  $("#container").html('<button id="btn">Click Me</button>');
       // $("#container").html('<div id="out"></div>');
         }



         