export const allAccess = (req, res) => {
    res.status(200).send({
        message: 'Public access'
    });
};

export const userBoard = (req, res) => {
    res.status(200).send({
        message: 'User Autentication Successfully'
    });
};

export const adminBoard = (req, res) => {
    res.status(200).send({
        message: 'Admin Autentication Successfully'
    });
};

export const moderatorBoard = (req, res) => {
    res.status(200).send({
        message: 'Moderator Autentication Successfully'
    });
};