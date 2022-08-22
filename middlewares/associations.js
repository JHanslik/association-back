const associations = require("../associations.json");

const verifyAssociation = (req, res, next) => {
    const { slug } = req.params;
    const association = associations.find(
        (association) => association.slug === slug
    );
    if (association) {
        next();
    } else {
        res.status(404).json("Association not found");
    }
};

module.exports = {
    verifyAssociation: verifyAssociation,
};
