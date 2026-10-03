
document.addEventListener("DOMContentLoaded", function () {

    const admissionForm = document.getElementById("admissionForm");
    const formMessage = document.getElementById("formMessage");
    const yearElement = document.getElementById("year");
    const dobInput = document.getElementById("dob");

    // Show current year in the footer
    yearElement.textContent = new Date().getFullYear();

    // Do not allow a future date of birth
    const today = new Date();
    const localToday = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dobInput.max = localToday;

    // Handle form submission
    admissionForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Check browser form validation
        if (!admissionForm.checkValidity()) {
            admissionForm.reportValidity();
            return;
        }

        // Check date of birth
        if (dobInput.value > localToday) {
            showMessage(
                "Please select a valid date of birth.",
                "danger"
            );
            dobInput.focus();
            return;
        }

        // Display success message
        showMessage(
            "Thank you! Your admission enquiry has been completed on this page. Please contact the school to confirm that it has been received.",
            "success"
        );

        // Scroll to the message
        formMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        // Clear the form after showing the message
        admissionForm.reset();
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = "alert alert-" + type;
        formMessage.setAttribute("role", "status");
    }

});