module.exports = {
    db: "mongodb://hackuser:hackpass@localhost:27017/hackaton?authSource=admin",
    crypto: {
        iterations: 10000,
        size: 64,
        digest: "sha256"
    },
    jwtsecret: 'GOTTA~BONK~HACK'
}