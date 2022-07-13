- Add Review confirmation <b>MODAL</b> before navigating out of add review.
- Fab in add review, add question screens and in Owned products tab.+ fix padding for postingmodal mobile// extremely slow in infinite scrolling screens opt out of it
- Long Press comment/reply to report on mobile
- Fix report icon for commen/reply
- Cleanup forms

# Postponed:

- Reporting Admin Side

# Security:

- Don’t store any credentials in code.
- [x] Content Security Policy (CSP).
- [x] use SSL when making requests to APIs.
- [ ] Never trust user data (XSS, JavaScript injection)
- [ ] Verify the source of data CSRF
- [ ] Don't leak information to users (no console logging, don't return the message from server/sql errors to users)

# Minor or Improvement:

- I don't like this snackbar?
- unFocus Posting Field on submitting ### Not even handled in facebook lmao
- Reviews don’t show up immediately after adding a review
- use Yup + RegExp to handle SearchComponent errors for faster response instead of useState ###

# Done:

- Accepting answer then unaccepting it in full question screen has weird effect. (x)
- Collapsed replies (x)
- See previous comments (x)
- Phone verification (x)
- Add mobile posting field in all comments full screen (x)
- Set As Owned should be locked the moment review is posted (x)
- Delete Account Feature USER (x)
- Add Review Star Counter needs to be 1200 char instead of 3000(x)
- Reporting User side:

1. On hover three dots drop down menu over comments replies and answers. (x)
2. integrate with backend for user side.(x)

- See more inside a comment / Expand a comment (x)
- Replace sidebar icons with links instead except add review button & Menu (x)
- Review Purchase Date (x)
- hide snackbar after click see post (x)
- Verify that Ref code starts with "UR" before submitting (x)
- After add question snackbar see post (x)
- Star counter not implemented (x)
- Already reviewed this phone (x)
- Posting field submit empty value (x)
- Reporting with info gets bad request response (x)
- Searching one company then searching a new one keeps the reviews of the previous (x)
- Changing Profiles keeps same reviews from old profile (x)
- Contact Us Menu Item not implemented (x)

= Error handling:

- you have too many unverified phones

= Backend: ASK ABOUT THAT

-
