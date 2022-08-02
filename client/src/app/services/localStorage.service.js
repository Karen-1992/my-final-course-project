const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const FAVORITES = "favorites";

export function setTokens({
    refreshToken,
    idToken,
    localId,
    expiresIn = 3600
}) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, localId);
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
}
export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}
export function removeAuthData() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
}

export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}

export function setFavorites() {
    localStorage.setItem(FAVORITES, JSON.stringify([]));
}
export function getFavorites() {
    return JSON.parse(localStorage.getItem(FAVORITES));
}
export function addFavorites(favoriteId) {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES));
    const index = favorites.findIndex(f => f === favoriteId);
    if (index === -1) {
        favorites.push(favoriteId);
    } else {
        favorites.filter(f => f !== favoriteId);
    }
    localStorage.setItem(FAVORITES, JSON.stringify(favorites));
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId,
    removeAuthData,
    setFavorites,
    getFavorites,
    addFavorites
};
export default localStorageService;
