export function hide(element) {
  element.classList.add("is-hidden");
}

export function show(element) {
  element.classList.remove("is-hidden");
}

export function getPostBody(post) {
  return JSON.stringify({
    title: post.querySelector(".post-title-input").value.trim(),
    content: post.querySelector(".post-content-textarea").value.trim(),
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
