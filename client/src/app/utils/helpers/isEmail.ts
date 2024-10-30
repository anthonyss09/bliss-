const isEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

export default isEmail;
