export const postFormData = async (data) => {
    const response = await fetch('https://url.example.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.status === 202) {
        const responseText = await response.text(); // Get the response as text first.
        if (responseText) {
            return JSON.parse(responseText); // If not empty, then parse as JSON.
        }
        // Optionally, if no content, return something else or just return.
        return null;
    } else {
        throw new Error(`Unexpected response status: ${response.status}`);
    }
};


/*
const postFormData = async (data) => {
    try {
        const response = await fetch('YOUR_API_ENDPOINT_HERE', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.status === 202) {
            const responseData = await response.json();
            return responseData; // Success
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

    } catch (error) {
        throw error; // Re-throw to handle it in the calling function/component
    }
};

export { postFormData };*/
