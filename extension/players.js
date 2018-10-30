function watchViewChanges (handler) {
  const targetNode = document.getElementsByClassName('view-root')[0];
  const config = { attributes: false, childList: true, subtree: true }
  const observer = new MutationObserver(handler)
  observer.observe(targetNode, config)
}

function addPlayerIDS () {
  const players = document.getElementsByClassName('listFUTItem')
  console.log('asd', players)
}

function handleViewChange () {
  addPlayerIDS()
}

window.addEventListener('load', loadEvent => {
  watchViewChanges(handleViewChange)
});
