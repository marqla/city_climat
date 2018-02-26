/**
 * @type {Model}
 */
export class Model {

    /**
     * @constructor
     * @param {Object} model 
     */
    constructor (model) {

        model = model || {};

        /**
         * @type {Array}
         */
        let observers = [];

        /**
         * @returns {Array}
         */
        this.getObservers = () => {
            return observers;
        };

        /**
         * @returns {*}
         */
        this.get = (name, value) => {
            return undefined !== model[name] ? model[name] : value;
        }

        /**
         * @param {String} name 
         * @param {*} value 
         */
        this.set = (name, value) => {
            if (name in model) {
                return model[name] = value;
            }
        }

        /**
         * @returns {String}
         */
        this.toString = () => {
            return window.JSON.stringify(model);
        }

    }

    /**
     * @returns {undefined}
     */
    notify() {
        for (
            let i = 0, l = this.getObservers().length;
            i < l;
            this.getObservers()[i](this), i++
        );
        for (let key in this.get()) {
            if ("object" === typeof this.get()[key]
            && (this.get()[key] instanceof Model)) {
                this.get()[key].notify();
            }
        }
    }

    /**
     * @param {Function} callback 
     */
    bind (callback) {
        this.getObservers().push(callback);
    }

}