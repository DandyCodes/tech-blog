export function hide(element) {
  element.classList.add("is-hidden");
}

export function show(element) {
  element.classList.remove("is-hidden");
}

export function getPostBody(post) {
  const title = post.querySelector(".post-title-input").value.trim();
  const content = post.querySelector(".post-content-textarea").value.trim();
  body = JSON.stringify({
    title,
    content,
  });
  return body;
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
