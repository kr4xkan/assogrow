module.exports = {
    db: "mongodb://hackuser:hackpass@10.1.1.204:27017/hackaton?authSource=admin",
    crypto: {
        iterations: 10000,
        size: 64,
        digest: "sha256"
    },
    jwtsecret: 'CEWHJKHCJKWEHJKCHWEUIHCUHWEHCJKEHCBHJEWBQJKCXNEJQWHCJKLEWHNCBEWHU'
}