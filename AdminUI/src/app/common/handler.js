const authHeaders = () => {
    const accessToken = window.localStorage.getItem('accessToken');
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken,

        },
    }
}

export {
    authHeaders,
}