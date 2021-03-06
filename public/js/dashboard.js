import { hide, show, getPostBody, sendRequest } from "./helpers.js";

const newPost = document.querySelector("#new-post");
const posts = Array.from(document.querySelectorAll(".post"));
document.onreadystatechange = init;

function init(event) {
  resetPosts(event);
  document.querySelector("#create-button").onclick = readyCreate;
  document.querySelector("#post-button").onclick = confirmCreatePost;
  Array.from(document.querySelectorAll(".cancel-button")).forEach(
    cancelButton => (cancelButton.onclick = resetPosts)
  );
  Array.from(document.querySelectorAll(".update-button")).forEach(
    updateButton => (updateButton.onclick = updatePost)
  );
  Array.from(document.querySelectorAll(".delete-button")).forEach(
    deleteButton => (deleteButton.onclick = deletePost)
  );
}

function resetPosts(event) {
  event.stopPropagation();
  hide(newPost);
  posts.forEach(post => {
    hide(post.querySelector(".edit-post-section"));
    show(post.querySelector(".current-post-section"));
    post.onclick = editPost;
    post.style.cursor = "pointer";
  });
}

function readyCreate(event) {
  resetPosts(event);
  show(newPost);
  document.querySelector("#create-content-textarea").value = "";
  const createTitleInput = document.querySelector("#create-title-input");
  createTitleInput.value = "";
  createTitleInput.focus();
}

function confirmCreatePost() {
  const body = getPostBody(newPost);
  if (JSON.parse(body).title && JSON.parse(body).content) {
    sendRequest(`/api/posts`, "POST", body);
  }
}

function editPost(event) {
  resetPosts(event);
  const post = event.currentTarget;
  post.onclick = null;
  post.style.cursor = "initial";
  const currentTitle = post.querySelector(".post-title");
  const editTitleInput = post.querySelector(".edit-title-input");
  editTitleInput.value = currentTitle.textContent;
  editTitleInput.focus();
  const currentContent = post.querySelector(".post-content");
  const editContentTextarea = post.querySelector(".edit-content-textarea");
  editContentTextarea.value = currentContent.textContent;
  hide(post.querySelector(".current-post-section"));
  show(post.querySelector(".edit-post-section"));
}

function updatePost() {
  const post = this.closest(".post");
  const body = getPostBody(post);
  if (JSON.parse(body).title && JSON.parse(body).content) {
    removeAllEventListeners();
    sendRequest(`/api/posts/${post.dataset.id}`, "PUT", body);
  }
}

function removeAllEventListeners() {
  posts.forEach(post => {
    post.onclick = null;
    post.querySelector(".update-button").onclick = null;
    post.querySelector(".cancel-button").onclick = null;
    post.querySelector(".delete-button").onclick = null;
  });
}

function deletePost() {
  const post = this.closest(".post");
  removeAllEventListeners();
  sendRequest(`/api/posts/${post.dataset.id}`, "DELETE");
}
