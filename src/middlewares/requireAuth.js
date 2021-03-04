module.exports = (req, resp, next) => {

    const backendPassword = "ofslafsdewcdsfsdplpAjmiDdfdsq!d";

    const {authorization} = req.headers;

    console.log("autorizacao");

    if (!authorization || authorization!= backendPassword) resp.status(401).send("Wrong password - Not authorized");
    next();
}