const fs = require("fs");
const path = require("path");

// Helper function to save uploaded files
const saveFile = (file, folderName) => {
    const uploadDir = path.join(process.cwd(), `public/uploads/${folderName}`);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const originalFileName = file.originalFilename;
    const newFilePath = path.join(uploadDir, originalFileName);

    // Rename the file to the new p
    fs.renameSync(file.filepath, newFilePath);
    return `/uploads/${folderName}/${originalFileName}`; // Return the file path
};

module.exports = saveFile;
