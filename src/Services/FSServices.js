import app from "./Base";
const db = app.firestore();

const defaultSpices = [
  { name: "salt", amount: 0 },
  { name: "pepper", amount: 0 },
  { name: "parsley", amount: 0 },
  { name: "sage", amount: 0 },
  { name: "rosemary", amount: 0 },
  { name: "thyme", amount: 0 },
];

const FSServices = {
  async signInUser(email, password) {
    return await app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        return user.user.uid;
      })
      .catch((error) => {
        const err = {
          code: error.code,
          message: error.message,
        };
        return err;
      });
  },

  async registerNewUser(email, password, displayName) {
    try {
      let user = await app
        .auth()
        .createUserWithEmailAndPassword(email, password);
      let userObj = {
        id: user.user.uid,
        displayName,
      };
      await db.collection("users").doc(userObj.id).set(userObj);
      defaultSpices.map(async (spice) => {
        return await db
          .collection("users")
          .doc(userObj.id)
          .collection("spices")
          .doc(spice.name)
          .set(spice);
      });
      return await this.fetchUserData(user.user.uid);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  //default parameter for testing
  async fetchUserData(userId = "1Kja06mE6UYJPcZLwZH9RGKGm4j1") {
    let userRef = db.collection("users").doc(userId);
    let getDoc = userRef
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("User Does Not Exist");
        } else {
          return doc.data();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return getDoc;
  },

  async updateStore(store, userId) {
    let userRef = db.collection("users").doc(userId);
    userRef.update({ store: store });
  },

  async updateFavorites(favorites, userId) {
    console.log(favorites);
    let userRef = db.collection("users").doc(userId);
    if (favorites.length === 0) userRef.update({ favorites: [] });
    else userRef.update({ favorites: favorites });
  },
};

export default FSServices;
