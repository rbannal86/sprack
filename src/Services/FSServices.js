import app from "./Base";
const db = app.firestore();

const defaultSpices = {
  Salt: 1,
  Pepper: 2,
  Paprika: 3,
  "Garlic Powder": 4,
  "Chili Powder": 5,
};

const sampleSpices = {
  Salt: 1,
  Pepper: 2,
  Paprika: 3,
  "Garlic Powder": 4,
  "Chili Powder": 5,
  "Garam Masala": 10,
  "Onion Powder": 3,
  Cayenne: 3,
  Chipotle: 4,
  "White Pepper": 5,
  "Celery Salt": 7,
  "Italian Seasoning": 4,
  Saffron: 2,
  Turmeric: 5,
  Cinnamon: 6,
  "Ground Cloves": 9,
  "Ground Ginger": 8,
  Allspice: 4,
  "Star Anise": 8,
  "Herbes de Provence": 3,
};

const FSServices = {
  async signInUser(email, password) {
    return await app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem("sprackId", user.user.uid);
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
      localStorage.setItem("sprackId", user.user.uid);
      await db.collection("users").doc(userObj.id).set(userObj);
      return await this.fetchUserData(user.user.uid);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async resetSample() {
    console.log("resetting sample");
    let userObj = {
      favorites: ["Salt"],
      id: "v40DelcKHFR6qh9mEyMCxNPYsfM2",
      displayName: "Sample S. Spiceman",
      store: sampleSpices,
    };
    await db
      .collection("users")
      .doc("v40DelcKHFR6qh9mEyMCxNPYsfM2")
      .set(userObj);
  },

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
    let userRef = db.collection("users").doc(userId);
    if (favorites.length === 0) userRef.update({ favorites: [] });
    else userRef.update({ favorites: favorites });
  },

  async submitFeedback(title, body, user) {
    const data = { title, body, user, new: true };
    await db.collection("feedback").add(data);
    console.log("feedback submitted");
  },
};

export default FSServices;
