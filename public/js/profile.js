// const { response } = require("express");

const newPostFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#newpost_username").value.trim();
  const newpost_title = document.querySelector("#newpost-title").value.trim();
  const newpost_text = document.querySelector("#newpost-text").value.trim();

  if (name && newpost_title && newpost_text) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ name, newpost_title, newpost_text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create post");
    }
  }
};

const delButtonHandler = async (event) => {
  event.preventDefault();
  console.log("Delete button clicked");

  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete post.");
    }
  }
};

// const editButtonHandler = async (event) => {
//   event.preventDefault();

//   console.log("edit clicked");

//   if (event.target.hasAttribute("data-id")) {
//     const id = event.target.getAttribute("data-id");

//     const response = await fetch(`api/posts/${id}`, {
//       method: "GET",
//     });

//     if (response.ok) {
//       document.location.replace("/profile");
//     } else {
//       alert("Failed to edit post.");
//     }
//   }
// };

// Function to auto fill contents of Edit modal
$(document).ready(function () {
  $(".edit-modal").click(function () {
    const id = $(this).data("id");

    $.ajax({
      url: `/post/${id}`,
      type: "get",
      success: function (response) {
        // Replace title and text body in modal
        $("#newPostTitle").val(response.title);
        $("#newPostBody").val(response.text);

        // Open modal
        $("#staticBackdropUpdatePost").modal("show");
      },
    });
  });
});

// Function to delete a post via dashboard
$(document).ready(function () {
  $(".delete-btn").click(function () {
    const id = $(this).data("id");

    console.log("clicked");

    $.ajax({
      url: `/api/posts/${id}`,
      type: "delete",
      success: function () {
        document.location.replace("/profile");
      },
    });
  });
});

document
  .querySelector("#newPost-btn")
  .addEventListener("click", newPostFormHandler);
