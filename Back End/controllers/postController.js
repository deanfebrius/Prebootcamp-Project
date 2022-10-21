import Posts from "../models/postModel.js";
import path from "path";
import fs from "fs";

export const getPosts = async(req,res) => {
    try {
        const response = await Posts.findAll();
        res.json(response);
    } catch(error) {
        console.log(error.message)

    }
}
export const getPostsById = async(req,res) => {
    try {
      const response = await Posts.findOne({
        where: {
            id : req.params.id
        }
      });
      res.json(response);
    } catch (error) {
      console.log(error.message);
    }
}
export const savePosts = (req,res) => {
    if(req.file === null) return res.status(400).json({msg: "No File Uploaded"})
    const username = req.body.username;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    const caption = req.body.title;

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Image"});
    if(fileSize > 5000000) return res.status(422).json({ msg: "File Size max 5MB" });

    file.mv(`./public/images/${fileName}`, async(err)=> {
        if(err) return res.status(500).json({msg: err.message})
        try {
            await Posts.create({username:username, image: fileName, url: url, caption:caption });
            res.status(201).json({msg:"Post Create Succeed"})
        } catch(error) {
            console.log(error.message)
        }
    })
}
export const updatePosts = async(req,res) => {
    const post = await Posts.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post) return res.status(404).json({ msg: "No Post Found" });
    let fileName = "";
    if(req.files === null) {
        fileName = Posts.image;
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

           const filepath = `./public/images/${post.image}`;
           fs.unlinkSync(filepath);

           file.mv(`./public/images/${fileName}`, (err) => {
             if (err) return res.status(500).json({ msg: err.message });
           });
    }
    const caption = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    try {
        await Posts.update({caption: caption, image:fileName, url: url},{
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Product Updated"})
    } catch(error) {
        console.log(error.message)
    }

}
export const deletePosts = async(req,res) => {
    const post = await Posts.findOne({
      where: {
        id: req.params.id,
      },
    });
    if(!post) return res.status(404).json({msg:"No Post Found"})
    try {
        const filepath = `./public/images/${post.image}`;
        fs.unlinkSync(filepath);
        await Posts.destroy({
          where: {
            id: req.params.id,
          }
        });
        res.status(200).json({msg:"Post Deleted"})
    } catch(error) {
        console.log(error.message)
    }
}