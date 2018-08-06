![cf](https://i.imgur.com/7v5ASc8.png) 
# 401 JS --  Lab 41 - Google Oauth Log In

Lab 36 implements async Redux middleware functions for use with superagent, allowing a user to sign up and log in to, in this case, our mid-term project myGarage.

Lab 37 adds a conneciton to the Profiles model of the backend and lets you create a new profile and edit it. In addition, it stores your authentication token as a server cookie and retrieves it if it exists so that you don't have to log in again until the cookie expires.  You can manually logout, in which case the server cookie is deleted.

Lab 38 adds Google Oauth support.  I also partially populate the user's profile from Google Open ID data when they first log in with Google.  Once the Open ID API call is made, I disregard the Google OAuth token, having no further need for it.  I use the servers own GET /login and POST /signup routes. I use the Google Open ID "sub" property as the user's password so that when they come back I can try and log in to the same account.  "Sub" is unique among all google users and will remain unchanged for the current user so it makes an okay password.

Lab 39 adds file upload via the FILE api of HTML5. Didn't make any changes to the back end but realized that myGarage doesn't save a description with attachments, just the original file name. In any case, I put the file upload dialog (attachment-form) and the listing of attachments (attachment-list) on the profile page.  If any attachments exist for the user they're retrieved upon initial load of the profile page then kept updated as the session progresses.  No logic has been added to distinquish attachment file types. They're all treated as images at this point. Non-images don't break anything but they result in a broken image icon in the attachment list.  I may clean this up later today...

lab 40 was all about deployment. The front end is deployed to mygarage-frontend.herokuapp.com. It shows up and you can click on things and fill in forms, but due to the fact that anything herokuapp.com is barred from issuing cookies, that's about all we can do.  There are CORS issues with S3 as well that prevent the heroku deployed frontend and backend from working with S3.  Oh well. They work when running locally.  Additionally, I created an AWS cloudfront CDN site http://d2oiiud6t9idjb.cloudfront.net, but as of Saturday at 2:40PM it doesn't serve anything useful. I did not manually copy files to it, per Judy's slack msg that just having a CDN_URL set and webpack set for output to that URL things should work.  We'll see...  Also implemented some cypress testing with stubbed API.

lab 41 introduced form validation. I also implemented a couple icomoon font characters which required tweaking webpack.common.js.  Used the npm package "validator" to validate email address.
