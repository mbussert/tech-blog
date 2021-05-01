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
// $(document).ready(function () {
$(".edit-modal").click(function () {
  let id = $(this).data("id");

  $.ajax({
    url: `/post/${id}`,
    type: "get",
    success: function (response) {
      // Replace title and text body in modal
      $("#newPostTitle").val(response.title);
      $("#newPostBody").val(response.text);

      // Open modal
      $("#staticBackdropUpdatePost").modal("show");

      // Set data-id of button
      $(".update-btn").attr("data-id", id);
    },
  });
});



// });

// $(".update-btn").click(function () {
//   let id = $(this).data("id");
//   const title = $("#newPostTitle").val();
//   const text = $("#newPostBody").val();

//   console.log(title);
//   console.log(text);
//   console.log(id);

//   let updatedPost = {
//     id: `${id}`,
//     title: `${title}`,
//     text: `${text}`,
//   };

//   let dataJson = JSON.stringify(updatedPost);

//   $.ajax({
//     url: `/api/posts/${id}`,
//     type: "put",
//     dataType: "json",
//     contentType: "application/json",
//     data: dataJson,
//     success: function () {
//       document.location.replace("/profile");
//     },
//     error: function () {
//       // document.location.replace("/profile");
//     },
//   });
// });

async function editFormHandler(event) {
  event.preventDefault();

  const title = $("#newPostTitle").val();
  const text = $("#newPostBody").val();
  const id = $(this).data("id");

  console.log(title);
  console.log(text);
  console.log(id);

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      id: id,
      title,
      text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/profile");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".update-btn")
  .addEventListener("click", editFormHandler);

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
