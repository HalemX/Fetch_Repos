// Main Variables
let theInput = document.querySelector(".search__container input");
let getButton = document.querySelector(".search__container button");
let profileData = document.querySelector(".profile__container");

// Enable "Enter" on Input
theInput.addEventListener("keypress", function(event) {

  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector(".search__container button").click();
  }

});

getButton.onclick = function () {
  getProfile();
};

async function getUser() {
  try {
    const response = await axios.get(`https://api.github.com/users/${theInput.value}`);
    console.log(response.data);

    const profileInfo = document.createElement('div')
    profileInfo.classList.add('profile__info')
    profileData.append(profileInfo)

    const profileInfoDetails = document.createElement('div')
    profileInfoDetails.classList.add('profile__info__details')

    const profileInfoLink = document.createElement('div')
    profileInfoLink.classList.add('profile__info__link')

    profileInfo.append(profileInfoDetails, profileInfoLink)

    const profileInfoDetailsTop = document.createElement('div')
    profileInfoDetailsTop.classList.add('top')

    const profileInfoDetailsBottom = document.createElement('div')
    profileInfoDetailsBottom.classList.add('bottom')

    profileInfoDetails.append(profileInfoDetailsTop, profileInfoDetailsBottom)

    const topLeft = document.createElement('div')
    topLeft.classList.add('top__left')

    const topRight = document.createElement('div')
    topRight.classList.add('top__right')

    profileInfoDetailsTop.append(topLeft, topRight)

    const bottomLeft = document.createElement('div')
    bottomLeft.classList.add('bottom__left')

    const bottomRight = document.createElement('div')
    bottomRight.classList.add('bottom__right')

    profileInfoDetailsBottom.append(bottomLeft, bottomRight)

    const avatar = document.createElement('div')
    avatar.classList.add('avatar')

    const userInfo = document.createElement('div')
    userInfo.classList.add('username')

    topLeft.append(avatar, userInfo)

    const img = document.createElement('img')
    img.src = response.data.avatar_url
    avatar.append(img)

    const name = document.createElement('p')
    name.innerText = response.data.name

    const username = document.createElement('p')
    username.innerText = `@${response.data.login}`

    userInfo.append(name, username)

    const locationInfo = document.createElement('p')
    topRight.append(locationInfo)

    const location = document.createElement('span')
    location.innerText = response.data.location

    const locationIcon = document.createElement('span')
    locationInfo.append(locationIcon, location)

    const icon = document.createElement('img')
    icon.src = "./Assets/location.svg"
    locationIcon.append(icon)

    const bio = document.createElement('p')
    bio.innerText = "Bio"

    const bioDesc = document.createElement('p')
    bioDesc.innerText = response.data.bio == null ? "no bio" : response.data.bio

    bottomLeft.append(bio, bioDesc)

    const numOfRepo = document.createElement('p')
    numOfRepo.innerText = response.data.public_repos

    const numOfRepoText = document.createElement('p')
    numOfRepoText.innerText = "Project"

    bottomRight.append(numOfRepo, numOfRepoText)

    const link = document.createElement('a')
    link.innerText = "Open The Account"
    link.href = response.data.html_url
    profileInfoLink.append(link)

  } catch (error) {
    console.error(error);
  }
}

async function getRepos() {
  try {
    const response = await axios.get(`https://api.github.com/users/${theInput.value}/repos`);
    console.log(response.data)

    const profileRepos = document.createElement('div')
    profileRepos.classList.add('profile__repos')
    profileData.append(profileRepos)

    const repos = response.data

    repos.forEach(repo => {
      const repoContainer = document.createElement('div')
      repoContainer.classList.add('repo')

      const left = document.createElement('div')
      left.classList.add('left')

      const right = document.createElement('div')
      right.classList.add('right')

      repoContainer.append(left, right)

      const title = document.createElement('p')
      
      const desc = document.createElement('p')
      desc.innerText = repo.description == null ? "No Descriptoin" : repo.description

      const link = document.createElement('p')

      left.append(title, desc, link)

      const starts = document.createElement('p')
      const forks = document.createElement('p')

      right.append(starts, forks)

      const titleIcon = document.createElement('span')
      const titleIconImg = document.createElement('img')
      titleIconImg.src = "./Assets/Repo.svg"
      titleIcon.append(titleIconImg)

      const titleText = document.createElement('span')
      titleText.innerText = repo.name
      
      title.append(titleIcon, titleText)

      const linkText = document.createElement('a')
      linkText.href = repo.html_url
      linkText.innerText = "Open The Repo"

      const linkIcon = document.createElement('span')
      const linkIconImg = document.createElement('img')
      linkIconImg.src = "./Assets/Arrow.svg"
      linkIcon.append(linkIconImg)
      
      link.append(linkText, linkIcon)

      const starIcon = document.createElement('span')
      const starIconImg = document.createElement('img')
      starIconImg.src = "./Assets/Star.svg"
      starIcon.append(starIconImg)

      const starsNum = document.createElement('span')
      starsNum.innerText = repo.stargazers_count

      starts.append(starIcon, starsNum)

      const forkIcon = document.createElement('span')

      const forkIconImg = document.createElement('img')
      forkIconImg.src = "./Assets/Fork.svg"
      forkIcon.append(forkIconImg)

      const forksNum = document.createElement('span')
      forksNum.innerText = repo.forks

      forks.append(forkIcon, forksNum)

      profileRepos.append(repoContainer)

    });

  } catch (error) {
    console.error(error);
  }
}

async function getProfile() {
  if (theInput.value === "") {
    console.log("Enter a value")
  } else {
    profileData.innerHTML = ""
    getUser()
    getRepos()
  }
}