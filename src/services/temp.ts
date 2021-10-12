export const sendSMS = async (phoneNumbers: string[], message: string) => {

    const apiKey = '5SZRxGhOSwSdn2vl-iU44E1SxQtYXxw7OfM8d1gmJaZ0xOz2LBoXtpqXnBAcYBLz';
    const auth = 'Basic ' + Buffer.from(apiKey + ':').toString('base64');

    // const jsonBody = await response.json();
    // console.log(jsonBody)
    return await fetch('https://gatewayapi.com/rest/mtsms', {
        method: 'POST',
        body: JSON.stringify({
            'sender': 'InnoSocial',
            'message': message,
            recipients: phoneNumbers.map(e => ({msisdn: 45 + e})),
        }),
        headers: {
            Authorization: auth,
            'Content-Type': 'application/json',
        }
    });
};
