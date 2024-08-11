<template>
  <div class="container mx-auto px-4 bg-black text-justify py-4">
    <h1 class="text-3xl">Privacy Policy – Verdantoff Technical</h1>
    <br>
    <h2 class="text-2xl">Introduction</h2>
    <p>At Verdantoff, we value your privacy and are committed to protecting your personal information. This Privacy
      Policy outlines what information we collect, how we use it, and the choices you have regarding your data. By using
      our services, you agree to the terms of this policy.</p>

    <h2 class="text-2xl mt-5">Information We Collect</h2>
    <ul class="list-disc pl-5">
      <li><strong>Information You Provide:</strong> When you create an account or use our services, you may provide
        information like your name, email address, and profile information.</li>
      <li><strong>Contact Information (Optional):</strong> You have the option to import your contacts from your Google
        account to easily connect with friends on Verdantoff. We access this information through the Google People API,
        and you have full control over whether or not to grant this permission.</li>
      <li><strong>Automatic Information:</strong> We collect information about how you use our services, such as your
        interactions with content and features. This may include information like your device type, IP address, and
        usage patterns.</li>
    </ul>

    <h2 class="text-2xl mt-5">How We Use Your Information</h2>
    <ul class="list-disc pl-5">
      <li><strong>To Provide and Improve Our Services:</strong> We use your
        information to personalize your experience, recommend content,
        and troubleshoot issues.</li>
      <li><strong>To Connect You with Friends:</strong> If you choose to import your
        contacts, we use this information to help you find and connect with
        friends already using Verdantoff.</li>
      <li><strong>To Communicate with You:</strong> We may send you emails or
        notifications related to your account or our services. You can adjust
        your communication preferences in your account settings.</li>
      <li><strong>To Display Ads:</strong> We may use your information to show you
        relevant ads, but we do not share your personally identifiable
        information with advertisers..</li>
      <li><strong>To Protect Our Services:</strong> We use your information to detect and
        prevent fraud or abuse of our platform.</li>
    </ul>

    <h2 class="text-2xl mt-5">Data Sharing</h2>
    <ul class="list-disc pl-5">
      <li><strong>CometChat:</strong> We use CometChat for video and chat functionality. They have access to your
        account information and usage data necessary to provide these services. We do not share your contact information
        with CometChat.</li>
      <li><strong>Other Third Parties:</strong> We may share your information with service providers who assist us with
        tasks like data analysis and customer support. These providers are not allowed to use your information for other
        purposes.</li>
      <li><strong>Legal Compliance:</strong> We may share your information if required by law or to protect our rights
        or the safety of our users.</li>
    </ul>

    <h2 class="text-2xl mt-5">Your Choices</h2>
    <ul class="list-disc pl-5">
      <li><strong>Import or not import your contacts:</strong> If you choose not to, you can still invite friends
        manually.</li>
      <li><strong>Revoke Verdantoff's access to your Google contacts:</strong> You can do this at any time through your
        Google account settings.</li>
      <li><strong>Delete your Verdantoff account:</strong> This will remove your information from our systems, except
        for data we are required to keep for legal purposes.</li>
      <li><strong>Adjust your communication preferences:</strong> You can do this in your account settings.</li>
    </ul>

    <h2 class="text-2xl mt-5">Data Security</h2>
    <p>We take security seriously and use measures like encryption to protect your information. However, no method of
      transmission over the Internet or electronic storage is completely secure, so we cannot guarantee absolute
      security.</p>

    <h2 class="text-2xl mt-5">Children's Privacy</h2>
    <p>Our services are not intended for children under 13. We do not knowingly collect information from children under
      13.</p>

    <h2 class="text-2xl mt-5">Changes to This Policy</h2>
    <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes through our
      website or other means.</p>

    <h2 class="text-2xl mt-5">Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, please contact us at <a
        href="mailto:jamesfrontechcorp@gmail.com" class="link">jamesfrontechcorp@gmail.com</a>.</p>
  </div>
</template>

<script>
export default {
  name: 'privacy',
}
</script>

<style>
p {
  margin: 10px 0 20px 0;
}

.link:hover {
  color: var(--font-color-gold);
  text-decoration: underline;
}
</style>