


// import axios from 'axios';
// import { config } from 'dotenv';
// config();
// export const downloadFileFromOneDrive = async (url) => {
//     console.log('before getting the token====================================')
//     const accessToken = await getAccessToken();
//     console.log('accessToken', accessToken);
//     console.log('after token22222222222222222222222222222222')

//     try {
//         const response = await axios({
//             method: 'get',
//             url,
//             responseType: 'stream',
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 Accept: 'application/json;odata=verbose',
//             },
//         });
//         // console.log("i m response ++++++++++++++++++++", response.data)

//         return response;
//     } catch (error) {
//         console.error("Error fetching the file@@@@@@@@@@@@@@@:", error);
//         throw new Error("Failed to fetch the file from OneDrive");
//     }
// };

// const getAccessToken = async () => {

//     const clientId = process.env.CLIENT_ID; // client ID
//     const clientSecret = process.env.CLIENT_SECRET; // client secret
//     const tenantId = process.env.TENANT_ID; // tenant ID

//    const params = new URLSearchParams();
//     params.append('client_id', clientId);
//     params.append('client_secret', clientSecret);
//     params.append('grant_type', 'client_credentials');
//     params.append('scope', 'https://graph.microsoft.com/.default');

//     try {
//         const response = await axios.post(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, params, {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//         });
//         return response.data.access_token;
//     } catch (error) {
//         console.error("Error fetching access token:", error.response ? error.response.data : error.message);
//         throw new Error("Could not retrieve access token");
//     }
// };
/////////////////////////////////////////////


// import axios from 'axios';
// import { config } from 'dotenv';
// config();

// // The new function to convert URL to sharing token
// const urlToSharingToken = (url) => {
//     const trimEnd = (str, c) => {
//         c = c ? c : ' ';
//         let i = str.length - 1;
//         while (i >= 0 && str.charAt(i) === c) i--;
//         return str.substring(0, i + 1);
//     };
//     const value = Buffer.from(url).toString('base64');
//     return "u!" + trimEnd(value, '=').replace(/\//g, '_').replace(/\+/g, '-');
// };

// export const downloadFileFromOneDrive = async (url) => {
//     console.log('before getting the token====================================');
//     const accessToken = await getAccessToken();
//     console.log('accessToken', accessToken);
//     console.log('after token22222222222222222222222222222222');

//     // Convert the URL to sharing token 

//     const sharingToken = urlToSharingToken(url);
//     console.log('sharingToken:', sharingToken);

//     try {
//         const response = await axios({
//             method: 'get',
//             url: sharingToken, // Use the sharing token here if that's what you intended
//             responseType: 'stream',
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 Accept: 'application/json;odata=verbose',
//             },
//         });

//         return response;
//     } catch (error) {
//         console.error("Error fetching the file@@@@@@@@@@@@@@@:", error);
//         throw new Error("Failed to fetch the file from OneDrive");
//     }
// };

// const getAccessToken = async () => {
//     const clientId = process.env.CLIENT_ID; // client ID
//     const clientSecret = process.env.CLIENT_SECRET; // client secret
//     const tenantId = process.env.TENANT_ID; // tenant ID

//     const params = new URLSearchParams();
//     params.append('client_id', clientId);
//     params.append('client_secret', clientSecret);
//     params.append('grant_type', 'client_credentials');
//     params.append('scope', 'https://graph.microsoft.com/.default');

//     try {
//         const response = await axios.post(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, params, {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//         });
//         return response.data.access_token;
//     } catch (error) {
//         console.error("Error fetching access token:", error.response ? error.response.data : error.message);
//         throw new Error("Could not retrieve access token");
//     }
// };




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import axios from 'axios';
// import * as msal from '@azure/msal-node';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { v4 as uuidv4 } from 'uuid'; // To generate a unique ID

// // Handle __dirname in ES6 modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // MSAL Configuration for authentication
// const config = {
//     auth: {
//         clientId: "29e768ba-2c30-494d-8e27-ef064b353333", // Replace with your clientId
//         authority: "https://login.microsoftonline.com/2b0a3b04-16bd-4638-be57-5622527eb55e", // Replace with your authority
//         clientSecret: "p088Q~-WOhQirN32pupi8dfrd6R3LZa18xnY7cH_", // Replace with your clientSecret
//     }
// };

// const cca = new msal.ConfidentialClientApplication(config);

// // Function to get access token
// async function getAccessToken() {
//     const tokenRequest = {
//         scopes: ["https://graph.microsoft.com/.default"] // This scope is for accessing Graph API
//     };

//     try {
//         const response = await cca.acquireTokenByClientCredential(tokenRequest);
//         return response.accessToken;
//     } catch (error) {
//         console.log("Error fetching access token", error);
//         throw new Error('Authentication failed');
//     }
// }

// // Function to convert URL to sharing token
// function urlToSharingToken(url) {
//     const trimEnd = (str, c) => {
//         c = c ? c : ' ';
//         let i = str.length - 1;
//         while (i >= 0 && str.charAt(i) === c) i--;
//         return str.substring(0, i + 1);
//     };
//     const value = Buffer.from(url).toString('base64');
//     return "u!" + trimEnd(value, '=').replace(/\//g, '_').replace(/\+/g, '-');
// }

// // Function to download file from OneDrive
// export async function downloadFileFromOneDrive(fileUrl) {
//     const token = await getAccessToken();
//     console.log('Access Token:@@@@@@@@@@@@@@@@@@@@@', token);

//     // Convert the file URL to a sharing token
//     const sharingToken = urlToSharingToken(fileUrl);
//     console.log('Sharing Token:!!!!!!!!!!!!!!', sharingToken);

//     const requestUrl = `/shares/${sharingToken}/driveItem/content`; // Construct the API endpoint
//     console.log('Request URL#############:', requestUrl);

//     let response;
//     try {
//         response = await axios.get(`https://graph.microsoft.com/v1.0${requestUrl}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//             responseType: 'stream', // To handle the file as a stream
//         });
//     } catch (err) {
//         console.log('Error downloading file', err);
//         throw new Error('Failed to download file');
//     }

//     // Extract file extension from the original file URL
//     const fileExtension = path.extname(fileUrl) || '.png'; // Default to .png if none
//     console.log('i am file extension.............', fileExtension)
//     const uniqueFileName = `downloaded_file_${uuidv4()}${fileExtension}`;
//     const filePath = path.join(__dirname, '../downloads', uniqueFileName);
// console.log('i am filepath)))))))))))', filePath)
//     // Write the file to the local file system
//     const writer = fs.createWriteStream(filePath);

//     // Pipe the response stream into the writer
//     response.data.pipe(writer);

//     return new Promise((resolve, reject) => {
//         writer.on('finish', () => resolve(filePath));
//         writer.on('error', (error) => {
//             console.error("Error writing file", error);
//             reject(new Error('File write failed'));
//         });
//     });
// }


/////////////////////////////////////////////////////////////////////////////////////// SHAREPOINT //////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import axios from 'axios';
// import * as msal from '@azure/msal-node';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { v4 as uuidv4 } from 'uuid'; // To generate a unique ID

// // Handle __dirname in ES6 modules
// const __filename = fileURLToPath(import.meta.url);
// console.log('i M filename````````````', __filename)
// const __dirname = path.dirname(__filename);
// console.log('i am direname@@@@@', __dirname)

// // MSAL Configuration for authentication
// const config = {
//     auth: {
//         clientId: "29e768ba-2c30-494d-8e27-ef064b353333", // Replace with your clientId
//         authority: "https://login.microsoftonline.com/2b0a3b04-16bd-4638-be57-5622527eb55e", // Replace with your authority
//         clientSecret: "p088Q~-WOhQirN32pupi8dfrd6R3LZa18xnY7cH_", // Replace with your clientSecret
//     }
// };

// const cca = new msal.ConfidentialClientApplication(config);

// // Function to get access token
// async function getAccessToken() {
//     const tokenRequest = {
//         scopes: ["https://graph.microsoft.com/.default"] // This scope is for accessing Graph API
//     };

//     try {
//         const response = await cca.acquireTokenByClientCredential(tokenRequest);
//         return response.accessToken;
//     } catch (error) {
//         console.log("Error fetching access token", error);
//         throw new Error('Authentication failed');
//     }
// }

// // Function to convert URL to sharing token
// function urlToToSharingToken(url) {
//     var trimEnd = function(str, c) {    
//         c = c ? c : ' ';
//         var i = str.length - 1;
//         for (; i >= 0 && str.charAt(i) == c; i--);
//         return str.substring(0, i + 1);
//     };
//     var value = Buffer.from(url).toString('base64');

//     console.log('I am url========', url)
//     console.log('I am value.....', value)

//     return "u!" + trimEnd(value, '=').replace(/\//g, '_').replace(/\+/g, '-');
// }

// // Function to download file from SharePoint
// export async function downloadFileFromOneDrive(fileUrl) {
//     const token = await getAccessToken();
//     console.log('Access Token:', token);

//     // Extract the file path from the URL
//     const sharedItemId = urlToToSharingToken(fileUrl); // Get sharing token
//     console.log('I am sharedItemId **(**(*(*(*&(*', sharedItemId)

//     const requestUrl = `/shares/${sharedItemId}/driveItem/content`; // Construct the API endpoint

//     console.log('i am full response.....3.3.3.33.3.3', requestUrl)

//     let response;
//     try {
//         response = await axios.get(`https://graph.microsoft.com/v1.0${requestUrl}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`, // Ensure you have a valid access token
//                 'Content-Type': 'application/json',  // Set the content type
//             },
//             responseType: 'stream', // To handle the file as a stream
//         });
//     } catch (err) {
//         console.log('Error downloading file', err);
//         throw new Error(err);
//     }

//     // Extract file extension from the filePathToDownload
//     const fileExtension = path.extname(fileUrl) || '.png'; // Default to .png if none
//     // const fileExtension = '.zip';
//     console.log('i am file extension%%%%%%%%%%%%%%%%%%%', fileExtension)
//     const uniqueFileName = `downloaded_file_${uuidv4()}${fileExtension}`;
//     console.log('i am uniwue name!!!!!!!!!!!!!', uniqueFileName)
//     const filePath = path.join(__dirname, '../downloads', uniqueFileName);

//     console.log('i am file path................................', filePath)

//     // Write the file to the local file system
//     const writer = fs.createWriteStream(filePath);

//     console.log('i am write@@@@@@@@@@@@@@@', writer)

//     // Pipe the response stream into the writer
//     response.data.pipe(writer);

//     return new Promise((resolve, reject) => {
//         writer.on('finish', () => resolve(filePath));
//         writer.on('error', (error) => {
//             console.error("Error writing file", error);
//             reject(new Error('File write failed'));
//         });
//     });
// }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// import axios from 'axios';
// import * as msal from '@azure/msal-node';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { v4 as uuidv4 } from 'uuid'; // To generate a unique ID



// // Handle __dirname in ES6 modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // MSAL Configuration for authentication
// const config = {
//     auth: {
//         clientId: "29e768ba-2c30-494d-8e27-ef064b353333", // Replace with your clientId
//         authority: "https://login.microsoftonline.com/2b0a3b04-16bd-4638-be57-5622527eb55e", // Replace with your authority
//         clientSecret: "p088Q~-WOhQirN32pupi8dfrd6R3LZa18xnY7cH_", // Replace with your clientSecret
//     }
// };

// const cca = new msal.ConfidentialClientApplication(config);

// // Function to get access token
// async function getAccessToken() {
//     const tokenRequest = {
//         scopes: ["https://graph.microsoft.com/.default"] // This scope is for accessing Graph API
//     };

//     try {
//         const response = await cca.acquireTokenByClientCredential(tokenRequest);
//         return response.accessToken;
//     } catch (error) {
//         console.log("Error fetching access token", error);
//         throw new Error('Authentication failed');
//     }
// }

// // Function to convert URL to sharing token
// function urlToSharingToken(url) {
//     const trimEnd = (str, c) => {
//         c = c ? c : ' ';
//         let i = str.length - 1;
//         while (i >= 0 && str.charAt(i) === c) i--;
//         return str.substring(0, i + 1);
//     };
//     const value = Buffer.from(url).toString('base64');
//     return "u!" + trimEnd(value, '=').replace(/\//g, '_').replace(/\+/g, '-');
// }

// // Function to download file from OneDrive
// export async function downloadFileFromOneDrive(fileUrl) {

//     console.log('i am postmen url"""""""""""""""""', fileUrl)

//     const token = await getAccessToken();
//     console.log('Access Token::::::::::::::::', token);

//     // Convert the file URL to a sharing token
//     const sharingToken = urlToSharingToken(fileUrl);
//     console.log('Sharing Token:)))))))))))))))))))))))', sharingToken);

//     const requestUrl = `/shares/${sharingToken}/driveItem/content`; // Construct the API endpoint

//     console.log('i am full url ++++++++++++++', requestUrl)

//     let response;
//     try {
//         response = await axios.get(`https://graph.microsoft.com/v1.0${requestUrl}`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//             },
//             responseType: 'stream', // To handle the file as a stream
//         });
//     } catch (err) {
//         console.log('Error downloading file', err);
//         throw new Error('Failed to download file');
//     }

//     // Extract file extension from the original file URL

//     const fileExtension = path.extname(fileUrl) || '.png'; // Default to .png if none
//     console.log('i am fileextension@@@@@@@@@@@', fileExtension)
//     const uniqueFileName = `downloaded_file_${uuidv4()}${fileExtension}`;
//     const filePath = path.join(__dirname, '../downloads', uniqueFileName);
//     console.log('i am filepath%%%%%%%%%%%%%%%%%', filePath)
//     // Write the file to the local file system
//     const writer = fs.createWriteStream(filePath);

//     // Pipe the response stream into the writer
//     response.data.pipe(writer);

//     return new Promise((resolve, reject) => {
//         writer.on('finish', () => resolve(filePath));
//         writer.on('error', (error) => {
//             console.error("Error writing file", error);
//             reject(new Error('File write failed'));
//         });
//     });
// }
//////////////////////////-------------------------------------------------------------------------




import axios from 'axios';
import * as msal from '@azure/msal-node';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid'; // To generate a unique ID

// Handle __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the directory name of the current file

// Ensure the downloads directory exists
const downloadsDir = path.join(__dirname, '../downloads'); // Path to the downloads directory
if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true }); // Create the downloads directory if it doesn't exist
}

// MSAL Configuration for authentication
const config = {
    auth: {
        clientId: "29e768ba-2c30-494d-8e27-ef064b353333", // Replace with your clientId
        authority: "https://login.microsoftonline.com/2b0a3b04-16bd-4638-be57-5622527eb55e", // Replace with your authority
        clientSecret: "p088Q~-WOhQirN32pupi8dfrd6R3LZa18xnY7cH_", // Replace with your clientSecret
    }
};

const cca = new msal.ConfidentialClientApplication(config); // Create an instance of the MSAL client

// Function to get access token
async function getAccessToken() {
    const tokenRequest = {
        scopes: ["https://graph.microsoft.com/.default"] // This scope is for accessing Graph API
    };

    try {
        const response = await cca.acquireTokenByClientCredential(tokenRequest); // Request access token
        return response.accessToken; // Return the access token
    } catch (error) {
        console.log("Error fetching access token", error); // Log any errors
        throw new Error('Authentication failed'); // Throw an error if authentication fails
    }
}

// Function to convert URL to sharing token
function urlToToSharingToken(url) {
    const trimEnd = (str, c = ' ') => {
        let i = str.length - 1;
        for (; i >= 0 && str.charAt(i) === c; i--); // Trim trailing characters
        return str.substring(0, i + 1);
    };

    const binarydata = Buffer.from(url); // Convert URL to binary data
    const value = binarydata.toString('base64'); // Encode binary data to base64

    return "u!" + trimEnd(value, '=').replace(/\//g, '_').replace(/\+/g, '-'); // Return formatted sharing token
}

// Function to download file from SharePoint
export async function downloadFileFromOneDrive(fileUrl) {
    console.log('Before extension URL:', fileUrl); // Log the incoming file URL

    const token = await getAccessToken(); // Get the access token
    console.log('Access Token:', token); // Log the access token

    const sharedItemId = urlToToSharingToken(fileUrl); // Get sharing token from the URL
    const requestUrl = `/shares/${sharedItemId}/driveItem/content`; // Construct the API endpoint

    console.log('Full request URL:', requestUrl); // Log the full request URL

    let response;
    try {
        response = await axios.get(`https://graph.microsoft.com/v1.0${requestUrl}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Set the authorization header
                'Content-Type': 'application/json', // Set the content type
            },
            responseType: 'stream', // Handle the file as a stream
        });
    } catch (err) {
        console.log('Error downloading file', err); // Log any download errors
        throw new Error(err); // Throw an error if the download fails
    }

    console.log('After extension URL:', fileUrl); // Log after the request

    const cleanedUrl = fileUrl.split('?')[0]; // Clean the URL to remove query parameters
    const fileExtension = path.extname(cleanedUrl.split('?')[0]) || '.png'; // Determine the file extension, default to .png if none

    const uniqueFileName = `downloaded_file_${uuidv4()}${fileExtension}`; // Create a unique filename
    const filePath = path.join(downloadsDir, uniqueFileName); // Path for the downloaded file

    // Write the file to the local file system
    const writer = fs.createWriteStream(filePath); // Create a writable stream

    // Pipe the response stream into the writer
    response.data.pipe(writer); // Pipe the downloaded data to the file

    return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(filePath)); // Resolve the promise when the write is finished
        writer.on('error', (error) => {
            console.error("Error writing file", error); // Log any writing errors
            reject(new Error('File write failed')); // Reject the promise if writing fails
        });
    });
}

