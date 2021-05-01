async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#newpost-title").value.trim();
  const text = document.querySelector("#newpost-text").value.trim();

  const response = await fetch(`/api/posts`, {
    method: "POST",
    body: JSON.stringify({
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
  .querySelector("#newpost-submit")
  .addEventListener("click", newFormHandler);
