import { hide, show, getCommentBody, sendRequest } from "./helpers.js";

const posts = Array.from(document.querySelectorAll(".post"));
document.onreadystatechange = init;

function init(event) {
  resetPosts(event);
  Array.from(
    document.querySelectorAll(".cancel-create-comment-button")
  ).forEach(cancelButton => (cancelButton.onclick = resetPosts));
  Array.from(document.querySelectorAll(".create-comment-button")).forEach(
    createCommentButton => (createCommentButton.onclick = confirmCreateComment)
  );
}

function readyCreateComment(event) {
  resetPosts(event);
  const post = event.currentTarget.closest(".post");
  post.onclick = null;
  post.style.cursor = "initial";
  const newComment = post.querySelector(".new-comment");
  show(newComment);
  const newCommentTextArea = post.querySelector(".new-comment-textarea");
  newCommentTextArea.value = "";
  newCommentTextArea.focus();
}

function resetPosts(event) {
  event.stopPropagation();
  posts.forEach(post => {
    post.onclick = readyCreateComment;
    post.style.cursor = "pointer";
    hide(post.querySelector(".new-comment"));
  });
}

function confirmCreateComment() {
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
    post.querySelector(".cancel-create-comment-button").onclick = null;
    post.querySelector(".create-comment-button").onclick = null;
    Array.from(post.querySelectorAll(".delete-comment-button")).forEach(
      deleteCommentButton => (deleteCommentButton.onclick = null)
    );
  });
}
