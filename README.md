![cf](https://i.imgur.com/7v5ASc8.png) 
# 401 JS --  Lab 40 - Google Oauth Log In

Lab 36 implements async Redux middleware functions for use with superagent, allowing a user to sign up and log in to, in this case, our mid-term project myGarage.

Lab 37 adds a conneciton to the Profiles model of the backend and lets you create a new profile and edit it. In addition, it stores your authentication token as a server cookie and retrieves it if it exists so that you don't have to log in again until the cookie expires.  You can manually logout, in which case the server cookie is deleted.

Lab 38 adds Google Oauth support.  I also partially populate the user's profile from Google Open ID data when they first log in with Google.  Once the Open ID API call is made, I disregard the Google OAuth token, having no further need for it.  I use the servers own GET /login and POST /signup routes. I use the Google Open ID "sub" property as the user's password so that when they come back I can try and log in to the same account.  "Sub" is unique among all google users and will remain unchanged for the current user so it makes an okay password.

Lab 39 adds file upload via the FILE api of HTML5. Didn't make any changes to the back end but realized that myGarage doesn't save a description with attachments, just the original file name. In any case, I put the file upload dialog (attachment-form) and the listing of attachments (attachment-list) on the profile page.  If any attachments exist for the user they're retrieved upon initial load of the profile page then kept updated as the session progresses.  No logic has been added to distinquish attachment file types. They're all treated as images at this point. Non-images don't break anything but they result in a broken image icon in the attachment list.  I may clean this up later today...
