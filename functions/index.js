const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors")({
  origin: true
});

admin.initializeApp();
db = admin.database();

makeSlug = () => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 21; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

exports.newgroup = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method === "POST") {
      const slug = makeSlug();
      const t = Date.now();
      const name = req.query.name;
      if (!name) {
        return res.json({ error: "Missing parameter 'name'!" });
      } else if (name.length > 25) {
        return res.json({
          error: "Parameter 'name' only allows 25 characters!"
        });
      }
      db.ref("/groups")
        .orderByKey()
        .equalTo(slug)
        .limitToFirst(1)
        .once("value", function(snapshot) {
          if (snapshot.exists()) {
            return res.json({ error: "Slug already in use!" });
          } else {
            db.ref("/groups")
              .child(slug)
              .set({ name: name, createdAt: t });

            return res.json({ slug: slug });
          }
        });
    } else {
      res.statusCode = 405;
      return res.json({ error: "Method not allowed!" });
    }
  });
});

exports.getgroup = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method === "GET") {
      const slug = req.query.slug;
      db.ref("/groups")
        .orderByKey()
        .equalTo(slug)
        .limitToFirst(1)
        .once("value", function(snapshot) {
          if (snapshot.exists()) {
            return res.json(snapshot.val());
          } else {
            return res.json({ error: "Slug invalid!" });
          }
        });
    } else {
      return res.json({ error: "Method not allowed!" });
    }
  });
});

exports.newparticipant = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method === "POST") {
      const slug = req.query.slug;
      const name = req.query.name;
      if (!name) {
        return res.json({ error: "Missing parameter 'name'!" });
      } else if (name.length > 25) {
        return res.json({
          error: "Parameter 'name' only allows 25 characters!"
        });
      } else if (!slug) {
        return res.json({ error: "Missing parameter 'slug'!" });
      }
      db.ref("/groups")
        .orderByKey()
        .equalTo(slug)
        .limitToFirst(1)
        .once("value", function(snapshot) {
          if (snapshot.exists()) {
            let parts = [];
            if (snapshot.val()[slug].participants) {
              parts = snapshot.val()[slug].participants;
            }

            let lcaseparts = [];
            for (let i = 0; i < parts.length; i++) {
              lcaseparts.push(parts[i].toLowerCase());
            }

            if (lcaseparts.includes(name.toLowerCase())) {
              return res.json({ error: "Name already in Group!" });
            }

            parts.push(name);

            db.ref("/groups/" + slug)
              .child("participants")
              .set(parts);

            return res.json({
              participants: parts
            });
          } else {
            return res.json({ error: "Group slug is invalid!" });
          }
        });
    } else {
      res.statusCode = 405;
      return res.json({ error: "Method not allowed!" });
    }
  });
});

exports.newresult = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method === "POST") {
      const slug = req.query.slug;
      const t = Date.now();
      const reqResult = JSON.parse(req.query.result);
      if (!reqResult) {
        return res.json({ error: "Missing parameter 'result'!" });
      } else if (!slug) {
        return res.json({ error: "Missing parameter 'slug'!" });
      }
      db.ref("/groups")
        .orderByKey()
        .equalTo(slug)
        .limitToFirst(1)
        .once("value", function(snapshot) {
          if (snapshot.exists()) {
            let results = [];
            if (snapshot.val()[slug].results) {
              results = snapshot.val()[slug].results;
            }

            if (Array.isArray(reqResult)) {
              result = { scores: reqResult, createdAt: t };

              results.push(result);

              db.ref("/groups/" + slug)
                .child("results")
                .set(results);

              return res.json({ results: results });
            }
          } else {
            return res.json({ error: "Group slug is invalid!" });
          }
        });
    } else {
      res.statusCode = 405;
      return res.json({ error: "Method not allowed!" });
    }
  });
});
