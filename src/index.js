let rootEl = document.querySelector('#root')
let userInfo = []
let userComments = []
let currentUser = null

document.body.append(rootEl)

function createHeader(users) {
  let headerEl = document.createElement('header')
  headerEl.setAttribute("class", "main-header")

  let wrapperEl = document.createElement('div')
  wrapperEl.setAttribute("class", "wrapper")

  for (const user of users) {
    let chipEl = document.createElement('div')
    chipEl.classList.add("chip")

    let avatarEl = document.createElement('div')
    avatarEl.classList.add("avatar-small")
    console.log(avatarEl)

    let headerImgEl = document.createElement('img')
    headerImgEl.setAttribute("src", user.avatar)

    let profileName = document.createElement('span')
    profileName.innerText = user.username

    chipEl.addEventListener("click", function () {
      const currentChipEl = document.querySelector(".active");
      if (currentChipEl !== null) {
        currentChipEl.classList.remove("active");
      }
      chipEl.classList.add("class", "active")
      currentUser = user.id


    });

    wrapperEl.append(chipEl)
    chipEl.append(avatarEl, profileName)
    avatarEl.append(headerImgEl)
  }


  rootEl.prepend(headerEl)
  headerEl.append(wrapperEl)

}

function createMain(users) {
  let mainEl = document.createElement('main')
  mainEl.setAttribute("class", "wrapper")
  rootEl.append(mainEl)
  createPostForm()
  previewLoadingState(users)
}


function createPostForm() {

  let mainEl = document.querySelector('main')

  let createPostEl = document.createElement('section')
  createPostEl.setAttribute("class", "create-post-section")

  let formEl = document.createElement('form')
  formEl.setAttribute("id", "create-post-form")

  let h2El = document.createElement('h2')
  h2El.innerText = "Create a post"


  let imageLabelEl = document.createElement('label')
  imageLabelEl.innerText = "Image"

  let imageInputEl = document.createElement('input')
  imageInputEl.setAttribute("id", "image")
  imageInputEl.setAttribute("type", "text")
  imageInputEl.setAttribute("name", "image")


  let titleLabelEl = document.createElement('label')
  titleLabelEl.innerText = "Title"

  let titleInputEl = document.createElement('input')
  titleInputEl.setAttribute("id", "title")
  titleInputEl.setAttribute("type", "text")
  titleInputEl.setAttribute("name", "title")


  let commentLabelEl = document.createElement('label')
  commentLabelEl.innerText = "Comment"

  let commentInputEl = document.createElement('textarea')
  commentInputEl.setAttribute("id", "comment")
  commentInputEl.setAttribute("rows", "2")
  commentInputEl.setAttribute("columns", "30")
  commentInputEl.setAttribute("name", "content")

  let actionBtnEl = document.createElement('div')
  actionBtnEl.setAttribute("class", "action-btns")

  let previewBtn = document.createElement('button')
  previewBtn.setAttribute("id", "preview-btn")
  previewBtn.setAttribute("type", "button")
  previewBtn.innerText = "Preview"

  previewBtn.addEventListener("click", function (event) {
    event.preventDefault();
    if (currentUser === null) {
      alert("Sign in first");
      return;
    } else {
      const previewPost = {
        title: formEl.title.value,
        content: formEl.content.value,
        image: formEl.image.value
      }
      createPreview(previewPost)
    }
  })


  let submitBtn = document.createElement('button')
  submitBtn.setAttribute("type", "submit")
  submitBtn.innerText = "Post"

  formEl.addEventListener("submit", function (event) {
    event.preventDefault();

    let image = document.getElementById('image').value
    let title = document.getElementById('title').value
    let comment = document.getElementById('comment').value
    addToFeed(image, title, comment)
  })
  mainEl.append(createPostEl)
  createPostEl.append(formEl)
  formEl.append(h2El, imageLabelEl, imageInputEl, titleLabelEl, titleInputEl, commentLabelEl, commentInputEl, actionBtnEl)
  actionBtnEl.append(previewBtn, submitBtn)
}

function addToFeed(image, title, comment) {
  fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      content: comment,
      image: image,
      userId: currentUser
    })
  })
    .then(function (resp) {
      return resp.json();
    })

}

function createPreview(previewPost) {
  let post = document.querySelector(".post")
  console.log(post)
  let avatar = document.querySelector(".avatar-container")
  console.log(avatar)
  let chip = document.querySelector(".preview-chip")
  console.log(chip)


  console.log(previewPost)
  const user = userInfo.find(function (user) {
    return user.id === currentUser;
  })

  let avatarImage = document.querySelector(".avatar-image").src = user.avatar

  let avatarName = document.querySelector(".chip-name")
  avatarName.innerText = user.username

  chip.append(avatar, avatarName)
  avatar.append(avatarImage)

  let postImageDiv = document.querySelector(".post--image")
  postImageDiv.classList.remove("loading-state")
  let postImage = document.createElement('img')
  postImage.setAttribute("src", previewPost.image)
  postImage.setAttribute("class", "preview-image")

  let previewTitle = document.querySelector(".previewTitle")
  previewTitle.classList.remove("loading-state")
  let previewTitleEl = document.createElement('h2')
  previewTitleEl.innerText = previewPost.title

  let previewComment = document.querySelector(".previewComment")
  previewComment.classList.remove("loading-state")
  let previewCommentEl = document.createElement('p')
  previewCommentEl.innerText = previewPost.content


  post.append(postImage, previewTitleEl, previewCommentEl)

}

function previewLoadingState(userInfo) {

  let postSection = document.querySelector('.create-post-section')

  let post = document.createElement('div')
  post.setAttribute("class", "post")

  let div = document.createElement('div')
  div.classList.add("chip", "active", "preview-chip")

  let avatar = document.createElement('div')
  avatar.classList.add("avatar-small", "avatar-container")

  let image = document.createElement('img')
  image.setAttribute("src", "https://uploads5.wikiart.org/images/salvador-dali.jpg!Portrait.jpg")
  image.setAttribute("class", "avatar-image")


  let name = document.createElement('span')
  name.setAttribute("class", "chip-name")
  name.innerText = "Salvador Dali"


  let imagePreview = document.createElement('div')
  imagePreview.classList.add("post--image", "loading-state")

  let contentPreview = document.createElement('div')
  contentPreview.setAttribute("class", "post--content")

  let h2 = document.createElement('h2')
  h2.classList.add("previewTitle", "loading-state")

  let p = document.createElement('p')
  p.classList.add("previewComment", "loading-state")


  postSection.append(post)
  post.append(div, imagePreview, contentPreview)
  div.append(avatar)
  avatar.append(image, name)
  contentPreview.append(h2, p)


}
// FEED


function createFeed(posts, userInfo) {
  let mainEl = document.querySelector('main')

  let feedEl = document.createElement('section')
  feedEl.setAttribute("class", "feed")

  let stackEl = document.createElement('ul')
  stackEl.setAttribute("class", "stack")

  mainEl.append(feedEl)
  feedEl.append(stackEl)

  makePost(posts, userInfo)
}

function makePost(posts, usersInfo) {
  let list = document.querySelector('.stack')

  for (post of posts) {
    let userId = post.userId
    let postLiEl = document.createElement('li')
    postLiEl.classList.add("postLi", "post")

    let chip2 = document.createElement('div')
    chip2.classList.add("chip", "active", "singlePost")

    let postImageEl = document.createElement('div')
    postImageEl.setAttribute("class", "post--image")

    let postImage = document.createElement('img')
    postImage.setAttribute("src", post.image.src)

    let postContentEl = document.createElement('div')
    postContentEl.setAttribute("class", "post--content")

    let comment1 = document.createElement('h2')
    comment1.innerText = post.title

    let comment2 = document.createElement('p')
    comment2.innerText = post.content

    for (user of userInfo) {
      if (user.id === userId) {
        let avatarSmallEl = document.createElement('div')
        avatarSmallEl.setAttribute("class", "avatar-small")

        let profileImgEl = document.createElement('img')
        profileImgEl.setAttribute("src", user.avatar)

        let profileNameEl = document.createElement('span')
        profileNameEl.innerText = user.username

        chip2.append(avatarSmallEl, profileNameEl)
        avatarSmallEl.append(profileImgEl)
      }
    }
    list.append(postLiEl)
    postLiEl.append(chip2, postImageEl, postContentEl)
    postImageEl.append(postImage)
    postContentEl.append(comment1, comment2)

    getComments(postLiEl, post)
    makeLikes(postLiEl, post)
  }

}

function makeLikes(postLiEl, post) {

  let likeSectionEl = document.createElement('div')
  likeSectionEl.setAttribute("class", "likes-section")

  let likesEl = document.createElement('span')
  likesEl.setAttribute("class", "likes")
  likesEl.innerText = `${post.likes} likes `

  let likesBtnEl = document.createElement('button')
  likesBtnEl.setAttribute("class", "like-button")
  likesBtnEl.innerText = "♥"

  postLiEl.append(likeSectionEl)
  likeSectionEl.append(likesEl, likesBtnEl)

  likesBtnEl.addEventListener("click", function () {
    updateLikeCounter(post)
  })


}

function updateLikeCounter(post) {
  let updateLike = document.querySelector(".likes")
  post.likes++

  fetch(`http://localhost:3000/posts/${post.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ likes: post.likes })
  })

    .then(function (response) { return response.json() })
    .then(function (post) { updateLike.innerText = `${post.likes} likes` })

}



function makeComments(postEl, comments, usersInfo, post) {
  let postCommentsEl = document.createElement('div')
  postCommentsEl.setAttribute("class", "post--comments")

  let h3 = document.createElement('h3')
  h3.innerText = "Comments"

  postCommentsEl.append(h3)

  for (const comment of comments) {
    // iterate through comments
    //if comment.id matches post.id

    if (comment.postId === post.id) {

      let postCommentEl = document.createElement('div')
      postCommentEl.setAttribute("class", "post--comment")

      let commentp = document.createElement('p')
      commentp.innerText = comment.content

      postCommentEl.append(commentp)


      let picture = document.createElement('div')
      picture.setAttribute("class", "avatar-small")

      const user = usersInfo.find(function (user) {
        return user.id === comment.userId;
      })
      let pictureEl = document.createElement('img')
      pictureEl.setAttribute("src", user.avatar)

      postCommentEl.prepend(picture)
      postEl.append(postCommentsEl, postCommentEl)

      picture.append(pictureEl)
      postCommentsEl.append(postCommentEl)
    }




  }
  makeCommentForm(postEl, post)
}


function makeCommentForm(postEl, post) {
  let form = document.createElement('form')
  form.setAttribute("id", "create-comment-form")

  let commentLabel = document.createElement('label')
  commentLabel.innerText = "Add comment"

  let commentBox = document.createElement('input')
  commentBox.setAttribute("id", "comment")
  commentBox.setAttribute("class", "comment")
  commentBox.setAttribute("name", "comment")
  commentBox.setAttribute("type", "text")

  let commentBtn = document.createElement('button')
  commentBtn.setAttribute("type", "submit")
  commentBtn.innerText = "Comment"

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let comment = commentBox.value
    // document.getElementById('comment').value

    console.log(comment)
    addComment(comment, post)
  })

  function addComment(comment, post) {
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: commentBox.value,
        userId: currentUser,
        postId: post.id
      })
    })
      .then(function (resp) {
        return resp.json();
      })
  }


  postEl.append(form)
  form.append(commentLabel, commentBox, commentBtn)

}

function getUsers() {
  fetch("http://localhost:3000/users")
    .then(function (response) {
      return response.json()
    })
    .then(function (users) {
      userInfo = users
      createHeader(users)
      createMain(users)
    })
};

function getPosts() {
  fetch("http://localhost:3000/posts")
    .then(function (response) {
      return response.json()
    })
    .then(function (posts) {
      createFeed(posts, userInfo)
    })
};

function getComments(postLiEl, post) {
  fetch("http://localhost:3000/comments")
    .then(function (response) {
      return response.json()
    })
    .then(function (comments) {
      userComments = comments
      makeComments(postLiEl, comments, userInfo, post)
    })
};

getUsers()
getPosts()

