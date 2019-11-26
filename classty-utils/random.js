module.exports = {
    number(from, to) {
        const diff = to - from
        return from + Math.ceil(Math.random() * diff)
    },

    boolean() {
        return Math.random() > 0.5 - Number.EPSILON ? true : false
    },

    value(...values) {
        return values[Math.floor(Math.random() * values.length)]
    }
}