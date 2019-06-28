const jsdom = require("jsdom");
var fs = require('fs');
var pdf = require('html-pdf');
var jquery = require('jquery')


 
module.exports = function(body)  {
    console.log(body);
    fs.readFile('./html/cover.html', 'utf8', function(error, data) {
        const dom = new jsdom.JSDOM(data);
        const $ = jquery(dom.window);
        $(".fullname").each(function () {
            var content = $(this).text();
            $(this).text(body.fullName);
        });
        $("#phone").text(body.phoneNumber);
        $("#address").text(body.address);
        $("#email").text(body.email);
        $("#company").text(body.company);
    
        fs.writeFile('./html/cover.html', dom.window.document.documentElement.outerHTML,
                    function (error){
            if (error) throw error;
        });
    });

 
 
    function pdfing() {
        var html = fs.readFileSync('./html/cover.html', 'utf8');
        var options = {
        "height": "760px",
        "width": "600px"
        };
    
        pdf.create(html, options).toFile('/Users/ricardorivera/desktop/cover.pdf', function(err, res) {
            if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }
        });
    }
 
    setTimeout(pdfing, 2000, 'done');
}