import { hide, show } from "./helpers.js";

const posts = Array.from(document.querySelectorAll(".post"));
posts.forEach(post => (post.onclick = readyCreateComment));

const cancelCreateCommentButtons = Array.from(
  document.querySelectorAll(".cancel-create-comment-button")
);
cancelCreateCommentButtons.forEach(
  cancelCreateCommentButton =>
    (cancelCreateCommentButton.onclick = hideNewComments)
);

function readyCreateComment(event) {
  hideNewComments(event);
  const post = event.currentTarget.closest(".post");
  const newComment = post.querySelector(".new-comment");
  show(newComment);
  const newCommentTextArea = post.querySelector(".new-comment-textarea");
  newCommentTextArea.value = "";
  newCommentTextArea.focus();
}

function hideNewComments(event) {
  event.stopPropagation();
  const newComments = Array.from(document.querySelectorAll(".new-comment"));
  newComments.forEach(newComment => {
    hide(newComment);
  });
}
