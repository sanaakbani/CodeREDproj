

let googleUserId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      
      getProfile(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html';
    };
  });
};

const getProfile = (userId) => {
    console.log("logged in as user " + userId);
    const dbRef = firebase.database().ref(`users/${userId}`);
    dbRef.on('value', (snapshot) => {
        renderData(snapshot.val());
    })
  };

  const renderData = (data) => {
    const destination = document.querySelector('#app');
    destination.innerHTML = "";
    for (let key in data) {
        const profile = data[key];
        //adds text on to the string already
        createCard(profile, key).then((e) => {
          destination.innerHTML+=e;
        });
    }
  };

  const createCard = (profile, profileId) => {
      return `<div class="column is-one-quarter">
                  <div class="card" id="noteId"> 
                      <header class="card-header"> 
                          <p class="card-header-title"> 
                              ${profile.name} 
                          </p> 
                      </header> 
                      <div class="card-content"> 
                          <div class="content">
                              
                              <p>
                              <strong>Upcoming Birthday</strong>: 
                              <div id="${profileId}">
                              ${profile.birthday}
                              </div>
                              </p> 
                          </div>
                          
                          <div class = "card-footer mt-4">
  
                              <a href="#"
                                class= "card-footer-item "
                                onclick="deleteProfile('${profileId}')">
                                  Delete</a>
                                  
                          </div>
  
  
                      </div> 
                  </div>
              </div>`;
    
  };

  const deleteProfile= (profileId) => {
    
    const profileToDelete = firebase.database().ref(`users/${googleUserId}/${profileId}`);
    console.log("function worked");
     profileToDelete.remove();

}

const createProfile = () => {

    let dbRef = firebase.database().ref(`users/${googleUserId}`);
    dbRef.push({
        name: document.querySelector("#name").value,
        birthday: document.querySelector("#number").value,
    }).then(() => {
  // 3. Clear the form so that add a new one
    closeModal();
    window.location = "contacts.html"
    });

};

const addFriendModal = () => {
  const modal = document.querySelector("#addFriendModal");
  modal.classList.add("is-active");

}

const closeModal = () => {
    const modal = document.querySelector("#addFriendModal");
    modal.classList.remove("is-active");
    document.querySelector("#name").value = "";
    uploadedFile = "";
    document.querySelector("#number").value = "";
}
