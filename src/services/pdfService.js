const puppeteer = require('puppeteer');
const pdfTemplate = require('../utils/pdfTemplate');

const generatePDF = async (data, id_entity) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(pdfTemplate(data));
    await page.emulateMediaType('screen');
    await page.pdf({
      path: appRoot + `/pdfs/Observaciones-${id_entity}.pdf`,
      format: 'A4',
      printBackground: true
    });

    console.log("Document has been created!");
    await browser.close();

  } catch (error) {
    console.error(error);
  }
};

module.exports = generatePDF;
