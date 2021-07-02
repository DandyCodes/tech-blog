export function hide(element) {
  element.classList.add("is-hidden");
}

export function show(element) {
  element.classList.remove("is-hidden");
}

export function getPostBody(post) {
  return JSON.stringify({
    title: post.querySelector(".edit-title-input").value.trim(),
    content: post.querySelector(".edit-content-textarea").value.trim(),
  });
}

export function getCommentBody(post) {
  return JSON.stringify({
    content: post.querySelector(".new-comment-textarea").value.trim(),
  });
}

export async function sendRequest(url, requestMethod, body) {
  try {
    await fetch(url, {
      method: requestMethod,
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    location.reload();
  } catch (err) {
    console.log(err);
  }
}
