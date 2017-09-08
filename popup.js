function clickHandler(e) {
   chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
}

// A function to use as callback
function doStuffWithDom(domContent) {
    console.log('I received the following DOM content:\n' + domContent);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('activate').addEventListener('click', clickHandler);
})
