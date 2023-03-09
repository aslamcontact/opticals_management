// preload.js

const { format } = require("path/posix");

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const fs = require("fs");
const path = require('path');
const { DH_NOT_SUITABLE_GENERATOR } = require("constants");
const exp = require("constants");
window.addEventListener('DOMContentLoaded', () => {
 
 // display=document.getElementById("dply");
 // bt.addEventListener("click",in_opamt());
   //---var for dply1
   in_opamt=document.getElementById("iopamt");
   del_opamt=document.getElementById("dopamt");
   amt1=document.getElementById("amt1");  
   disply1= document.getElementById("out1")
   er1=document.getElementById("er1");
   s1=document.getElementById("s1");
   dt1=document.getElementById("date1");
   dt1.valueAsDate=new Date();

            //======= var for dsply2

   dt2=document.getElementById("date2");
   disply2= document.getElementById("out2")
   er2=document.getElementById("er2");
   s2=document.getElementById("s2");
   bno=document.getElementById("bno");
   tamt=document.getElementById("tamt");
   cash2=document.getElementById("cash2");
   card=document.getElementById("card");
   gpay=document.getElementById("gpay");
   dvery=document.getElementById("dvery");
   bal=document.getElementById("bal");
   recv=document.getElementById("recv");
   in_ordr=document.getElementById("iordr");
   del_ordr=document.getElementById("dordr");
   dt2.valueAsDate=new Date();
   dt2.addEventListener("change",function(event){sh_ordr()})
   
   
    //---------var for disply3


    dt3=document.getElementById("date3");
    disply3= document.getElementById("out3")
   er3=document.getElementById("er3");
   s3=document.getElementById("s3");
   expn=document.getElementById("exp");
   eamt=document.getElementById("eamt");
   in_exp=document.getElementById("iexp");
   del_exp=document.getElementById("dexp");
   dt3.valueAsDate=new Date();
   dt3.addEventListener("change",function(event){sh_exp()})
   //========display4
   dt4=document.getElementById("date4");
   dt4.valueAsDate=new Date();
   disply4= document.getElementById("out4");
   dt4.addEventListener("change",function(event){f_report()})
  //----sho report
  f_report()
  function f_report()
   {
    var totrec=0,totalamt=0,totalexp=0,totgpy=0,totcrd=0,totcash=0,fnamt=0,oamt=0;
    var dsig=0,ar;
    var frmt;
     
     fs.readFile(path.join(__dirname,'./src/data/test.json'), "utf8", (err, jsonString) => {
         if (err) {
          // alert("File read failed:"+err);
           return;
         }
         damt=JSON.parse(jsonString);
       
         for(i in damt.data)
           {
             //alert("3");
               if(damt.data[i].date==dt4.value){dsig=1;ar=i;}
           }
           if(dsig==0) disply4.innerHTML="Please Add Open Amount For this Date";
           else { 
            oamt=damt.data[ar].opamt;
              frmt="<div class=\"text-success text-center-lg\"><b>Open Amount: "+damt.data[ar].opamt+"</div><br>";
             
              frmt+="<table  class=\"table\"><tr class=\"bg-dark text-white\"><th>S.NO</th><th>Biino</th><th>Cash</th><th>Card</th><th>Gpay</th><th>Total</th><th>Received</th><th>Balance</th><th>Delivery</th></tr>";
             
              for(i in damt.data[ar].ordr) 
                   {
                    // alert("7")
                    totalamt+=parseInt(damt.data[ar].ordr[i].totl);
                    totcash+=parseInt(damt.data[ar].ordr[i].cash);
                    totcrd+=parseInt(damt.data[ar].ordr[i].crd);
                    totgpy+=parseInt(damt.data[ar].ordr[i].gpy);
                    totrec+=(damt.data[ar].ordr[i].crd+damt.data[ar].ordr[i].gpy+damt.data[ar].ordr[i].cash);
                      frmt+="<tr><td> "+(parseInt(i)+1)+" </td><td>"+damt.data[ar].ordr[i].bill+"</td><td>"+damt.data[ar].ordr[i].cash+"</td><td>"+damt.data[ar].ordr[i].crd+"</td><td>"+damt.data[ar].ordr[i].gpy+"</td>";
                      frmt+="<td>"+damt.data[ar].ordr[i].totl+"</td><td>"+(damt.data[ar].ordr[i].crd+damt.data[ar].ordr[i].gpy+damt.data[ar].ordr[i].cash)+"</td><td>"+damt.data[ar].ordr[i].bala+"</td><td>"+damt.data[ar].ordr[i].dvery+"</td></tr>";   
                   }   
                   frmt+="<tr class=\"text-success\"><td colspan=\"4\" >Total Amount: "+totalamt+"</b></td><td colspan=\"5\"><b>Total Received:"+totrec+"<b></td></tr></table>";
                  
                   frmt+="<br><table  class=\"table\"><tr class=\"bg-dark text-white\"><th>S.NO</th><th>Expense</th><th>Amount</th></tr>";
                
                   for(i in damt.data[ar].exp) 
                        {
                         totalexp+=damt.data[ar].exp[i].examt;
                           frmt+="<tr><td> "+(parseInt(i)+1)+" </td><td>"+damt.data[ar].exp[i].ename+"</td><td>"+damt.data[ar].exp[i].examt+"</td></tr>";
                            
                        }   
                        frmt+="<tr class=\"text-success text-center\"><td colspan=\"2\">Expense:</td><td>"+totalexp+"</td></tr></table>";
                       // fnamt=(totcash+oamt)-totalexp;
                        fnamt=parseInt(totcash)+parseInt(oamt)-parseInt(totalexp);
                      // fnamt=parseInt(totalexp);
                        frmt+="<div class=\"text-primary text-center-sm\">Final Report</div><br><table  class=\"table\" align=\"center\">"
                        frmt+="<tr ><th class=\"bg-secondary text-white\">card  :</th><td >"+totcrd+"</td><th class=\"bg-secondary text-white\">Expense  :</th><td >"+totalexp+"</td></tr>";
                      
                        frmt+="<tr><th  class=\"bg-secondary text-white\">Gpay  :</th><td >"+totgpy+"</td><th class=\"bg-secondary text-white\">    Cash[op] :</th><td >"+fnamt+"</td></tr>";
                        frmt+="<tr ><th class=\"bg-secondary text-white\">Cash  :</th><td >"+totcash+"</td><th class=\"bg-secondary text-white\">Final Cash :</th><td >"+(parseInt(fnamt)-parseInt(oamt))+"</td></tr>";
                       
                        
                       frmt+="<tr ><th class=\"bg-secondary text-white\">Total   :</th><td>"+(parseInt(totrec)+parseInt(oamt))+"</td><th class=\"bg-secondary text-white\">Final total  :</th><td >"+(parseInt(totrec)+parseInt(oamt)-parseInt(totalexp))+"</td></tr>";
                       // frmt+="<tr class=\"bg-secondary text-white\"></tr>";
                        //frmt+="<tr></tr>";
                        frmt+="</table>";
                        
                        disply4.innerHTML=frmt;
              }
   
         });
        
        //    

   }



   //---show open amounts


   sh_amt();
      // ----------show amount
   function sh_amt()
    {
       
        // alert("1")
        fs.readFile(path.join(__dirname,'./src/data/test.json'), "utf8", (err, jsonString) => {
            if (err) {
             // alert("File read failed:"+err);
              return;
            }
            damt=JSON.parse(jsonString);
            var frmt="<table  class=\"table\"><thead><tr class=\"bg-dark text-white\"><th>Dtae</th><th>Amount</th></tr></thead><tbody>";
          //  alert(damt.data[0].date)
            for(i in damt.data)
             {
                if(i%2==0)
                 frmt+="<tr class=\"bg-light text-dark\"><td>"+damt.data[i].date+"</td><td>"+damt.data[i].opamt+"</td></tr>";
                 else  frmt+="<tr class=\"bg-light text-dark\"><td>"+damt.data[i].date+"</td><td>"+damt.data[i].opamt+"</td></tr>";
             }
            frmt+="</tbody></table>";
            disply1.innerHTML=frmt;
            });
           
           //    
    
          }
    // ------ show order
    sh_ordr()
    function sh_ordr()
    {
       var dsig=0,ar;
       var frmt;
        
        fs.readFile(path.join(__dirname,'./src/data/test.json'), "utf8", (err, jsonString) => {
            if (err) {
             // alert("File read failed:"+err);
              return;
            }
            damt=JSON.parse(jsonString);
          
            for(i in damt.data)
              {
                //alert("3");
                  if(damt.data[i].date==dt2.value){dsig=1;ar=i;}
              }
              if(dsig==0) disply2.innerHTML="Please Add Open Amount";
              else { 
                
                 frmt="<div class=\"text-info text-center\">Open Amount: "+damt.data[ar].opamt+"</div><br>";
                
                 frmt+="<table  class=\"table\"><tr class=\"bg-dark text-white\"><th>S.NO</th><th>Bill No</th><th>Cash</th><th>Card</th><th>Gpay</th><th>Total</th><th>Received</th><th>Balance</th><th>Delivery</th></tr>";
                
                 for(i in damt.data[ar].ordr) 
                      {
                       // alert("7")
                         frmt+="<tr><td> <input type=\"radio\" id=\"ordel\" name=\"ordel\" value=\""+damt.data[ar].ordr[i].bill+"\">.<label>"+(parseInt(i)+1)+"</label> </td><td>"+damt.data[ar].ordr[i].bill+"</td><td>"+damt.data[ar].ordr[i].cash+"</td><td>"+damt.data[ar].ordr[i].crd+"</td><td>"+damt.data[ar].ordr[i].gpy+"</td>";
                         frmt+="<td>"+damt.data[ar].ordr[i].totl+"</td><td>"+(damt.data[ar].ordr[i].crd+damt.data[ar].ordr[i].gpy+damt.data[ar].ordr[i].cash)+"</td><td>"+damt.data[ar].ordr[i].bala+"</td><td>"+damt.data[ar].ordr[i].dvery+"</td></tr>";   
                      }   
                      frmt+="</table>";
                      disply2.innerHTML=frmt;
                 }
       /*     var frmt="<table  class=\"table\"><thead><tr class=\"bg-dark text-white\"><th>Dtae</th><th>Amount</th></tr></thead><tbody>";
          //  alert(damt.data[0].date)
            for(i in damt.data)
             {
                if(i%2==0)
                 frmt+="<tr class=\"bg-light text-dark\"><td>"+damt.data[i].date+"</td><td>"+damt.data[i].opamt+"</td></tr>";
                 else  frmt+="<tr class=\"bg-light text-dark\"><td>"+damt.data[i].date+"</td><td>"+damt.data[i].opamt+"</td></tr>";
             }
            frmt+="</tbody></table>";
            disply1.innerHTML=frmt;
            */
            });
           
           //    
    
          }

          //=======show expense
          sh_exp();
 function sh_exp()
    {
       var dsig=0,ar;
       var frmt;
        
        fs.readFile(path.join(__dirname,'./src/data/test.json'), "utf8", (err, jsonString) => {
            if (err) {
             // alert("File read failed:"+err);
              return;
            }
            damt=JSON.parse(jsonString);
          
            for(i in damt.data)
              {
                //alert("3");
                  if(damt.data[i].date==dt3.value){dsig=1;ar=i;}
              }
              if(dsig==0) disply3.innerHTML="Please Add Open Amount";
              else { 
                
                // frmt="<div class=\"text-info text-center\">Open Amount: "+damt.data[ar].opamt+"</div><br>";
                
                 frmt="<table  class=\"table\"><tr class=\"bg-dark text-white\"><th>S.NO</th><th>Expense</th><th>Amount</th></tr>";
                
                 for(i in damt.data[ar].exp) 
                      {
                       // alert("7")
                         frmt+="<tr><td> <input type=\"radio\" id=\"expdel\" name=\"expdel\" value=\""+damt.data[ar].exp[i].ename+"\">.<label>"+(parseInt(i)+1)+"</label> </td><td>"+damt.data[ar].exp[i].ename+"</td><td>"+damt.data[ar].exp[i].examt+"</td></tr>";
                        // frmt+="<td>"+damt.data[ar].ordr[i].totl+"</td><td>"+(damt.data[ar].ordr[i].crd+damt.data[ar].ordr[i].gpy+damt.data[ar].ordr[i].cash)+"</td><td>"+damt.data[ar].ordr[i].bala+"</td><td>"+damt.data[ar].ordr[i].dvery+"</td></tr>";   
                      }   
                      frmt+="</table>";
                      disply3.innerHTML=frmt;
                 }
       /*     var frmt="<table  class=\"table\"><thead><tr class=\"bg-dark text-white\"><th>Dtae</th><th>Amount</th></tr></thead><tbody>";
          //  alert(damt.data[0].date)
            for(i in damt.data)
             {
                if(i%2==0)
                 frmt+="<tr class=\"bg-light text-dark\"><td>"+damt.data[i].date+"</td><td>"+damt.data[i].opamt+"</td></tr>";
                 else  frmt+="<tr class=\"bg-light text-dark\"><td>"+damt.data[i].date+"</td><td>"+damt.data[i].opamt+"</td></tr>";
             }
            frmt+="</tbody></table>";
            disply1.innerHTML=frmt;
            */
            });
           
           //    
    
          }
 

 //----inset amt date
 in_opamt.addEventListener('click',
 function(event)
 {
 //alert("hjj");
   if(dt1.value=="" )er1.innerHTML="Please Enter  Date";
   else if( amt1.value=="")er1.innerHTML="Please Enter  Open Amount";
   else
     {
        fs.readFile(path.join(__dirname,'./src/data/test.json'), "utf8", (err, jsonString) => {
            if (err) {
              console.log("File read failed:", err);
              return;
            }
            cust=JSON.parse(jsonString);
            sig=0;
           for(i in cust.data)
             {
                 if(cust.data[i].date==dt1.value)
                  {   s1.innerHTML="";
                      er1.innerHTML="Already Open amount Is Added For This Date"+dt1.value;
                      sig=1;
                  }
             }
          
          if(sig!=1)
          {
            var ndata={date:dt1.value,opamt:amt1.value,ordr:[],exp:[]}
           cust.data[Object.keys(cust.data).length]=ndata;
           
          
            fs.writeFile(path.join(__dirname,'./src/data/test.json'), JSON.stringify(cust), err => {
             if (err) er1.innerHTML=("Contact Developer"+err);
             else {
               er1.innerHTML="";s1.innerHTML="Successfully Added "+dt1.value;sh_amt();sh_ordr();f_report();sh_exp();
              }
            
          
          
          })
        }
            });
        //disply1.innerHTML=amt1.value;
     }
     
 
  
 }
 ) 
 
   //      ----------del opmt------------
   del_opamt.addEventListener('click',
 function(event)
 {
 //alert("hjj");
   if(dt1.value=="" )er1.innerHTML="Please Enter  Date";
  
   else
     {
        fs.readFile(path.join(__dirname,'./src/data/test.json'), "utf8", (err, jsonString) => {
            if (err) {
              console.log("File read failed:", err);
              return;
            }
            cust=JSON.parse(jsonString);
         
            sig=0;
           for(i in cust.data)
             {
                 if(cust.data[i].date==dt1.value)
                  {  
                    delete cust.data[i];
           
                     cust.data=cust.data.filter(x=>x!==null);
                     fs.writeFile(path.join(__dirname,'./src/data/test.json'), JSON.stringify(cust), err => {
                     if (err) er1.innerHTML=("Contact Developer "+err);
                     else {er1.innerHTML="";s1.innerHTML="Successfully Deleted "+dt1.value;
                     f_report();sh_amt();sh_ordr();sh_exp();f_report();
                     sig-1;}
            
          
          
                        })
                  }
             }
          
          if(sig==0)
          {
             s1.innerHTML="";
             er1.innerHTML="This Date  ["+dt1.value+"] Is Not In Open Amount "
          }
            });
        //disply1.innerHTML=amt1.value;
     }
     
 
  
 }
 )      

 in_ordr.addEventListener('click',
 function(event)
 {
 s2.innerHTML="";
 var dval;var ar;
   if(dt2.value==""){er2.innerHTML="Please Enter  Date";s2.innerHTML="";}
   else if(bno.value==""){er2.innerHTML="Please Enter  BIll NO";s2.innerHTML="";}
   else if(tamt.value==""||tamt.value==0)er2.innerHTML="Please Enter  Total Amount";
   else if((card.value==""&&gpay.value==""&&cash2.value=="")||(card.value==0&&gpay.value==0&&cash2.value==0))er2.innerHTML="Please Enter  Paid Amount in Card,Cash Or Gpay ";
   else
     {//alert("1");
        if(dvery.checked==true)dval="Yes";
        else dval="no";
        fs.readFile(path.join(__dirname,'./src/data/test.json'), "utf8", (err, jsonString) => {
            if (err) {
              console.log("File read failed:", err);
              return;
            }
            cust=JSON.parse(jsonString);
            sig=0;
           
           for(i in cust.data)
             {
                 if(cust.data[i].date==dt2.value)
                  {  ar=i;
                    
                      for(j in cust.data[i].ordr)
                       {
                          
                             if(cust.data[i].ordr[j].bill==bno.value)
                              {
                               //   alert("9")
                                s2.innerHTML="";
                                er2.innerHTML="Already this Bill No is Added "+bno.value;
                                sig=1;
                                break;
                              }

                       }
                     

                     
                  }
             }
      // alert("gd")
          if(sig!=1)
          {
           
      
           var ndata={crd:parseInt(card.value),gpy:parseInt(gpay.value),dvery:dval,bala:parseInt(bal.value),bill:bno.value,cash:parseInt(cash2.value),totl:parseInt(tamt.value)};
         // alert(ndata)
                     cust.data[ar].ordr[Object.keys(cust.data[ar].ordr).length]=ndata;
                      
                    
                       fs.writeFile(path.join(__dirname,'./src/data/test.json'), JSON.stringify(cust), err => {
                        if (err) er2.innerHTML=("Contact Developer"+err);
                        else {er2.innerHTML="";s2.innerHTML="Successfully Added "+bno.value;
                        bno.value="";
                        tamt.value=0;
                        cash2.value=0;
                        gpay.value=0;
                        card.value=0;
                        bal.value="";
                        recv.value="";
                        dvery.checked=false;
                        bno.focus();
                        sh_ordr();
                        f_report();
                        sh_exp();
                        
                      }
                       
                     
                    
                     })

        
        
        }
            });
        //disply1.innerHTML=amt1.value;
     }
     
 
  
 }
 ) 
 del_ordr.addEventListener('click',
 function(event)
   {
    var sig;
    var  ar;
    s2.innerHTML="";
     // window.print();
        if(bno.value==""){er2.innerHTML="Please enter Bill No";s2.innerHTML="";}
        else{
         fs.readFile(path.join(__dirname,'./src/data/test.json'), "utf8", (err, jsonString) => {
             if (err) {
               console.log("File read failed:", err);
               return;
             }
             cust=JSON.parse(jsonString);
             for(i in cust.data)
             {
              
                 if(cust.data[i].date==dt2.value)ar=i;
             }
             sig=0;
            for(i in cust.data[ar].ordr)
              {
                //alert(ar);
                  if(cust.data[ar].ordr[i].bill==bno.value)
                   {  
                     delete cust.data[ar].ordr[i];
            
                      cust.data[ar].ordr=cust.data[ar].ordr.filter(x=>x!==null);
                      fs.writeFile(path.join(__dirname,'./src/data/test.json'), JSON.stringify(cust), err => {
                      if (err) er2.innerHTML=("Contact Developer "+err);
                      else {er2.innerHTML="";s2.innerHTML="Successfully Deleted "+bno.value;
                      bno.value="";
                      tamt.value=0;
                      cash2.value=0;
                      gpay.value=0;
                      card.value=0;
                      bal.value="";
                      recv.value="";
                      dvery.checked=false;
                      bno.focus();
                      sh_ordr()
                      f_report();sig=1;}
             
           
           
                         })
                   }
              }
           
           if(sig==0)
           {
              s2.innerHTML="";
              er2.innerHTML="This Bill No  ["+bno.value+"] Is Not Enter ";
           }
             });
         //disply1.innerHTML=amt1.value;
      
            }
   }
 )
 
 in_exp.addEventListener('click',
 function(event)
 {
 //alert("hjj");
 var ar;
   s3.innerHTML="";
   if(dt3.value=="")er3.innerHTML="Please Enter  Date";
  else if(expn.value=="")er3.innerHTML="Please Enter  Expense Name";
  else if(eamt.value==""||eamt.value==0)er3.innerHTML="Please Enter  Expense Amount";
   else
     {//alert("1");
        
        fs.readFile(path.join(__dirname,'./src/data/test.json'), "utf8", (err, jsonString) => {
            if (err) {
              console.log("File read failed:", err);
              return;
            }
            cust=JSON.parse(jsonString);
            sig=0;
           
           for(i in cust.data)
             {
                 if(cust.data[i].date==dt3.value)
                  {  ar=i;
                    
                      for(j in cust.data[i].exp)
                       {
                          
                             if(cust.data[i].exp[j].ename==expn.value)
                              {
                               //   alert("9")
                                s3.innerHTML="";
                                er3.innerHTML="Already this Expense Name is Added "+expn.value;
                                sig=1;
                                break;
                              }

                       }
                     

                     
                  }
             }
      // alert("gd")
          if(sig!=1)
          {
           
      
           var ndata={ename:expn.value,examt:parseInt(eamt.value)};
         // alert(ndata)
                     cust.data[ar].exp[Object.keys(cust.data[ar].exp).length]=ndata;
                      
                    
                       fs.writeFile(path.join(__dirname,'./src/data/test.json'), JSON.stringify(cust), err => {
                        if (err) er3.innerHTML=("Contact Developer"+err);
                        else {er3.innerHTML="";s3.innerHTML="Successfully Added "+expn.value;
                        expn.value="";
                        eamt.value=0;
                      
                        expn.focus();
                       sh_exp();
                       f_report()
                      }
                       
                     
                    
                     })

        
        
        }
            });
        //disply1.innerHTML=amt1.value;
     }
     
 
  
 }
 ) 

 //------del exp

 del_exp.addEventListener('click',
 function(event)
   {
    var sig;
    var  ar;s3.innerHTML="";
     // window.print();
        if(expn.value==""){er3.innerHTML="Please enter Expense Name";s3.innerHTML="";}
        else{
         fs.readFile(path.join(__dirname,'./src/data/test.json'), "utf8", (err, jsonString) => {
             if (err) {
               console.log("File read failed:", err);
               return;
             }
             cust=JSON.parse(jsonString);
             for(i in cust.data)
             {
              
                 if(cust.data[i].date==dt3.value)ar=i;
             }
             sig=0;
            for(i in cust.data[ar].exp)
              {
                //alert(ar);
                  if(cust.data[ar].exp[i].ename==expn.value)
                   {  
                     delete cust.data[ar].exp[i];
            
                      cust.data[ar].exp=cust.data[ar].exp.filter(x=>x!==null);
                      fs.writeFile(path.join(__dirname,'./src/data/test.json'), JSON.stringify(cust), err => {
                      if (err) er3.innerHTML=("Contact Developer "+err);
                      else {er3.innerHTML="";s3.innerHTML="Successfully Deleted "+expn.value;
                      expn.value="";
                      eamt.value=0;
                    
                      expn.focus();
                      sh_exp();
                      f_report();sig=1;}
             
           
           
                         })
                   }
              }
           
           if(sig==0)
           {
              s3.innerHTML="";
              er3.innerHTML="This Expense  Name  ["+expn.value+"] Is Not Enter ";
           }
             });
         //disply1.innerHTML=amt1.value;
      
            }
   }
 )




  // ----end --- 
  })

//functions



function al()
{
//alert("hjj");

  disply.innerHTML=dt1.value;
}
