const dataBase = [{ username: "pierre", password: "123", id: 1 }]; // value hard coded for development

function findUser(user, callback) {
  const result = dataBase.find((d) => d.username === user);
  if (!result) return callback(null, null);
  else return callback(null, result);
}

function findUserById(id, cb) {
  process.nextTick(function () {
    const result = dataBase.find((d) => d.id === id);
    if (result) cb(null, result);
    else cb(new Error(`User ${id} does not exist!`));
  });
}

function createUser(user) {
  return new Promise((resolve, reject) => {
    const newUser = {
      id: dataBase.length + 1,
      ...user,
    };

    dataBase.push(newUser);
    resolve(newUser);
  });
}

export const db = {
  users: {
    findUser,
    findUserById,
    createUser,
  },
  dataBase,
};
