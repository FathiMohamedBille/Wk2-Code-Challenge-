document.addEventListener('DOMContentLoaded', () => {
const itemInput = document.getElementById('itemInput');
const addItemButton = document.getElementById('addItem'); 
const clearListButton = document.getElementById('clearList');
const shoppingList = document.getElementById('shoppingList'); 
// Load items from local storage
 const storedItems = JSON.parse(localStorage.getItem('shoppingListItems')) || []; 
 storedItems.forEach(item => addItemToDOM(item.text,
 item.purchased));
 function addItemToDOM(text, 
purchased = false) {
 const listItem = document.createElement('li');
 const itemText = document.createElement('span');
 const editInput = document.createElement('input');
 itemText.textContent = text; editInput.type = 'text'; 
 editInput.value = text; editInput.style.display = 'none'; 
 listItem.appendChild(itemText); listItem.appendChild(editInput);
 if (purchased) { listItem.classList.add('purchased');
} 
listItem.addEventListener('click', () => { 
listItem.classList.toggle('purchased'); 
updateLocalStorage(); 
}); 
itemText.addEventListener('dblclick', () => {
 itemText.style.display = 'none';
editInput.style.display = 'inline'; 
editInput.focus(); }); 
editInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') {
 itemText.textContent = editInput.value; 
 itemText.style.display = 'inline'; 
 editInput.style.display = 'none'; 
 updateLocalStorage(); } });
  editInput.addEventListener('blur', () => {
 itemText.textContent = editInput.value;
 itemText.style.display = 'inline';
editInput.style.display = 'none';
updateLocalStorage(); 
});
shoppingList.appendChild(listItem); 
} 
function updateLocalStorage() {
const items = Array.from(shoppingList.children).map(item => ({ 
text: item.querySelector('span').textContent, 
purchased: item.classList.contains('purchased') 
}));
localStorage.setItem('shoppingListItems', JSON.stringify(items));
 }
addItemButton.addEventListener('click', () => { 
const itemText = itemInput.value.trim(); if (itemText !== '') {
 addItemToDOM(itemText); itemInput.value = ''; updateLocalStorage();
 }
 });
clearListButton.addEventListener('click', () => { 
shoppingList.innerHTML = '';
localStorage.removeItem('shoppingListItems'); 
});
itemInput.addEventListener('keypress', (e) => { 
if (e.key === 'Enter') { 
addItemButton.click(); 
} 
}); 
});