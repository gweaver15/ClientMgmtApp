const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const toggleLink = document.getElementById('toggleModeLink');
const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');
const message = document.getElementById('message');

let isSignUp = false;

toggleLink.addEventListener('click', (e) => {
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