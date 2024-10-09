


import axios from 'axios';


export const downloadFileFromOneDrive = async (url) => {
    console.log('before getting the token====================================')
    const accessToken = await getAccessToken();
    console.log('accessToken', accessToken);
    console.log('after token22222222222222222222222222222222')
 
    try {
        const response = await axios({
            method: 'get',
            url,
            responseType: 'stream',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json;odata=verbose',
            },
        });
        // console.log("i m response ++++++++++++++++++++", response.data)

        return response;
    } catch (error) {
        console.error("Error fetching the file@@@@@@@@@@@@@@@:", error);
        throw new Error("Failed to fetch the file from OneDrive");
    }
};

const getAccessToken = async () => {
    const clientId = "29e768ba-2c30-494d-8e27-ef064b353333"; //  client ID
    const clientSecret = "p088Q~-WOhQirN32pupi8dfrd6R3LZa18xnY7cH_"; //  client secret
    const tenantId = "2b0a3b04-16bd-4638-be57-5622527eb55e"; // tenant ID


   const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'client_credentials');
    params.append('scope', 'https://graph.microsoft.com/.default');

    try {
        const response = await axios.post(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return response.data.access_token;
    } catch (error) {
        console.error("Error fetching access token:", error.response ? error.response.data : error.message);
        throw new Error("Could not retrieve access token");
    }
};
