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

document
  .querySelector("#newPost-btn")
  .addEventListener("click", newPostFormHandler);

document
  .querySelector("#delete-btn")
  .addEventListener("click", delButtonHandler);
