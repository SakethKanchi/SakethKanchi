<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $fullname = htmlspecialchars($_POST['fullname']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Validate inputs (basic example)
    if (empty($fullname) || empty($email) || empty($message)) {
        echo "All fields are required.";
        exit;
    }

    // Set up email
    $to = "sakethkanchi3@gmail.com"; // Replace with your email
    $subject = "New Contact Form Submission";
    $body = "Name: $fullname\nEmail: $email\nMessage:\n$message";
    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message.";
    }
} else {
    echo "Invalid request method.";
}
?>