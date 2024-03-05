class NotFoundException extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundException';
    }
}

export const controllerDefaultHandler = (fn) => {
    return async (req, res) => {
        try {
            const data = await fn(req);
            res.status(200).send(data);
        } catch (e) {
            console.log(e);

            if (e instanceof NotFoundException) res.status(404).send({ message: e.message });
            else if (e instanceof Error) res.status(500).send({ message: e.message });
        }
    }
};

export const getQueryParam = (query, param, isNumber) => {
    return isNumber ? Number(query[param]) : query[param];
};