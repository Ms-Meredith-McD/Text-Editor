const butInstall = document.getElementById('buttonInstall');

/* logic for when and how to install the PWA.  */
window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;
  butInstall.classList.toggle('hidden', false);
});

// This listener fires when the user clicks the "install" button.
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;
// click event handler
  butInstall.classList.toggle('hidden', true);
});
// App Installed handler
window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null;
});
