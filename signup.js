// Mailing list form, shared by index.html, snowtap.html and unsubscribe.html.
// A form's data-action ("subscribe" or "unsubscribe") decides what it does,
// so pressing Enter on the unsubscribe page can never subscribe someone.
(function () {
  const scriptURL = "https://script.google.com/macros/s/AKfycbyCzpHJDvtD3Z0lcX9JFrafHW0ZCpam7fo5yX_Hk7bpQR_8zyrG25OuafcGzmi8EcI-/exec";

  const messages = {
    "Subscribed": "You're on the list. Thanks for reading!",
    "Unsubscribed": "You've been unsubscribed. Sorry to see you go!",
    "Email not found": "That email isn't on the list.",
    "Invalid email": "That doesn't look like a valid email address."
  };

  document.querySelectorAll("form.signup").forEach(function (form) {
    const emailInput = form.querySelector("input[name='email']");
    const actionInput = form.querySelector("input[name='action']");
    const button = form.querySelector("button[type='submit']");
    const status = form.querySelector(".form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      actionInput.value = form.dataset.action || "subscribe";
      button.disabled = true;
      status.textContent = "Sending…";

      fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then(function (res) { return res.text(); })
        .then(function (text) {
          const reply = text.trim();
          status.textContent = messages[reply] || reply;
          if (reply === "Subscribed" || reply === "Unsubscribed") emailInput.value = "";
        })
        .catch(function (err) {
          console.error("Signup error:", err);
          status.textContent = "Something went wrong. Please try again.";
        })
        .finally(function () { button.disabled = false; });
    });
  });
})();
