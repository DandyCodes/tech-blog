import { hide, show } from "./helpers.js";

const posts = Array.from(document.querySelectorAll(".post"));
posts.forEach(post => (post.onclick = editPost));

const updateButtons = Array.from(document.querySelectorAll(".update-button"));
updateButtons.forEach(updateButton => (updateButton.onclick = updatePost));

const cancelButtons = Array.from(document.querySelectorAll(".cancel-button"));
cancelButtons.forEach(cancelButton => (cancelButton.onclick = cancelEditPost));

function editPost(event) {
  const post = event.currentTarget;
  showEditElements(post);
  post.onclick = null;
}

function showEditElements(post) {
  const title = post.querySelector(".post-title");
  const content = post.querySelector(".post-content");
  const titleInput = post.querySelector(".post-title-input");
  const contentTextarea = post.querySelector(".post-content-textarea");
  const updateButton = post.querySelector(".update-button");
  const cancelButton = post.querySelector(".cancel-button");
  hide(title);
  hide(content);
  show(titleInput);
  show(contentTextarea);
  show(updateButton);
  show(cancelButton);
  titleInput.value = title.textContent;
  contentTextarea.value = content.textContent;
}

async function updatePost(event) {
  cancelEditPost(event);
}

function hideEditElements(post) {
  const title = post.querySelector(".post-title");
  const content = post.querySelector(".post-content");
  const titleInput = post.querySelector(".post-title-input");
  const contentTextarea = post.querySelector(".post-content-textarea");
  const updateButton = post.querySelector(".update-button");
  const cancelButton = post.querySelector(".cancel-button");
  show(title);
  show(content);
  hide(titleInput);
  hide(contentTextarea);
  hide(updateButton);
  hide(cancelButton);
}

function cancelEditPost(event) {
  event.stopPropagation();
  const post = event.currentTarget.closest(".post");
  hideEditElements(post);
  post.onclick = editPost;
}
