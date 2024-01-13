import axios from 'axios';
const getBaseUrl = () => {
    let url;
    switch (process.env.NODE_ENV) {
        case 'production':
            url = 'https://stackoverflow.com';
            break;
        case 'development':
        default:
            url = 'http://localhost:44405';
    }

    return url;
}

const apiService = axios.create({
    baseURL: getBaseUrl(),
});

export const PostCharacter = async (data) => {
    await apiService.post('/character', data)
        .catch(function (error) {
            console.log(error);
        })
};

export const GetCharacters = async () => {
    try {
        const response = await apiService.get('/character');
        return response.data;
    } catch (error) {
        throw error;
    }
};