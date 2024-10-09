import * as jwt from 'jose';

export const verifyToken = async (token) => {

  const jwtKey = jwt.base64url.decode("decrypt");

  const verify = await jwt.jwtVerify(token, jwtKey);
  return verify;
  // console.log("$$$$$$$$$$$$$$$$$$$$")
  // console.log(verify)

}

export const generateToken = async (userPassword  , userMail , userName) => {

    const jwtKey = jwt.base64url.decode("decrypt");


  const token = await new jwt.SignJWT({ userPassword,  userName , userMail})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2d') // Token expires in 2 days
    .sign(jwtKey);

  return token;
};