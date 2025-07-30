const Analysis = require('../models/Analysis');
const { readFile, utils } = require('xlsx');
const { join } = require('path');
const fs = require('fs');

const uploadExcel = async (req, res) => {
  if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });
  try {
    const filePath = join(__dirname, '..', req.file.path);
    const workbook = readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

    // Get column headers
    const columns = jsonData[0];

    // Save analysis record (without chart yet)
    const analysis = new Analysis({
      user: req.user.id,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      columns
    });
    await analysis.save();

    // Optionally delete file after parsing
    // fs.unlinkSync(filePath);

    res.json({ columns, analysisId: analysis._id, fileName: req.file.filename });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  uploadExcel
};