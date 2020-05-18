import app from "./Base";
const db = app.firestore();

const defaultSpices = [
  { name: "salt", amount: 0 },
  { name: "pepper", amount: 0 },
  { name: "parsley", amount: 0 },
  { name: "sage", amount: 0 },
  { name: "rosemary", amount: 0 },
  { name: "thyme", amount: 0 }
];

const FSServices = {
  async listenForLogin() {
    app.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("User Log In");
      }
    });
  },

  async registerNewUser(email, password, displayName) {
    try {
      let user = await app
        .auth()
        .createUserWithEmailAndPassword(email, password);
      let userObj = {
        id: user.user.uid,
        displayName
      };
      await db
        .collection("users")
        .doc(userObj.id)
        .set(userObj);
      defaultSpices.map(async spice => {
        return await db
          .collection("users")
          .doc(userObj.id)
          .collection("spices")
          .doc(spice.name)
          .set(spice);
      });
    } catch (error) {
      console.log(error);
      return error;
    }
    // return app
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((user) => {
    //     let user = app.auth().currentUser

    //   })
    //   .catch(error => {
    //     return error;
    //   });
  },

  async fetchSpices(userId = "1R8B2HYUWhD1iJ9Obzc6") {
    return db
      .collection("users")
      .doc(userId)
      .collection("spices")
      .get();
  }
};

export default FSServices;
