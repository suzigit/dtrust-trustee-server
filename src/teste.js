const { ethers } = require('ethers');

const userWallet = new ethers.Wallet.createRandom();

console.log("privateKey " + (userWallet.privateKey.length-2));
console.log(userWallet.privateKey);

console.log("publicKey=" + (userWallet.publicKey.length-2));
console.log(userWallet.publicKey);

const s = Date.now()
console.log("date=" + s);


const f = async () => {
    let abc = await userWallet.signMessage("123");
    console.log("sig1=" + (abc.length-2));
    console.log(abc);
    
    abc = await userWallet.signMessage("meu cachorro me mordeu");
    console.log("sig2=" + (abc.length-2));
    console.log(abc);
    
    
    abc = await userWallet.signMessage("meu cachorro me mordeu dllfldsjfsjdfosdjfoiejfoidjflksdjflsdkjfskdjfksdjfksdjfkdsjfksdjfkdjfkjjjkjkkkjdsdasdasdasdasdasdasdasdasdasdasdasdasdasdwedefrgvervrefsfwfkwefkjsoijcoisjcoiwejcoweijckasdnlaskndlaksndlkasnd");
    console.log("sig3=" + (abc.length-2));
    console.log(abc);
    
}

f();

