var user = require('../controllers/controllers');
var jsdom = require("jsdom")
const { JSDOM } = jsdom;
var request = require('request');
var fs = require('fs');
var pdf = require('html-pdf');
var jquery = require('jquery');
var makepdf = require('../../makepdf');
var makeres = require('../../makeres');

module.exports = function(app){
    app.get('/user', function (req, res) {
        user.index(req, res);
    })

    app.post('/create', function (req, res) {
        user.create(req, res);
    })

    app.get('/user/:id', (req, res) => {
        user.show(req, res);
    })

    app.put('/user/edit/:id', function(req,res){
        user.update(req,res);
    })

    app.delete('/destroy/user/:id', (req, res) => {
        user.destroy(req, res)
    })

    app.post('/api/indeed', (req, res) => {
        request({uri: `https://www.indeed.com/jobs?q=${req.body.keyword}&l=${req.body.location}%1C+IL&sort=date`},
            function(error, response, body) {
            // var $ = cheerio.load(body);
            // var document = $.root().html()
            const dom = new JSDOM(body);
            var selectedClasses = ["title", "sjcl", "summary"]
            var jobList = []
            var currentdoc = dom.window.document
            var jobsList_RAW = currentdoc.getElementsByClassName('jobsearch-SerpJobCard');
            for (let i = 0; i < jobsList_RAW.length; i++){
                //console.log(jobsList_RAW);
                let jobJSON = {
                }
                jobJSON["jk"] = jobsList_RAW[i].dataset.jk;
                let jobClassList = jobsList_RAW[i].childNodes;
                for (let n = 0; n < jobClassList.length; n++){
                    if (jobClassList[n].className != null){
                        let thisClass = jobClassList[n];
                        if (selectedClasses.indexOf(thisClass.className) != -1 ) {
                            let inputtext = thisClass.textContent;
                            var find = '\n';
                            var re = new RegExp(find, 'g');
                            inputtext = inputtext.replace(re, '');
                            find = '  ';
                            re = new RegExp(find, 'g');
                            inputtext = inputtext.replace(re, '');
                            //console.log(inputtext)
                            jobJSON[thisClass.className] = inputtext;
                        }
                    }
                }
                jobList.push(jobJSON);
            }
            var jobObject = { result: jobList}
            res.json(jobObject)
        })
    })

    app.post('/api/indeed/info', (req, res) => {
        request({uri: `https://www.indeed.com/viewjob?jk=${req.body.jk}`},
            function(error, response, body) {
            // var $ = cheerio.load(body);
            // var document = $.root().html()
            const dom = new JSDOM(body);
            var currentdoc = dom.window.document
            var info = currentdoc.getElementById('jobDescriptionText')
            res.json(info.textContent)
            }
        )
    })

    app.post('/api/makecv', (req,res) => {
        makepdf(req.body);
    })

    app.post('/api/makeresume', (req,res) => {
        makeres(req.body)
    })

}