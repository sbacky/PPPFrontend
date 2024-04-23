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
     * Build an object from form data
     * @param {FormData} formData - the form data to build object from
     * @param {object} [object] - optional object to form data to
     * @returns the object from the form data
     */
    #buildObject(formData, object) {
        const obj = [];
        for (let [key, value] of formData.entries()) {
            obj[key] = value;
        }
        return obj;
    }

    /**
     * Format and send request to add a new user and format and add response to ui. 
     * @param {FormData} formData - the form data to add a new user (username and password)
     */
    async addUser(formData) {
        const user = {};
        for (let [key, value] of formData.entries()) {
            user[key] = value;
        }
        const resp = await api.addUser(user);
        //console.log(resp);
        let respEl = document.getElementById('addUserResp');
        respEl.innerText = JSON.stringify(resp, null, 4);
    }

    /**
     * Format and send request to update a user and format and add response to ui.
     * @param {FormData} formData - the form data to update a user (userId and username and/or password)
     */
    async updateUser(formData) {
        const user = {};
        for (let [key, value] of formData.entries()) {
            user[key] = value;
        }
        const resp = await api.updateUser(user);
        // console.log(resp);
        let respEl = document.getElementById('updateUserResp');
        respEl.innerText = JSON.stringify(resp, null, 4);
    }

    /**
     * Send request to get all users and format and add response to ui.
     */
    async getAllUsers() {
        const resp = await api.getAllUsers();
        let respEl = document.getElementById('getAllUsersResp');
        respEl.innerText = JSON.stringify(resp, null, 4);
    }

    /**
     * Format and send request to update a user and format and add response to ui.
     * @param {FormData} formData - the form data to find user by username (username) 
     */
    async getUserByUsername(formData) {
        const user = {};
        for (let [key, value] of formData.entries()) {
            user[key] = value;
        }
    }

    /**
     * @typedef Form - a form object containing the form ID and the api function to use with the form.
     * @type {Object}
     * @property {String} formId - the id of the form
     * @property {Function} apiFunc - the api function called with the form data
     */

    /**
     * Setup the application by adding event handlers to each form.
     * @param {Form[]} forms - a list of form objects with the form ID and the api function used with the form
     */
    async setup(forms) {
        for (let {formId, apiFunc} of forms) {
            this.#addFormEventHandlers(formId, apiFunc);
        }
    }

    /**
     * Add 'submit' event handler to form at formId and call callback function with the form data.
     * @param {string} formId - the id of the form
     * @param {Function} apiFunc - api function to use with the form at formId
     */
    #addFormEventHandlers(formId, apiFunc) {
        let form = document.getElementById(formId);
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(this);
            apiFunc(formData);
        })
    }

}

const app = new PPPApp();
export { app };