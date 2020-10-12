import app from "./Base";
const db = app.firestore();

const defaultSpices = {
  Salt: 1,
  Pepper: 2,
  Paprika: 3,
  "Garlic Powder": 4,
  "Chili Powder": 5,
};

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
    console.log("registering new user");
    try {
      let user = await app
        .auth()
        .createUserWithEmailAndPassword(email, password);
      let userObj = {
        id: user.user.uid,
        displayName,
        favorites: [],
        store: defaultSpices,
      };
      await db.collection("users").doc(userObj.id).set(userObj);
      return await this.fetchUserData(user.user.uid);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  //default parameter for testing
  async fetchUserData(userId) {
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
