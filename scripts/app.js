import {api} from '../scripts/api.js';

class PPPApp {
    static #instance;

    constructor() {
        if (PPPApp.#instance) {
            return PPPApp.#instance;
        }
        PPPApp.#instance = this;
    }

    /**
     * Format and send request to add a new user and format and add response to ui. 
     * @param {FormData} formData - the form data to add a new user (username and password)
     */
    async addUser(formData) {
        console.log(this);
        const user = this.#buildObject(formData);
        const resp = await api.addUser(user);
        //console.log(resp);
        this.#displayResp('addUserResp', resp);
    }

    /**
     * Format and send request to update a user and format and add response to ui.
     * @param {FormData} formData - the form data to update a user (userId and username and/or password)
     */
    async updateUser(formData) {
        const user = this.#buildObject(formData);
        const resp = await api.updateUser(user);
        // console.log(resp);
        this.#displayResp('updateUserResp', resp);
    }

    /**
     * Send request to get all users and format and add response to ui.
     */
    async getAllUsers() {
        const resp = await api.getAllUsers();
        this.#displayResp('getAllUsersResp', resp);
    }

    /**
     * Format and send request to get a user by username and format and add response to ui.
     * @param {FormData} formData - the form data to find user by username (username) 
     */
    async getUserByUsername(formData) {
        const username = formData.has('username') ? formData.get('username') : 'default';
        const resp = await api.getUserByUsername(username);
        this.#displayResp('getUserByUsernameResp', resp);
    }

    /**
     * Format and send request to delete a user and format and add response to ui.
     * @param {FormData} formData - the form data to delete user (userId)
     */
    async deleteUser(formData) {
        const userId = formData.has('userId') ? formData.get('userId') : 1;
        const resp = await api.deleteUser(userId);
        this.#displayResp('deleteUserResp', resp);
    }

    /**
     * Format and send request to add an album and format and add response to ui.
     * @param {FormData} formData - the form data to add an album
     */
    async addAlbum(formData) {
        const album = this.#buildObject(formData);
        let userId;
        if (album.hasOwnProperty('userId')) {
            userId = album.userId;
            delete album.userId;
        } else {
            userId = 1;
        }
        const resp = await api.addAlbum(album, userId);
        this.#displayResp('addAlbumResp', resp);
    }

    /**
     * Format and send request to update an album and format and add response to ui.
     * @param {FormData} formData - the form data to update an album
     */
    async updateAlbum(formData) {
        const album = this.#buildObject(formData);
        console.log("Album update: ", album);
        const resp = await api.updateAlbum(album);
        this.#displayResp('updateAlbumResp', resp);
    }

    /**
     * Send request to get all albums and format and add response to ui.
     */
    async getAllAlbums() {
        const resp = await api.getAllAlbums();
        this.#displayResp('getAllAlbumsResp', resp);
    }

    /**
     * Format and send request to get all albums for an album ID and format and add response to ui.
     * @param {FormData} formData - the form data to get albums for an album ID.
     */
    async getAlbumById(formData) {
        const albumId = formData.has('albumId') ? formData.get('albumId'): 0;
        const resp = await api.getAlbumById(albumId);
        this.#displayResp('getAlbumByIdResp', resp);
    }

    /**
     * Format and send request to get all albums for a user ID and format and add response to ui.
     * @param {FormData} formData 
     */
    async getAlbumsByUserId(formData) {
        const userId = formData.has('userId') ? formData.get('userId'): 0;
        const resp = await api.getAlbumsByUserId(userId);
        this.#displayResp('getAlbumsByUserIdResp', resp);
    }

    /**
     * Format and send request to delete an album and format and add response to ui.
     * @param {FormData} formData 
     */
    async deleteAlbum(formData) {
        const albumId = formData.has('albumId') ? formData.get('albumId'): 0;
        const resp = await api.deleteAlbum(albumId);
        this.#displayResp('deleteAlbumResp', resp)
    }

    /**
     * @typedef Form - a form object containing the form ID and the api function to use with the form.
     * @type {Object}
     * @property {String} formId - the id of the form
     * @property {String} apiFunc - the api function called with the form data
     */

    /**
     * Setup the application by adding event handlers to each form.
     */
    async setup() {
        const forms = [
            {
                formId: 'addUser',
                apiFunc: 'addUser'
            }, {
                formId: 'updateUser',
                apiFunc: 'updateUser'
            }, {
                formId: 'getUserByUsername',
                apiFunc: 'getUserByUsername'
            }, {
                formId: 'deleteUser',
                apiFunc: 'deleteUser'
            }, {
                formId: 'addAlbum',
                apiFunc: 'addAlbum'
            }, {
                formId: 'updateAlbum',
                apiFunc: 'updateAlbum'
            }, {
                formId: 'getAlbumById',
                apiFunc: 'getAlbumById'
            }, {
                formId: 'getAlbumsByUserId',
                apiFunc: 'getAlbumsByUserId'
            }, {
                formId: 'deleteAlbum',
                apiFunc: 'deleteAlbum'
            }
        ];
        for (let {formId, apiFunc} of forms) {
            this.#addFormEventHandlers(formId, apiFunc);
        }
        this.#addExtraFormEventHandlers();
    }

    /**
     * Add 'submit' event handler to form at formId and call callback function with the form data.
     * @param {string} formId - the id of the form
     * @param {string} methodName - method name to use with the form at formId
     */
    #addFormEventHandlers(formId, methodName) {
        let form = document.getElementById(formId);
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            await this[methodName](formData);
        })
    }

    /**
     * Add any additional event handlers that dont have form data
     */
    #addExtraFormEventHandlers() {
        let functionSelect = document.getElementById('functionSelect');
        functionSelect.addEventListener('change', (event) => {
            const allForms = document.getElementsByClassName('form-container');

            for (let form of allForms) {
                form.classList.add('d-none');
            }

            const selectedFormId = functionSelect.value;

            const selectedForm = document.getElementById(selectedFormId);
            selectedForm.parentElement.classList.remove('d-none');
        });

        let getAllUsersForm = document.getElementById('getAllUsers');
        getAllUsersForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            await this.getAllUsers();
        });

        let getAllAlbumsForm = document.getElementById('getAllAlbums');
        getAllAlbumsForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            await this.getAllAlbums();
        });
    }

    /**
     * Build an object from form data
     * @param {FormData} formData - the form data to build object from
     * @param {object} [object] - optional object to form data to
     * @returns {object} the object from the form data
     */
    #buildObject(formData, object) {
        const obj = object == undefined ? {} : object;
        for (let [key, value] of formData.entries()) {
            obj[key] = value;
        }
        return obj;
    }

    /**
     * Display the response object in the response container at container ID.
     * @param {string} containerId - the ID of the resp container
     * @param {object} resp - the response object
     */
    #displayResp(containerId, resp) {
        let respEl = document.getElementById(containerId);
        respEl.innerText = JSON.stringify(resp, null, 4);
    }

}

const app = new PPPApp();
export { app };