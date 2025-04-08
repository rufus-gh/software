const passwordInput = document.getElementById("password");
        const progressBar = document.getElementById("progressBar");

        // Criteria elements
        const lengthReq = document.getElementById("length");
        const upperReq = document.getElementById("uppercase");
        const lowerReq = document.getElementById("lowercase");
        const numberReq = document.getElementById("number");
        const specialReq = document.getElementById("special");

        function updateProgressBar() {
            let password = passwordInput.value;
            let score = 0;

            // Check each condition
            if (password.length >= 4) {
                score += 20;
                lengthReq.classList.add("valid");
                lengthReq.classList.remove("invalid");
            } else {
                lengthReq.classList.add("invalid");
                lengthReq.classList.remove("valid");
            }

            if (/[A-Z]/.test(password)) {
                score += 20;
                upperReq.classList.add("valid");
                upperReq.classList.remove("invalid");
            } else {
                upperReq.classList.add("invalid");
                upperReq.classList.remove("valid");
            }

            if (/[a-z]/.test(password)) {
                score += 20;
                lowerReq.classList.add("valid");
                lowerReq.classList.remove("invalid");
            } else {
                lowerReq.classList.add("invalid");
                lowerReq.classList.remove("valid");
            }

            if (/\d/.test(password)) {
                score += 20;
                numberReq.classList.add("valid");
                numberReq.classList.remove("invalid");
            } else {
                numberReq.classList.add("invalid");
                numberReq.classList.remove("valid");
            }

            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                score += 20;
                specialReq.classList.add("valid");
                specialReq.classList.remove("invalid");
            } else {
                specialReq.classList.add("invalid");
                specialReq.classList.remove("valid");
            }

            // Update progress bar
            progressBar.value = score;
            progressBar.classList.remove("weak", "medium", "strong");

            if (score < 40) {
                progressBar.classList.add("weak");
            } else if (score < 80) {
                progressBar.classList.add("medium");
            } else {
                progressBar.classList.add("strong");
            }
        }

        passwordInput.addEventListener("input", updateProgressBar);

        document.querySelector("form").onsubmit = e => (document.getElementById("password").value.length >= 4 && /[A-Z]/.test(document.getElementById("password").value) && /[a-z]/.test(document.getElementById("password").value) && /\d/.test(document.getElementById("password").value) && /[!@#$%^&*(),.?":{}|<>]/.test(document.getElementById("password").value)) || e.preventDefault();

        function validateEmail() {
            const emailInput = document.getElementById("email");
            const form = document.getElementById("form");
            const emailValue = emailInput.value;

            if (emailValue.endsWith("@education.nsw.gov.au")) {
                form.querySelector("button[type='submit']").disabled = false;
            } else {
                form.querySelector("button[type='submit']").disabled = true;
            }
        }