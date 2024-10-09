
import { downloadFileFromOneDrive } from '../services/one-driveService.js'; // Importing the function to download files from OneDrive
import fs from 'fs'; // Importing the File System module to handle file operations
import path from 'path'; // Importing the Path module to work with file and directory paths
import os from 'os'; // Importing the OS module to access operating system-related utility methods

/**
 * Sanitizes the file name by replacing invalid characters.
 * @param {string} fileName - The original file name.
 * @returns {string} - The sanitized file name.
 */
const sanitizeFileName = (fileName) => {
    return fileName.replace(/[<>:"/\\|?*]/g, '_'); // Replace invalid characters with underscores
};

/**
 * Handles the file download request.
 * @param {Object} req - The request object containing the URL.
 * @param {Object} res - The response object to send back the file or an error.
 */
export const downloadFile = async (req, res) => {
    const { url } = req.body; // Extracting the URL from the request body
    if (!url) {
        return res.status(400).json({ error: "URL is required" }); // Return an error if no URL is provided
    }

    const rawFileName = path.basename(url.split("?")[0].trim()); // Extract the base name of the file from the URL
    const fileName = sanitizeFileName(rawFileName); // Sanitize the file name to ensure it is safe
    const maxFileNameLength = 255; // Define a maximum length for file names
    const truncatedFileName = fileName.length > maxFileNameLength
        ? fileName.substring(0, maxFileNameLength - path.extname(fileName).length) + path.extname(fileName) // Adjust truncation to ensure extension is retained
        : fileName;

    const downloadsDir = path.join(os.homedir(), 'Downloads'); // Get the user's Downloads directory path
    const filePath = path.join(downloadsDir, truncatedFileName); // Create the full file path for the download

    console.log('Before calling OneDrive service-------------------------------');

    try {
        const response = await downloadFileFromOneDrive(url); // Call the service to download the file from OneDrive

        const writer = fs.createWriteStream(filePath); // Create a write stream to save the file

        // Log the type of response data for debugging
        console.log('Response type:', typeof response.data);       

        // Pipe the response data to the file writer
        response.data.pipe(writer);

        // Handle successful file writing
        writer.on('finish', () => {
            res.download(filePath, (err) => { // Send the downloaded file as a response
                if (err) {
                    console.error("Error sending the file:", err);
                    return res.status(500).json({ error: "Failed to send the file" }); // Handle any errors during file send
                }
            });
        });

        // Handle any errors while writing the file
        writer.on('error', (err) => {
            console.error("Error writing the file:", err);
            res.status(500).json({ error: "Failed to download the file" }); // Respond with an error if writing fails
        });
    } catch (error) {
        console.error("Error occurred while fetching the file:", error.message); // Log any errors that occur
        res.status(500).json({ error: "Failed to fetch the file" }); // Respond with a generic error message
    }
};