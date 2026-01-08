let fs = require('fs')
let EC = require('elliptic').ec;
let ec = new EC('secp256k1');
let keypair = ec.genKeyPair();

function getPub(prv){
    return ec.keyFromPrivate(prv).getPublic('hex').toString()
}

const res = generateKeys()
console.log(res)
function generateKeys() {
    const fileName ='./wallet.json'
    try {
      let res= JSON.parse(fs.readFileSync(fileName))
      if(res.prv && res.pub&& getPub(res.prv)==res.pub){
        console.log('公私钥对已存在')
        keypair = ec.keyFromPrivate(res.prv)
        return res
      }else{
        throw 'not valid wallet.json'
      }
    } catch (error) {
      const res = {
        prv: keypair.getPrivate('hex').toString(),
        pub: keypair.getPublic('hex').toString()
      }
      fs.writeFileSync(fileName, JSON.stringify(res))
      return res
    }
}

// 用私钥对符合 POW 4 个 0 开头的哈希值的 “昵称 + nonce” 进行私钥签名
function sign(message) {
    const signature = keypair.sign(message).toDER('hex').toString('hex');
    return signature;
}

function verify({message, signature},pub) {
    const keypairTemp = ec.keyFromPublic(pub);
    const verified = keypairTemp.verify(message, signature);
    return verified;
}