import { hide, show, getCommentBody, sendRequest } from "./helpers.js";

const posts = Array.from(document.querySelectorAll(".post"));
document.onreadystatechange = init;

function init(event) {
  resetPosts(event);
  Array.from(document.querySelectorAll(".close-comments-button")).forEach(
    closeButton => (closeButton.onclick = resetPosts)
  );
  Array.from(document.querySelectorAll(".create-comment-button")).forEach(
    createCommentButton => (createCommentButton.onclick = confirmCreateComment)
  );
  Array.from(document.querySelectorAll(".delete-comment-button")).forEach(
    deleteCommentButton => (deleteCommentButton.onclick = deleteComment)
  );
}

function resetPosts(event) {
  event.stopPropagation();
  posts.forEach(post => {
    post.onclick = showComments;
    post.style.cursor = "pointer";
    hide(post.querySelector(".comments"));
  });
}

function showComments(event) {
  resetPosts(event);
  const post = event.currentTarget.closest(".post");
  post.onclick = null;
  post.style.cursor = "initial";
  show(post.querySelector(".comments"));
  const newCommentTextArea = post.querySelector(".new-comment-textarea");
  newCommentTextArea.value = "";
  newCommentTextArea.focus();
}

function confirmCreateComment() {
  const loggedIn = document.querySelector("main").dataset.loggedIn;
  if (!loggedIn) {
    document.location.replace("/login");
  }
  const post = this.closest(".post");
  const body = getCommentBody(post);
  if (JSON.parse(body).content) {
    removeAllEventListeners();
    sendRequest(`/api/posts/${post.dataset.id}/`, "POST", getCommentBody(post));
  }
}

function removeAllEventListeners() {
  posts.forEach(post => {
    post.onclick = null;
    post.querySelector(".close-comments-button").onclick = null;
    post.querySelector(".create-comment-button").onclick = null;
    Array.from(post.querySelectorAll(".delete-comment-button")).forEach(
      deleteCommentButton => (deleteCommentButton.onclick = null)
    );
  });
}

function deleteComment() {
  const comment = this.closest(".comment");
  removeAllEventListeners();
  sendRequest(`/api/comments/${comment.dataset.id}`, "DELETE");
}
