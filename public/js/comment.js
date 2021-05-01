$(".comment-modal").click(function () {
  let id = $(this).data("post-id");

  $(".submit-comment").attr("data-post-id", id);
});

async function newFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector("#newCommentBody").value.trim();
  const post_id = event.target.getAttribute("data-post-id");

  const response = await fetch(`/api/comments`, {
    method: "POST",
    body: JSON.stringify({
      comment_text,
      post_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(comment_text);
  console.log("post id:", post_id);

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".submit-comment")
  .addEventListener("click", newFormHandler);
