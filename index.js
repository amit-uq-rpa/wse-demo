module.exports = async function (context, req) {
    context.log('XmlToJsonConverter function triggered.');

    // Read the XML payload from the request body
    const xmlPayload = req.body;

    // Convert XML to JSON
    const jsonPayload = convertXmlToJson(xmlPayload);

    // Return the JSON payload as the response
    context.res = {
        body: jsonPayload,
        headers: {
            'Content-Type': 'application/json'
        }
    };
};

function convertXmlToJson(xmlPayload) {
    const xml2js = require('xml2js');
    const parser = new xml2js.Parser({ explicitArray: false });

    let jsonPayload;
    parser.parseString(xmlPayload, (err, result) => {
        if (err) {
            throw err;
        }
        jsonPayload = JSON.stringify(result);
    });

    return jsonPayload;
}