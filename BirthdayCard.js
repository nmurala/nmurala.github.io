function hideimg() {
  document.getElementById("img1").style.display="none";
  //document.getElementById("img2").style.display="none";
}
function makeMyCard() {
  var heading = "Happy Birthday Dearest ";

  if (document.getElementById("relation").value == "None") {
    window.alert("Choose a relation");
    return 0;
  }
  else if (document.getElementById("name").value.length < 1) {
    window.alert("Enter a name");
    return 0;
  }
  else if (document.getElementById("message").value.length < 1) {
    window.alert("Enter a message");
    return 0;
  }
  else {
  heading += document.getElementById("relation").value;
  //window.alert(heading);
  var name1 = document.getElementById("name").value;
  name1 = "Dear   " + name1 + ",";
  //window.alert(name1);
  var message1 = document.getElementById("message").value;

  document.getElementById("page1").style.display="none"; //hide
  document.getElementById("page2").style.display=""; //show
  //document.body.style.backgroundColor="red";
  document.body.style.backgroundImage='url(bb1.jpg)';
  document.getElementById("img1").style.display="";
  //document.getElementById("img2").style.display="";


  document.getElementById("mhead_l").innerHTML = heading;
  document.getElementById("message_n").innerHTML = name1;
  document.getElementById("message_l").innerHTML = message1;
  }
}
