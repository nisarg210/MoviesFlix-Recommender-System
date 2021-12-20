const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '2effdefc3ea56a2c730e827bc2f4e2e2',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;