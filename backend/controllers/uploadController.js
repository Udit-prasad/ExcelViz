const { db } = require('../config/firebase');
const { readFile, utils } = require('xlsx');
const { join } = require('path');

const uploadExcel = async (req, res) => {
  if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });
  try {
    const filePath = join(__dirname, '..', req.file.path);
    const workbook = readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Get data with headers (first row becomes column headers)
    const jsonData = utils.sheet_to_json(worksheet);
    
    // Extract column headers from the keys of the first data row
    const columns = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];

    // Save analysis record (without chart yet) in Firestore
    const analysisData = {
      user: req.user.id,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      columns,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('analyses').add(analysisData);

    res.json({
      columns,
      data: jsonData,
      analysisId: docRef.id,
      fileName: req.file.filename,
      originalName: req.file.originalname
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  uploadExcel
};
