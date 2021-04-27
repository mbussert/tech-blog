const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get("/post/:id", async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["username"],
//         },
//       ],
//     });

//     const post = postData.get({ plain: true });

//     res.json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//   try {
//     // Get all posts and JOIN with user data
//     const postData = await Post.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ["username", "email"],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const blogposts = postData.map((post) => post.get({ plain: true }));

//     // console.log("Blogposts Variable:", blogposts);

//     // Pass serialized data and session flag into template
//     res.send({
//       blogposts,
//     });
//     console.log("new one", blogposts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    console.log("Delete ran on:", postData);

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
