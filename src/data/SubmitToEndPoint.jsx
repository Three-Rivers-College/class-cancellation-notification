export const PostFormData = async (data,notificationUrl,responseCode) => {
    
    const response = await fetch(notificationUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.status == responseCode ) {
        return null;
    } else {
        throw new Error(`Unexpected response status: ${response.status}`);
    }
};
