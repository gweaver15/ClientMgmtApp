document.addEventListener('DOMContentLoaded', function () {
  const { Amplify, Auth } = window.aws_amplify;

  Amplify.configure({
    Auth: {
      region: "us-east-2",
      userPoolId: "us-east-2_FWlusi8cW",
      userPoolWebClientId: "1g0l0mm5jhfpe14sal3e4d1os3",
    }
  });

  // DOM elements
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');
  const toggleLink = document.getElementById('toggleModeLink');
  const formTitle = document.getElementById('formTitle');
  const formSubtitle = document.getElementById('formSubtitle');
  const message = document.getElementById('message');
  const confirmForm = document.getElementById('confirmForm');

  let isSignUp = false;

  // Toggle between sign-in and sign-up
  toggleLink.addEventListener('click', function (e) {
    e.preventDefault();
    isSignUp = !isSignUp;

    signInForm.classList.toggle('hidden', isSignUp);
    signUpForm.classList.toggle('hidden', !isSignUp);

    toggleLink.textContent = isSignUp
      ? 'Already have an account? Sign In'
      : "Don't have an account? Sign Up";

    formTitle.textContent = isSignUp ? 'Create Account' : 'Welcome Back';
    formSubtitle.textContent = isSignUp
      ? 'Sign up to get started'
      : 'Please sign in to continue';
    message.textContent = '';
  });

  // Sign In Handler
  signInForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;
    const pass = document.getElementById('signInPassword')
    message.textContent = '';
    try {
      await Auth.signIn(username, password);
      message.textContent = 'Sign in successful!';
      const user = await Auth.currentAuthenticatedUser();
      const userId = user.attributes.sub;
      localStorage.setItem("userId", userId);
      window.location.href = "clientlist.html";
      // Redirect or update UI as needed
    } catch (err) {
      message.textContent = err.message || 'Sign in failed.';
      pass.value = '';
      pass.focus();
    }
  });

  // Sign Up Handler
  signUpForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('signUpUsername').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const confirm = document.getElementById('signUpConfirm').value;
    message.textContent = '';
    if (password !== confirm) {
      message.textContent = "Passwords do not match.";
      return;
    }
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email }
      });
      // After successful sign-up
      message.textContent = 'Sign up successful! Please check your email for a confirmation code.';
      confirmForm.classList.remove('hidden');
      document.getElementById('confirmUsername').value = username; // pre-fill
    } catch (err) {
      message.textContent = err.message || 'Sign up failed.';
    }
  });

  // Confirmation Handler
  confirmForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('confirmUsername').value;
    const code = document.getElementById('confirmCode').value;
    message.textContent = '';
    try {
      await Auth.confirmSignUp(username, code);
      message.textContent = 'Account confirmed! You can now sign in.';
      confirmForm.classList.add('hidden');
      // Optionally, switch to sign-in form
      signUpForm.classList.add('hidden');
      signInForm.classList.remove('hidden');
    } catch (err) {
      message.textContent = err.message || 'Confirmation failed.';
    }
  });
});

signOutBtn.addEventListener('click', function () {
  Auth.signOut()
    .then(() => {
      localStorage.removeItem("userId");
      window.location.href = "main.html";
    })
    .catch(err => console.log(err));
});