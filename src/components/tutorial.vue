<!---
  This is the tutorial page, all the images are imported from src/assets/img folder
 --->

<template>
<div class="bg-black text-white text-center">
  <div class="tp">
   <h1 class="text-3xl">Tutorial Page</h1>
  </div>
  <div class = "home container mx-auto">
    <h3 class="text-2xl">Home page</h3>
  </div>
  <div class="hp">
Select Background; allows you to choose from 3 images which are fern, leaf, and mountain. To change the background click on select Background, and the one you prefer. 
<br> If you don't like the background you have chosen, it doesn't matter as you can change it as many times as you like.
-note that backgrounds can only be changed on the home page-
  </div>  

  <div class = "container mx-auto">
  <img src="../assets/img/Background1.png " class="mx-auto">
  <img src="../assets/img/bg2.jpg " class="mx-auto">
  </div>

  <div class="sign up">
  <div class = "home">
  <h3 class="text-2xl"><br>  Sign Up button </h3>
  </div>
  <div class = "home">
  <h4> - Create an account - </h4>
  </div>
Enter your email, password, and username. The username is a name that you would like to be called during the meetings, it can be a nickname or company name, etc.
<br> After entering these details click the red submit button.
<br> Once the account has been created a verification email will be sent. If you do not receive this email please check in the junk email folder. 
<br> Still, if you are unable to see a verification email then a wrong email may have been entered, so try to sign up once again with the correct email.   
    
  <div class = "container mx-auto">
  <img class="mx-auto" src="../assets/img/SignUp.jpg">
  </div>

  <div class = "home">
 <h4><br><br> - Sign Up Error - </h4>
  </div>
There is an existing account under the email you have entered. Use another email or log in to the account you have. 

<div class = "container mx-auto">
  <img class="mx-auto" src="../assets/img/eu.jpg">
</div>

  </div>
    <div class="login">

  <div class = "home">
 <h3 class="text-2xl"><br><br> Login </h3>
  </div>
Enter the email you used to create the account and the password, then click the red submit button. When logged in the login button will change to log out button.
      
  <div class = "log in">
  <img src="../assets/img/logedIn.jpg" class="mx-auto">
  </div>

  <div class = "home">
 <h3 class="text-2xl"> Login Error </h3>
  </div>
-‘The email or password you entered is wrong’-
If the correct email was entered you can click the green button which sends an email to reset the password. 
<br> Note if you are unable to find the email to reset your password in your inbox, please check in the junk email folder.
  </div>
  <div class = "loginError">
    <img src="../assets/img/LoginError.png" class="mx-auto">
    </div>

  <div class="Verify email">
    <h3 class="text-2xl"><br><br> Verificat notice</h3>
  </div>
  <div>
    If you login with an email that is not verified, a small verification notice will pop up on the top right corner in the navigation bar.
    <br>
    Once you verify your email the verification notice will disapper.
  </div>
  <div class="verify_image">
    <img src="../assets/img/verification.png" class="mx-auto">
  </div>
  

    <div class="About us">
   <div class = "About us">
 <h3 class="text-2xl"><br><br> About Us</h3>
  </div>
  When you click on this text seen at the bottom of the home page, a page about Verdantoff’s story comes up. To get out of this page you may click on home or any other button.
    
    <div class = "About Us">
  <img src="../assets/img/AboutUs.png" class="mx-auto">
  </div>

   <div class = "heading">
 <h3 class="text-2xl"><br><br>Terms and Conditions</h3>
  </div>

  </div>
    <div class="t&c">
    When clicked on a new tab is created, this page is separate so both pages can be open at the same time. To exit it you can simply remove the tab or go back to the original tab.
  </div>

   <div class = "image">
  <img src="../assets/img/t&c.1.png" class="mx-auto">
  <img src="../assets/img/t&c2.jpg" class="mx-auto">
  </div>

   <div class = "contact">
 <h3 class="text-2xl"><br><br> Contact Us</h3>

   This text can be clicked on, which takes you onto the contact page.
   <br>
  <img src="../assets/img/ContactUs.png" class="mx-auto">
  </div>  
  
   <div class = "emoji">
 <h3 class="text-2xl"><br><br> Chat Box</h3>
  <p>
    You can use these functions in chat room.
  </p>
  <img src="../assets/img/emoji.png" class="mx-auto">

  </div>

   <div class = "Attach">
 <h3>Attach</h3>
 <p1>To attach files you need to click on the plus located below the chatbox on the left-hand side, which can be seen in the image above. 
  <br> You can select the file type you would like to send and attach it to the chat. To get rid of the attached files options click on the same button which now looks like an x. </p1>
  <img src="../assets/img/Attach1.png" class="mx-auto">
  </div>

<div class = "Call">
 <h3 class="text-2xl"><br><br> Call Functions</h3>
 <p>
   You can create a video call by clicking the video call button. The voice call button is currently unused.
   <br> Notice that creating a video call will invite all current online users in the chat group.
   <br> Voice call button is disabled, please use video call instead, you can switch off your camera in video calls.
 </p>
 <img src="../assets/img/callFunctions.png" class="mx-auto">
  <img src="../assets/img/ChatRooms.jpg" class="mx-auto">
  <p>
    You can see the group information by clicking the group button. Also, all the uploaded files will be shown in here.
  </p>
  <br>
  <img src="../assets/img/sidebar.png" class="mx-auto">
</div>

<div class = "video_session">
  <h3 class="text-2xl">
    <br><br>
    Video Session
  </h3>
  <p>
    This is the video session user interface. You can control your mic, camara and sharing screen by the buttons below.
    <br> You can also click on the user button to see who is in the session.
  </p>
  <br>
  <img src="../assets/img/video.png" class="mx-auto">
</div>

<div class="security">
  <h3 class="text-2xl">
    <br><br>
    Secure Meeting
  </h3>
  <p>
    If a user leaves a video meeting, or is late for the meeting, he or she cannot enter the meeting once the meeting has started, unless the meeting host decides to terminate the meeting and restart a fresh meeting.
    <br> This can prevent people hacking in to video meetings which happened on other websites before.
    <br> NOTICE: If a user accidentally leaves a video meeting, he or she cannot re-enter the meeting unless the host terminates the current meeting and calls a new meeting.
  </p>
  <br>
</div>

<div class="group">
  <h3 class="text-2xl">
    <br><br>
    Group Dialing
  </h3>
  <p>
    If one person within a group starts a call all current online users will get a notification that asks them to accept or decline the call. 
    <br><br> -Call Decline-
    <br> When the user declines the call they will not be able to join unless a new meeting is started.
    <br> Note - If dialing more than one user for a video meeting, it would be easier for the host to put every user attending the meeting into a group. 
    <br> This will make it easier than dialing each user one at a time, as the host can simply dial the group instead.
  </p>
  <br>
</div>


<div class = "Chats">
  <h3 class="text-2xl">
    <br><br>Navigation bar</h3>
 There are four buttons in the navigation bar, the first one shows a list of current chats. The second one shows a list of all users. The third one shows a list of all groups.
 <br>
 When a user is active they can be seen with a green dot.
 <br>
 "More" page is still under development now, so the button wont work for now
 <div>
  <img src="../assets/img/combine_fix.png" class="mx-auto">
</div>

  </div>
</div>

</template>

<script>
export default {
  name: 'tutorial',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >

</style>
