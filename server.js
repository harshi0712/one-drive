// // server.js
// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { router } from './routes/fileRoute.js';
// import cors from 'cors';

// // Handle __dirname in ES6 modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = 3000;

// // Serve the downloads folder
// app.use('/downloads', express.static(path.join(__dirname, 'downloads')));
// app.use(cors())
// // Middleware to parse JSON bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Use file routes
// app.use('/api', router);

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


import express from 'express';
import fileRoutes from './routes/fileRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use file routes
app.use('/api', fileRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




// import axios from 'axios';
// import { config } from 'dotenv';
// config();

// // The new function to convert URL to sharing token (if needed)
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

//     // If the URL is valid, use it directly
//     // Otherwise, uncomment the line below to use the sharing token
//     const sharingToken = urlToSharingToken(url);
//     const validUrl = url; // Use the original URL directly

//     try {
//         const response = await axios({
//             method: 'get',
//             url: validUrl, // Use the original URL
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
