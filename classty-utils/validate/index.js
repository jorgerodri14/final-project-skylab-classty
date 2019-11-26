
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const URL_REGEX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

module.exports = {
    string(target, name, empty = true, values) {
        if (typeof target !== 'string') throw TypeError(`${name} with value ${target} is not a string`)
        if (empty && !target.trim()) throw new Error(`${name} is empty or blank`)
        if (values && !values.includes(target)) throw new Error(`${name} with value ${target} does not match one of the expected values: ${values.join(', ')}`)
    },

    email(target, name) {
        if (!EMAIL_REGEX.test(target)) throw new Error(`${name} with value ${target} is not a valid e-mail`)
    },

    function(target, name) {
        if (typeof target !== 'function') throw TypeError(`${name} with value ${target} is not a function`)
    },

    url(target, name) {
        if (!URL_REGEX.test(target)) throw new Error(`${name} with value ${target} is not a valid URL`)
    },

    number(target, name) {
        if (typeof target !== 'number') throw TypeError(`${name} with value ${target} is not a number`)
    },

    date(target, name) {
        if (!(target instanceof Date)) throw TypeError(`${name} with value ${target} is not a date`)
    },
    array(target, name) {
        if (!(target instanceof Array)) throw TypeError(`${name} with value ${target} is not a array`)
    }
}