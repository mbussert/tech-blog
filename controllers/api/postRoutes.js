const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, (req, res) => {
  Post.create({
    title: req.body.title,
    text: req.body.text,
    user_id: req.session.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      text: req.body.text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const post = postData.get({ plain: true });

    console.log(post);
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
