var express = require("express");
var app = express();
const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const timeUrl= 'https://time.com';


app.get("/getTimeStories", function (req, res) {
  got(timeUrl).then(response => {
    const arr = []
    const dom = new JSDOM(response.body);
     dom.window.document.querySelectorAll('.latest .swipe-h .content .title').forEach(element => {
      const obj = {
        link : "https://time.com" + element.firstChild.href,
        text : element.firstChild.innerHTML
      }
      arr.push(obj) 
    });
    res.json(arr);
  }).catch(err => {
    console.log(err);
  });
});

app.listen(8081);
