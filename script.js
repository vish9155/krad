const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  const target = parseFloat(counter.dataset.target);
  const isDecimal = counter.dataset.target.includes(".");
  const duration = 10000; // 10 seconds
  let startTime = null;

  function updateCounter(timestamp) {
    if (!startTime) startTime = timestamp;

    const progress = Math.min((timestamp - startTime) / duration, 1);
    const current = target * progress;

    counter.innerText = isDecimal
      ? current.toFixed(1)
      : Math.floor(current).toLocaleString();

    if (progress < 1 ) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = isDecimal
        ? target
        : target.toLocaleString();
    }
  }

  requestAnimationFrame(updateCounter);
});


(function () {
  emailjs.init("4GJ1H-bVWKnEbg0cR");
})();

document.getElementById("queryForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_u40pegi",  
    "template_79xbm1z",  
    this
  )
  .then(() => {
    document.getElementById("status").innerText = " Message sent successfully!";
    this.reset();
  })
  .catch(() => {
    document.getElementById("status").innerText = " Failed to send message.";
  });
});
