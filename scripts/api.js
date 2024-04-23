
/**
 * API class to connect to my Java backend server
 */
class PPPApi {
    static #instance;

    constructor() {
        if (PPPApi.#instance) {
            return PPPApi.#instance;
        }
        PPPApi.#instance = this;

        // TODO: Set to Spring Boot base URL
        this.base = 'http://localhost:8080';
    }

    /**
     * Return full API URL with endpoint
     * @param {string} endpoint 
     * @returns {string} base url + endpoint
     */
    apiURL(endpoint) {
        return this.base + endpoint;
    }

    /**
     * @typedef User
     * @type {Object}
     * @property {number} [userId]
     * @property {string} [username]
     * @property {string} [password]
     */

    /**
     * Creating a new user with a POST request. The passed user object should contain all required fields (username and password) and return the new user object with its ID
     * @param {User} user - the new user object to create
     * @returns the new user object or null. Logs any errors to the console.
     */
    async addUser(user) {
        const endpoint = "/users";
        const url = this.apiURL(endpoint);
        try {
            console.log(user.username);
            const resp = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const respData = await resp.json();
            if (resp.ok) {
                console.log("Response data: ", respData)
                return respData;
            } else {
                console.log(respData);
                return respData;
            }
        } catch (error) {
            console.log(`An unexpected error occured when creating a user: ${error}`);
            return {error: "An unexpected error occcured when creating a user"};
        }
    }

    /**
     * Updating a user object with a PATCH request. The passed user object should contain all required fields (userId, username, and password) and return the updated user object.
     * @param {User} user - the user object with the fields to update
     * @returns the updated user object. Logs any errors to the console.
     */
    async updateUser(user) {
        const endpoint = `/users/${user.userId}`;
        const url = this.apiURL(endpoint);
        try {
            const resp = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const respData = await resp.json();
            if (resp.ok) {
                console.log("Response data: ", respData)
                return respData;
            } else {
                console.log(respData);
                return respData;
            }
        } catch (error) {
            console.log(`An unexpected error occured when updating a user: ${error}`);
            return error;
        }
    }

    /**
     * Retrieve a list of all users with a GET request.
     * @returns an array of all user objects
     */
    async getAllUsers() {
        const endpoint = '/users';
        const url = this.apiURL(endpoint);
        try {
            const resp = await fetch(url, {
                method: 'GET'
            });
            const respData = await resp.json();
            if (resp.ok) {
                console.log("Response data: ", respData)
                return respData;
            } else {
                console.log(respData);
                return respData;
            }
        } catch (error) {
            console.log(`An unexpected error occured when retrieving all users: ${error}`);
            return error;
        }
    }

    /**
     * Retrieve a user by there username with a GET request.
     * @param {string} username 
     */
    async getUserByUsername(username) {
        const endpoint = `/users/${username}`;
        const url = this.apiURL(endpoint);
        try {
            const resp = await fetch(url, {
                method: 'GET'
            });
            const respData = await resp.json();
            if (resp.ok) {
                console.log("Response data: ", respData);
                return respData;
            } else {
                console.log(respData);
                return respData;
            }
        } catch (error) {
            console.log(`An unexpected error occured when retrieving a user: ${error}`);
            return error;
        }
    }

    // TODO: Update method in Java server
    /**
     * Retrieving a user by their username and password with a GET request.
     * @param {string} username 
     * @param {string} password 
     */
    async getUserByUsernameAndPassword(username, password) {
        const endpoint = `/find/${username}`;
        const url = this.apiURL(endpoint);
        try {
            const resp = await fetch(url, {
                method: 'GET'
            });
            const respData = await resp.json();
            if (resp.ok) {
                console.log("Response data: ", respData);
                return respData;
            } else {
                console.log(respData);
                return respData;
            }
        } catch (error) {
            console.log(`An unexpected error occured when retrieving a user by username and password: ${error}`);
            return error;
        }
    }

    /**
     * Deleting user at userId with a DELETE request.
     * @param {number} userId 
     */
    async deleteUser(userId) {
        const endpoint = `/users/${userId}`;
        const url = this.apiURL(endpoint);
        try {
            const resp = await fetch(url, {
                method: 'DELETE'
            });
            const respData = await resp.text();
            if (resp.ok) {
                console.log("Response data: ", respData);
                return respData;
            } else {
                console.log(respData);
                return respData;
            }
        } catch (error) {
            console.log(`An unexpected error occured when deleting a user: ${error}`);
            return error;
        }
    }

    /**
     * @typedef Album
     * @type {Object}
     * @property {number} [albumId]
     * @property {string} [title]
     * @property {string} [author]
     * @property {number} [songCount]
     * @property {number} [runTime]
     */

    /**
     * Creating a new album with a POST request. The album object should have all required parameters to create a new album (title, author, songCount, and runTime).
     * @param {Album} album
     * @param {number} userId
     * @returns the newly created album
     */
    async addAlbum(album, userId) {
        const endpoint = `/albums/${userId}`;
        const url = this.apiURL(endpoint);
        try {
            const resp = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(album)
            });
            const respData = await resp.json();
            if (resp.ok) {
                console.log("Response data: ", respData);
                return respData;
            } else {
                console.log(respData);
                return respData;
            }
        } catch (error) {
            console.log(`An unexpected error occured when adding an album: ${error}`);
            return error;
        }
    }

    /**
     * Updating an album at albumId with a PATCH request. The album object should contain all required parameters including the albumId.
     * @param {Album} album 
     */
    async updateAlbum(album) {
        const endpoint = `/albums/${album.albumId}`;
        const url = this.apiURL(endpoint);
        try {
            const resp = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(album)
            });
            const respData = await resp.json();
            if (resp.ok) {
                console.log("Response data: ", respData);
                return respData;
            } else {
                console.log(respData);
                return respData;
            }
        } catch (error) {
            console.log(`An unexpected error occured when updating an album: ${error}`);
            return error;
        }
    }

    /**
     * Retrieving a list of all albums with a GET request.
     */
    async getAllAlbums() {
        const endpoint = '/albums';
        const url = this.apiURL(endpoint);
        try {
            const resp = await fetch(url, {
                method: 'GET'
            });
            const respData = await resp.json();
            if (resp.ok) {
                console.log("Response data: ", respData);
                return respData;
            } else {
                console.log(respData);
                return error;
            }
        } catch (error) {
            console.log(`An unexpected error occured when retrieving all albums: ${error}`);
            return error;
        }
    }

    /**
     * Retrieving an album by album ID with a GET request
     * @param {number} albumId 
     */
    async getAlbumById(albumId) {
        const endpoint = `/albums/${albumId}`;
        const url = this.apiURL(endpoint);
        try {
            const resp = await fetch(url, {
                method: 'GET'
            });
            const respData = await resp.json();
            if (resp.ok) {
                console.log("Response data: ", respData);
                return respData;
            } else {
                console.log(respData);
                return respData;
            }
        } catch (error) {
            console.log(`An unexpected error occured when retrieving an album: ${error}`);
            return error;
        }
    }

    /**
     * Retrieving a list of albums for a user with user ID with a GET request.
     * @param {number} userId 
     */
    async getAlbumsByUserId(userId) {
        const endpoint = `/albums/${userId}/albums`;
        const url = this.apiURL(endpoint);
        try {
            const resp = await fetch(url, {
                method: 'GET'
            });
            const respData = await resp.json();
            if (resp.ok) {
                console.log("Response data: ", respData);
                return respData;
            } else {
                console.log(respData);
                return respData;
            }
        } catch (error) {
            console.log(`An unexpected error occured when retrieving all albums for a user: ${error}`);
            return error;
        }
    }

    /**
     * Deleting album at album ID with a DELETE request.
     * @param {number} albumId 
     */
    async deleteAlbum(albumId) {
        const endpoint = `/albums/${albumId}`;
        const url = this.apiURL(endpoint);
        try {
            const resp = await fetch(url, {
                method: 'DELETE'
            });
            const respData = await resp.text();
            if (resp.ok) {
                console.log("Response data: ", respData);
                return respData;
            } else {
                console.log(respData);
                return respData;
            }
        } catch (error) {
            console.log(`An unexpected error occured when deleting an album: ${error}`);
            return error;
        }
    }

}


const api = new PPPApi();
export { api };