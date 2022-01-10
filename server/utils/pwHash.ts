const bcrypt = require('bcrypt');

const hashPw = (pw:string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pw,salt);
}

const compareHash = (pw:string,hashPw:string) => {
    return bcrypt.compareSync(pw, hashPw);
}

export { hashPw, compareHash }