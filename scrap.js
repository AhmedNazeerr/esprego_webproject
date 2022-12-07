// const connection = require(".../config/database");
const fs = require("fs");
const puppeteer = require("puppeteer");

    async function run () {
      // var query2="Select * from product";
      // connection.query(query2,(err,results)=>{
      //     if(err) throw err;
      //     else{
      //         if(results.length>0){
      //             var query1="DELETE FROM product";
      //             connection.query(query1,(err)=>{
      //                 if(err) throw err;
      //                 else{
      //                     console.log("old table data dropped");
      //                 }
      //             })
      //         }
      //         else{
      //             console.log("table already empty");
      //         }
      //     }
    
  // })
    const browser = await puppeteer.launch({
      headless:false
    });
    const page = await browser.newPage();
    await page.goto("https://www.daraz.pk/catalog/?q=coffee&_keyori=ss&from=input&spm=a2a0e.home.search.go.35e34937YTDFfm");
    // Get products using $$eval
    const products = await page.$$eval("#root .inner--SODwy", (elements) =>
      elements.map((e) => ({
        title: e.querySelector(".title--wFj93").innerText,
        price: e.querySelector(".price--NVB62 .currency--GVKjl").innerText
      }))
    );
  
  //   console.log(products);
  
  //   Save data to JSON file
    fs.writeFile("product.json", JSON.stringify(products), (err) => {
      if (err) throw err;
      console.log("File saved");
    });
  
  
  //read data from file
  //   fs.readFile("product.json", (err,result) => {
  //     if (err) throw err;
  //     var resulttemp=JSON.parse(result);
  //     resulttemp.forEach(element => {
  //         if(element.price==''){
  //             var price=350;
  //             var query=`insert into product(title,price) values ("${element.title}",'${price}')`;
  //             connection.query(query,(err)=>{
  //                 if(err) throw err;
  //                 else{
  //                     console.log('insertion successfull')
  //                 }
  //             })
  //         }
  //         else{
  //         var query=`insert into product(title,price) values ("${element.title}",'${element.price}')`;
  //         connection.query(query,(err)=>{
  //             if(err) throw err;
  //             else{
  //                 console.log('insertion successfull')
  //             }
  //         })
  //         }
  //     });     
  // });
  
    await browser.close();
  }
  run();