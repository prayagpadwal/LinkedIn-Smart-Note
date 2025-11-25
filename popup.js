document.addEventListener('DOMContentLoaded', function() {
  const noteTemplate = document.getElementById('noteTemplate');
  const autoFill = document.getElementById('autoFill');
  const saveBtn = document.getElementById('saveBtn');
  const status = document.getElementById('status');

  chrome.storage.sync.get(['noteTemplate', 'autoFill'], function(data) {
    noteTemplate.value = data.noteTemplate || "Hi {name}, I came across your profile and would love to connect! I'm interested in learning more about your experience in {field}.";
    autoFill.checked = data.autoFill !== false;
  });

  saveBtn.addEventListener('click', function() {
    const settings = {
      noteTemplate: noteTemplate.value,
      autoFill: autoFill.checked
    };

    chrome.storage.sync.set(settings, function() {
      status.textContent = 'Settings saved successfully!';
      status.className = 'status success show';
      setTimeout(() => {
        status.className = 'status';
      }, 3000);
    });
  });
});