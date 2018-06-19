const express = require('express');
const bodyParser = require('body-parser');
const CDP = require('chrome-remote-interface');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function launchChrome(headless=true) {
  return chromeLauncher.launch({
    // port: 9222, // Uncomment to force a specific port of your choice.
    chromeFlags: [
      '--window-size=412,732',
      '--disable-gpu',
      headless ? '--headless' : ''
    ]
  });
}

app.get('/pdfs/:name', (req, res) => {
    const name = req.params.name;
    res.download(`./pdfs/${name}.pdf`, function (err) {
        if (err) {
            console.log("Error");
            console.log(err);
        } else {
            console.log("Success");
        }    
      });
});

app.get('/screenshots/:name', (req, res) => {
    const name = req.params.name;
    res.download(`./screenshots/${name}.jpeg`, function (err) {
        if (err) {
            console.log("Error");
            console.log(err);
        } else {
            console.log("Success");
        }    
      });
})

app.get('/doms/:name', (req, res) => {
    const name = req.params.name;
    res.download(`./doms/${name}.html`, function (err) {
        if (err) {
            console.log("Error");
            console.log(err);
        } else {
            console.log("Success");
        }    
      });
})

app.post('/api/puppet', (req, res) => {
    const formData = JSON.parse(Object.keys(req.body)[0]);
    const {name, url, type} = formData;
    console.log(name, url, type);

    (async function() {

        const chrome = await launchChrome();
        const protocol = await CDP({port: chrome.port});
        
        const {Page, Runtime, DOM, Emulation} = protocol;
        await Promise.all([Page.enable(), Runtime.enable()]);
        
        Page.navigate({url});
        
        // Wait for window.onload before doing stuff.
        await Page.loadEventFired();
        
        if(type === 'PDF') {
            const {data} = await Page.printToPDF({
                landscape: true,
                printBackground: true,
                marginTop: 0,
                marginBottom: 0,
                marginLeft: 0,
                marginRight: 0
            });

             fs.writeFileSync(`./pdfs/${name}.pdf`, Buffer.from(data, 'base64'));
        } else if(type === 'Screenshot') {
            const viewportWidth = 1200;
            const {root: {nodeId: documentNodeId}} = await DOM.getDocument();
            const {nodeId: bodyNodeId} = await DOM.querySelector({
            selector: 'body',
            nodeId: documentNodeId,
            });
            const {model: {height}} = await DOM.getBoxModel({nodeId: bodyNodeId});

            console.log("Set visible size to the height of the dom", height);

            const deviceMetrics = {
            width: viewportWidth,
            height: height,
            deviceScaleFactor: 1,
            mobile: false,
            fitWindow: false,
            };
            await Emulation.setDeviceMetricsOverride(deviceMetrics);
            await Emulation.setVisibleSize({width: viewportWidth, height: height});
            const {data} = await Page.captureScreenshot({
               format: 'jpeg'
            });
            fs.writeFileSync(`./screenshots/${name}.jpeg`, Buffer.from(data, 'base64'));
        } else if (type === 'DOM') {
            const result = await Runtime.evaluate({
                expression: 'document.documentElement.outerHTML'
            });
            const html = result.result.value;
            fs.writeFileSync(`./doms/${name}.html`, html);
              
        }

        
        
         protocol.close();
         chrome.kill(); // Kill Chrome.

          res.send('OK');

        })()
      
        //res.send('OK');
        
        
})



const port = 5000;
app.listen(port, () => `Server running on port ${port}`);