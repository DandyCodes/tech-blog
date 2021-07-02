import { hide, show, getPostBody, sendRequest } from "./helpers.js";

const posts = Array.from(document.querySelectorAll(".post"));
posts.forEach(post => (post.onclick = editPost));

const updateButtons = Array.from(document.querySelectorAll(".update-button"));
updateButtons.forEach(updateButton => (updateButton.onclick = updatePost));

const cancelButtons = Array.from(document.querySelectorAll(".cancel-button"));
cancelButtons.forEach(cancelButton => (cancelButton.onclick = cancelEditPost));

const deleteButtons = Array.from(document.querySelectorAll(".delete-button"));
deleteButtons.forEach(deleteButton => (deleteButton.onclick = deletePost));

function editPost(event) {
  event.stopPropagation();
  const post = event.currentTarget;
  readyEdit(post);
}

function readyEdit(post) {
  const postElements = getPostElements(post);
  hide(postElements.title);
  hide(postElements.content);
  show(postElements.titleInput);
  show(postElements.contentTextarea);
  show(postElements.updateButton);
  show(postElements.cancelButton);
  show(postElements.deleteButton);
  postElements.titleInput.value = postElements.title.textContent;
  postElements.contentTextarea.value = postElements.content.textContent;
  post.onclick = null;
}

function getPostElements(post) {
  const title = post.querySelector(".post-title");
  const content = post.querySelector(".post-content");
  const titleInput = post.querySelector(".post-title-input");
  const contentTextarea = post.querySelector(".post-content-textarea");
  const updateButton = post.querySelector(".update-button");
  const cancelButton = post.querySelector(".cancel-button");
  const deleteButton = post.querySelector(".delete-button");
  return {
    title,
    content,
    titleInput,
    contentTextarea,
    updateButton,
    cancelButton,
    deleteButton,
  };
}

function updatePost(event) {
  event.stopPropagation();
  const post = event.currentTarget.closest(".post");
  removeEventListeners(post);
  sendRequest(`/api/posts/${post.dataset.id}`, "PUT", getPostBody(post));
}

function removeEventListeners(post) {
  post.querySelector(".update-button").onclick = null;
  post.querySelector(".cancel-button").onclick = null;
  post.onclick = null;
}

function cancelEditPost(event) {
  event.stopPropagation();
  const post = event.currentTarget.closest(".post");
  unreadyEdit(post);
}

function unreadyEdit(post) {
  const postElements = getPostElements(post);
  show(postElements.title);
  show(postElements.content);
  hide(postElements.titleInput);
  hide(postElements.contentTextarea);
  hide(postElements.updateButton);
  hide(postElements.cancelButton);
  hide(postElements.deleteButton);
  post.onclick = editPost;
}

function deletePost(event) {
  event.stopPropagation();
  const post = event.currentTarget.closest(".post");
  removeEventListeners(post);
  sendRequest(`/api/posts/${post.dataset.id}`, "DELETE");
}
