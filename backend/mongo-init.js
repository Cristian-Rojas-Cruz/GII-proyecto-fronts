db.createUser(
    {
        user: "admin",
        pwd: "root",
        roles: [
            {
                role: "readWrite",
                db: "testdb"
            }
        ]
    }
);

db = db.getSiblingDB('testdb');

db.roles.insertOne({ _id: 1, name: "user" });
db.roles.insertOne({ _id: 2, name: "moderator" });
db.roles.insertOne({ _id: 3, name: "admin" });