var defaultRooms;
var url = '../ressources/rooms.json';
var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200){
    defaultRooms = JSON.parse(xhr.responseText);
  }
};
export default defaultRooms;
xhr.send(null);

