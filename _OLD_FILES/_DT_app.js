(function() {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC-GOrUlVPWlJUK2PfFQAdol2yaEKkm0oE",
    authDomain: "moody-drinks.firebaseapp.com",
    databaseURL: "https://moody-drinks.firebaseio.com",
    projectId: "moody-drinks",
    storageBucket: "moody-drinks.appspot.com",
    messagingSenderId: "97317353672",
    appId: "1:97317353672:web:490d5ee3ac7429f6980dfd",
    measurementId: "G-8T4VP4G146"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Get element
  const preObject = document.getElementById('object');
  const ulList = document.getElementById('list');
  // Create reference
  const dbRefObject = firebase.database().ref().child('object');
  const dbRefList = dbRefObject.child('hobbies');
  

  // Sync object changes
  dbRefObject.on('value', snap => {
    preObject.innerText = JSON.stringify(snap.val(), null, 3);
  });

  // Sync list changes
  dbRefList.on('child_added', snap => {
    const li = document.createElement('li');
    li.innerText = snap.val();
    li.id = snap.key;
    ulList.appendChild(li);
  });

  dbRefList.on('child_changed', snap => {
    
    const liChanged = document.getElementById(snap.key);
    liChanged.innerText = snap.val();

  });

  dbRefList.on('child_removed', snap => {
    
    const liRemoved = document.getElementById(snap.key);
    liRemoved.remove();

  })


}());