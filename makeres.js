const jsdom = require("jsdom");
var fs = require('fs');
var pdf = require('html-pdf');
var jquery = require('jquery')


 
module.exports = function(body)  {
    console.log(body);
    fs.readFile('./html/resume.html', 'utf8', function(error, data) {
        const dom = new jsdom.JSDOM(data);
        const $ = jquery(dom.window);
        $("#name").each(function () {
            var content = $(this).text();
            $(this).text(body.fullName);
        });
        $("#phone").text(body.phoneNumber);
        $("#address").text(body.address);
        $("#email").text(body.email);
        // $("#linkedin").text(body.company);
        $("#quals").text(body.experience[0].specialty);
        $("#certs").text(body.experience[0].details);
        $("#exp_name").text(body.experience[0].name);
        $("#exp_title").text(body.experience[0].title);
        $("#exp_sdate").text(body.experience[0].startDate);
        $("#exp_ndate").text(body.experience[0].endDate);
        
        fs.writeFile('./html/resume.html', dom.window.document.documentElement.outerHTML,
                    function (error){
            if (error) throw error;
        });
    });

 
 
    function pdfing() {
        var html = fs.readFileSync('./html/resume.html', 'utf8');
        var options = {
        "height": "760px",
        "width": "600px"
        };
    
        pdf.create(html, options).toFile('/Users/ricardorivera/desktop/resume.pdf', function(err, res) {
            if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }
        });
    }
 
    setTimeout(pdfing, 2000, 'done');
}