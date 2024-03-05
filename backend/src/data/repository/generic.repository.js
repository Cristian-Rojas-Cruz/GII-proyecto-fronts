import { getCollection } from "../index.js";


const getAll = async (collection, limit, offset, fields) => {
    const Model = getCollection(collection);

    const allData = await Model.find({}, fields).skip(offset || 0).limit(limit || 0).exec();

    return { data: allData, total: allData.length };
};

const create = async (collection, document) => {
    const Model = getCollection(collection);
    const doc = new Model(document);
    await doc.save();
    return doc._id;
};


const get = async (collection, id) => {
    const Model = getCollection(collection);
    const data = await Model.findById(id).exec();
    if (!data) throw new NotFoundException();
    return data;
};

const getFromIdArray = async (collection, ids, limit, offset, fields) => {
    const Model = getCollection(collection);
    const result = await Model.find({ '_id': { $in: ids } }, fields).skip(offset || 0).limit(limit || 0).exec();
    return { data: result, total: ids.length };
};


const update = async (collection, id, data) => {
    const Model = getCollection(collection);
    const updated = await Model.updateOne({ _id: id }, { $set: data }).exec();
    if (updated.modifiedCount === 0) throw new NotFoundException();
};


const remove = async (collection, id) => {
    const Model = getCollection(collection);
    const data = await Model.findByIdAndDelete(id).exec();
    if (!data) throw new NotFoundException();
};


export default { getAll, create, get, getFromIdArray, update, remove };