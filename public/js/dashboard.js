import { hide, show, getPostBody, sendRequest } from "./helpers.js";

const constructButton = document.querySelector("#construct-button");
constructButton.onclick = constructPost;

const createButton = document.querySelector("#create-button");
createButton.onclick = createPost;

const cancelCreateButton = document.querySelector("#cancel-create-button");
cancelCreateButton.onclick = cancelCreatePost;

const posts = Array.from(document.querySelectorAll(".post"));
posts.forEach(post => (post.onclick = editPost));

const updateButtons = Array.from(document.querySelectorAll(".update-button"));
updateButtons.forEach(updateButton => (updateButton.onclick = updatePost));

const cancelEditButtons = Array.from(
  document.querySelectorAll(".cancel-edit-button")
);
cancelEditButtons.forEach(
  cancelEditButton => (cancelEditButton.onclick = cancelEditPost)
);

const deleteButtons = Array.from(document.querySelectorAll(".delete-button"));
deleteButtons.forEach(deleteButton => (deleteButton.onclick = deletePost));

const newPost = document.querySelector("#new-post");

function constructPost() {
  show(newPost);
}

function createPost() {
  sendRequest(`/api/posts`, "POST", getPostBody(newPost));
}

function cancelCreatePost() {
  hide(newPost);
}

function editPost(event) {
  event.stopPropagation();
  const post = event.currentTarget;
  readyEdit(getPostElements(post));
}

function readyEdit(postElements) {
  hide(postElements.title);
  hide(postElements.content);
  show(postElements.titleInput);
  show(postElements.contentTextarea);
  show(postElements.updateButton);
  show(postElements.cancelEditButton);
  show(postElements.deleteButton);
  postElements.titleInput.value = postElements.title.textContent;
  postElements.contentTextarea.value = postElements.content.textContent;
  posts.forEach(post => (post.onclick = null));
  constructButton.onclick = null;
}

function getPostElements(post) {
  return {
    title: post.querySelector(".post-title"),
    content: post.querySelector(".post-content"),
    titleInput: post.querySelector(".post-title-input"),
    contentTextarea: post.querySelector(".post-content-textarea"),
    updateButton: post.querySelector(".update-button"),
    cancelEditButton: post.querySelector(".cancel-edit-button"),
    deleteButton: post.querySelector(".delete-button"),
  };
}

function updatePost(event) {
  event.stopPropagation();
  const post = event.currentTarget.closest(".post");
  post.querySelector(".update-button").onclick = null;
  post.querySelector(".cancel-edit-button").onclick = null;
  post.onclick = null;
  sendRequest(`/api/posts/${post.dataset.id}`, "PUT", getPostBody(post));
}

function cancelEditPost(event) {
  event.stopPropagation();
  const post = event.currentTarget.closest(".post");
  unreadyEdit(getPostElements(post));
}

function unreadyEdit(postElements) {
  show(postElements.title);
  show(postElements.content);
  hide(postElements.titleInput);
  hide(postElements.contentTextarea);
  hide(postElements.updateButton);
  hide(postElements.cancelEditButton);
  hide(postElements.deleteButton);
  posts.forEach(post => (post.onclick = editPost));
  constructButton.onclick = constructPost;
}

function deletePost(event) {
  event.stopPropagation();
  const post = event.currentTarget.closest(".post");
  removeEventListeners(post);
  sendRequest(`/api/posts/${post.dataset.id}`, "DELETE");
}
