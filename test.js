const fs = require("fs");
fs.readFile("./src/data/test.json", "utf8", (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  cust=JSON.parse(jsonString);
 //console.log(Object.keys(cust.data).length);
 //for(x in cust.data)console.log(cust.data[x]["cus"][0].bill)
//console.log(cust.data[0]["12-13"][0].opamt)
  //var da={"12-13-90":[{opamt:134,cus:[{}]}]};
   dt1="12-23-18";
   amt=500;

   bno=1235;
   tamt=1234;
   pcash=12;
   pgpay=34;
   pcard=87;
   dry=1;
   bamt=23;
   ramt=123;

   var ndata2={billno:bno,tmount:tamt,cash:pcash,blant:bamt,reamt:ramt,deli:dry,gpay:pgpay,card:pcard}
   cust.data[3].cus[0]=ndata2;
  //var ndata={date:dt1,opamt:amt,cus:[{}]}
 //cust.data[Object.keys(cust.data).length]=ndata;
 

  fs.writeFile("./src/data/test.json", JSON.stringify(cust), err => {
   if (err) console.log("Error writing file:", err);
 //


})
  });