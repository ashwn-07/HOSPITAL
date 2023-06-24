const express = require("express");
const app = new express();

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const fs = require("fs");

router.get("/read", (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    var rdfile = JSON.parse(data);

    res.send(rdfile);
  });
});
router.post("/add", (req, res) => {
  fs.readFile("./data.json", (err, data) => {
    var rddfile = JSON.parse(data);

    var pf = req.body;
    rddfile.push(pf);

    // rddfile.push({
    //   name: "Amrita Hospital",
    //   location: "Kochi",
    //   patientCount: 626,
    // });

    strdata = JSON.stringify(rddfile);
    fs.writeFile("./data.json", strdata, () => {
      console.log("Data has been added successfully!");
      res.send(rddfile);
    });
  });
});

router.put("/update/:id", (req, res) => {
  const ind = req.params.id;

  fs.readFile("./data.json", (err, data) => {
    var ptcnt = req.body.patientcount;
    var rddfile = JSON.parse(data);
    rddfile[ind].patientCount = ptcnt;

    //adding fs.writeFile() will modify the original data.json
    //if that is not nessecary we can comment fs.writeFile() and uncomment res.send(rddfile) outside this.
    fs.writeFile("./data.json", JSON.stringify(rddfile), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Data has been updated successfully!");
      res.send(rddfile);
    });
    //res.send(rddfile);
  });
});

router.delete("/delete/:id", (req, res) => {
  const ind = req.params.id;

  fs.readFile("./data.json", (err, data) => {
    var rddfile = JSON.parse(data);
    rddfile.splice(ind, 1);

    //adding fs.writefile() will modify the original data.json
    //if that is not nessecary we can comment  fs.writefile() and uncomment res.send(rddfile) outside this.
    fs.writeFile("./data.json", JSON.stringify(rddfile), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Data has been Deleted successfully!");
      res.send(rddfile);
    });

    //res.send(rddfile);
  });
});
module.exports = router;
