let googleUserId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html';
    };
  });
};

function goPython() {
  Email.send({
    Host: "smtp.gmail.com",
    Username : "conocosafe101@gmail.com",
    Password : "conocosafe101",
    To : '8327637111@tmomail.net',
    From : "conocosafe101@gmail.com",
    Subject : "ConocoSafe - Assistance is needed!",
    Body: "",
    }).then(
      message => alert("Help has been successfully requested!")
    );
}
