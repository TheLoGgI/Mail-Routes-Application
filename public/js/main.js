const submit = document.querySelector("form input[type='submit']");
const input = document.querySelector("#addressInput");
const ul = document.querySelector("#address-list");
// const sortBtn = document.querySelector('[data-sort-btn]')
let listItems = document.querySelectorAll("ul li")


// sortBtn.addEventListener('click', e => {
//   quickSortRoute(responeData)
// })

// Event triggers on submit
submit.addEventListener('click', e => {
  e.preventDefault()

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  //Create new li element and append
  let li = document.createElement("li");
  li.classList = "list-item"
  li.setAttribute("draggable", "true")
  li.append(capitalize(input.value) || "Your Home Address");
  ul.prepend(li)

})

// interchangeable route Lists
const routeList = document.querySelector('.route-nav')

routeList.addEventListener('click', e => {
  if (e.target.textContent) {
    postData(e.target.textContent.split(' ')[1])
  }
  //Remove the "active" class from all
  const routeItems = document.querySelectorAll('.route-item')
  console.log(routeItems);
  for (active of routeItems) {
    active.classList.remove('btn-success')
  }

  //Change Header
  const formHeader = document.querySelector('.form-content-titel')

  // add the "active" class to current
  if (e.target.classList.contains('route-item')) {
    formHeader.textContent = e.target.textContent
    e.target.classList.add('btn-success')
  } else {
    routeItems[0].classList.add('btn-success')
  }

})

// remove and display asidebar .route-list
const element = document.querySelector('.route-nav')


document.querySelector('.fas').addEventListener('click', e => {
  element.classList.toggle("invisible");
})
