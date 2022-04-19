// The data also used for sorting algoritme

//Fetching data from API (Application Programming Interface)
async function postData(nr) {
  const response = await fetch("/api/routes", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      route: nr,
    }),
  })

  const data = await response.text()
  const appendArray = await cleanData(data)
  removeAllChildNodes()
  appendNode(appendArray)
}

// Data Handler
function cleanData(data) {
  const cleanArray = []
  data.split('"').forEach((index) => {
    let duplicated = cleanArray.includes(index)
    if (index != "[" && index != "]" && index != "," && !duplicated) {
      cleanArray.push(index)
    }
  })
  return cleanArray
}

//Adds the hole route to the DOM (Document Object Model)
function appendNode(nodeList) {
  const addressList = document.querySelector("#address-list")

  //Create new li element and append
  nodeList.forEach((item) => {
    let li = document.createElement("li")
    li.classList = "list-item"
    // li.setAttribute("draggable", "true")
    li.append(item)
    ul.appendChild(li)
  })
}

function removeAllChildNodes() {
  const nodeList = document.querySelectorAll("#address-list .list-item")
  nodeList.forEach((element) => {
    element.remove()
  })
}

function quickSortRoute(data) {
  const domList = document.querySelectorAll("#address-list .list-item")

  // Sorting Elements
  data
    .then((lookupArray) => {
      const nodeArray = []
      const cloneNodes = []
      // Adding number attribute to dom elemnts & pushing elemtns to nodeArray
      for (let i = 0; i < domList.length; i++) {
        let currentNode = domList[i].textContent.split(",")[0] //Checking node of place

        domList[i].setAttribute("number", lookupArray.indexOf(currentNode))
        nodeArray.push(domList[i])
      }

      //QuickSorting elemnts in array
      nodeArray.sort(
        (a, b) => a.attributes[2].nodeValue - b.attributes[2].nodeValue
      )

      // Cloning textContent of elements to cloneNodes
      nodeArray.forEach((item) => {
        cloneNodes.push(item.textContent)
      })

      // changing DOM elemnts textContent
      for (let index = 0; index < domList.length; index++) {
        domList[index].textContent = cloneNodes[index]
        domList[index].removeAttribute("number")
      }
    })
    .catch((error) => {
      throw error
    })
}
