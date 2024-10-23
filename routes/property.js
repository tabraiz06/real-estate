const express = require("express");
const propertyModel = require("../database/models/property");
const router = express.Router();

const dbFun = require("../database/dbFun");

const multer = require("multer");
const cors = require("cors");
const uploads = multer({ dest: "uploads/" });
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const upload = multer({ storage: storage });
router.use(cors());
router.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' cdn.example.com;"
  );
  next();
});

router.post("/upload", (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    const filePath = req.file.path;

    let url = req.file.path.replace(/\\/g, "/");
    // setTimeout(async () => {
    //   let exists = await propertyModel.findOne({ imageUrl: url });
    //   if (!exists) {
    //     fs.unlink(filePath, (err) => {
    //       if (err) console.error("Error deleting image:", err);
    //       else
    //         console.log("Image successfully deleted due to no DB reference.");
    //     });
    //   }
    // }, 600000);

    res.json({ url: url });
  });
});

router.post("/add-basic", async (req, res) => {
  const basic = req.body;

  try {
    let updatedProperty = await propertyModel.create({ basic: basic });

    if (!updatedProperty) {
      res.status(400).json({ status: "failure", message: "bad request" });
      return;
    }

    let propertyId = updatedProperty._id;
    res.status(200).json({ status: "success", data: propertyId });
  } catch (error) {
    res.status(500).json({ status: "failure", message: error.message });
  }
});

router.post("/add-details/:propertyId", async (req, res) => {
  const details = req.body;
  const propertyId = req.params.propertyId;

  try {
    let updatedProperty = await propertyModel.findByIdAndUpdate(
      { _id: propertyId },
      { details: details },
      { returnDocument: "after" }
    );

    if (!updatedProperty) {
      res.status(400).json({ status: "failure", message: "bad request" });
      return;
    }

    let updatedPropertyId = updatedProperty._id;
    res.status(200).json({ status: "success", data: updatedPropertyId });
  } catch (error) {
    res.status(500).json({ status: "failure", message: error.message });
  }
});

router.post("/add-general/:propertyId", async (req, res) => {
  const generalInfo = req.body;
  const propertyId = req.params.propertyId;

  try {
    let updatedProperty = await propertyModel.findByIdAndUpdate(
      { _id: propertyId },
      { general: generalInfo },
      { returnDocument: "after" }
    );

    if (!updatedProperty) {
      res.status(400).json({ status: "failure", message: "bad request" });
      return;
    }

    let updatedPropertyId = updatedProperty._id;
    res.status(200).json({ status: "success", data: updatedPropertyId });
  } catch (error) {
    res.status(500).json({ status: "failure", message: error.message });
  }
});

router.post("/add-location/:propertyId", async (req, res) => {
  const locationInfo = req.body;
  const propertyId = req.params.propertyId;

  try {
    let updatedProperty = await propertyModel.findByIdAndUpdate(
      { _id: propertyId },
      { location: locationInfo },
      { returnDocument: "after" }
    );

    if (!updatedProperty) {
      res.status(400).json({ status: "failure", message: "bad request" });
      return;
    }

    let updatedPropertyId = updatedProperty._id;
    res.status(200).json({ status: "success", data: updatedPropertyId });
  } catch (error) {
    res.status(500).json({ status: "failure", message: error.message });
  }
});

router.post("/add-property", dbFun.authUser, async (req, res) => {
  const propertyData = req.body;

  let userId = req.user._id;
  propertyData.owner = userId;
  try {
    let ppdID = await dbFun.PPDid();
    let newProperty = await propertyModel.create({
      ppdId: ppdID,
      ...propertyData,
    });

    if (!newProperty) {
      res.status(400).json({ status: "failure", message: "Bad request" });
      return;
    }

    let propertyId = newProperty._id;
    res.status(200).json({ status: "success", data: propertyId });
  } catch (error) {
    res.status(500).json({ status: "failure", message: error.message });
  }
});

router.get("/get-property", dbFun.authUser, async (req, res) => {
  let userId = req.user._id;
  try {
    let properties = await propertyModel.find({ owner: userId });

    if (!properties) {
      res.status(400).json({ status: "failure", message: "Bad request" });
      return;
    }

    res.status(200).json({ status: "success", data: properties });
  } catch (error) {
    res.status(500).json({ status: "failure", message: error.message });
  }
});

router.put("/edit-property/:ppdId", dbFun.authUser, async (req, res) => {
  let userId = req.user._id;
  let ppdID = req.params.ppdId;
  let data = req.body;

  try {
    let updatedProperty = await propertyModel.findOneAndUpdate(
      { ppdId: ppdID },
      data,
      { new: true }
    );
    if (!updatedProperty) {
      res.status(400).json({ status: "failure", message: "Bad request" });
      return;
    }

    res.status(200).json({ status: "success", data: updatedProperty });
  } catch (error) {
    res.status(500).json({ status: "failure", message: error.message });
  }
});

router.delete("/delete-property/:ppdId", dbFun.authUser, async (req, res) => {
  let userId = req.user._id;
  let ppdId = req.params.ppdId;

  try {
    let result = await propertyModel.deleteOne({ ppdId: ppdId, owner: userId });

    if (result.deletedCount === 0) {
      res.status(404).json({ status: "failure", message: "No such document" });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({ status: "failure", message: error.message });
  }
});

module.exports = router;
