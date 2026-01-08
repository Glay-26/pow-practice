const crypto = require('crypto')
class Blockchain {
    constructor() {
        this.Blockchain =[]
        this.data = []
        this.difficulty = 4
        // const hash = this.computeHash(0,'0',1767753176955,'hello glay',0)
        // console.log(hash)
    }

    mine(){
        let nonce = 0
        const index = 0
        const data = 'hello glay'
        const previousHash = '0'
        const timestamp = new Date().getTime()
        let hash = this.computeHash(index, previousHash, timestamp, data, nonce+'台账')
        while(hash.slice(0,4) !=='0000'){
            nonce++
            hash = this.computeHash(index, previousHash, timestamp, data, nonce+'台账')
        }
        // console.log('挖矿结束，结果为', nonce, hash)
        // // 打印挖出区块所要花费的时间，并将时间戳换算为秒
        // console.log('挖出4个0开头的区块花费时间：', (new Date().getTime() - timestamp) / 1000, '秒')
        let hash5 = this.computeHash(index, previousHash, timestamp, data, nonce+'台账')
        while(hash5.slice(0,5) !=='00000'){
            nonce++
            hash5 = this.computeHash(index, previousHash, timestamp, data, nonce+'台账')
        }
        // console.log('挖矿结束，结果为', nonce, hash)
        // // 打印挖出区块所要花费的时间，并将时间戳换算为秒
        // console.log('挖出5个0开头的区块花费时间：', (new Date().getTime() - timestamp) / 1000, '秒')
    }

    computeHash(index, previousHash, timestamp, data, nonce){
        return crypto.createHash('sha256').update(index + previousHash + timestamp + data + nonce).digest('hex')
    }
}

let bc = new Blockchain()
bc.mine()