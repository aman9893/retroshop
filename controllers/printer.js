const ThermalPrinter = require('node-thermal-printer').printer;
const PrinterTypes = require('node-thermal-printer').types;
var jwt = require('jsonwebtoken');

module.exports.printerdata = function (req, res) {
    const { content } = req.body;

  let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,
    interface: 'usb'  // Change this according to your connection type
  });

  printer.alignCenter();
  printer.println(content);
  printer.cut();

  try {
    let execute =  printer.execute();

      res.json({
          status: true,
          message: 'Print Successfully'
      })
  }
  
  catch (error) {
    console.error('Print error:', error);
    res.status(500).send('Print failed');
  }
}

  
  