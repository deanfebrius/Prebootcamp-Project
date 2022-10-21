import Profiles from "../models/profileModel.js";
import path from "path";
import fs from "fs";

export const getProfiles = async (req, res) => {
  try {
    const response = await Profiles.findAll();
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getProfilesById = async (req, res) => {
  try {
    const response = await Profiles.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const saveProfiles = (req, res) => {
  if (req.file === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const username = req.body.username;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/profileimages/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  const caption = req.body.title;

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Image" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File Size max 5MB" });

  file.mv(`./public/profileimages/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Profiles.create({
        username: username,
        image: fileName,
        url: url,
        caption: caption,
      });
      res.status(201).json({ msg: "Profile Create Succeed" });
    } catch (error) {
      console.log(error.message);
    }
  });
};
export const updateProfiles = async (req, res) => {
  const post = await Profiles.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!post) return res.status(404).json({ msg: "No Profiles Found" });
  let fileName = "";
  if (req.files === null) {
    fileName = Profiles.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Image" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "File Size max 5MB" });

    const filepath = `./public/profileimages/${post.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/profileimages/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const caption = req.body.title;
  const url = `${req.protocol}://${req.get("host")}/profileimages/${fileName}`;
  try {
    await Profiles.update(
      { caption: caption, image: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Product Updated" });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteProfiles = async (req, res) => {
  const post = await Profiles.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!post) return res.status(404).json({ msg: "No Profile Found" });
  try {
    const filepath = `./public/profileimages/${post.image}`;
    fs.unlinkSync(filepath);
    await Profiles.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Profile Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
