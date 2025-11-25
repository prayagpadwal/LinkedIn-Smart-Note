// content.js (fixed)
(function() {
  let settings = {
    noteTemplate: "Hi {name}, I'd love to connect with you for opportunities related to Business Intelligence Engineer and Data Engineer at your org. Thanks! Prayag.",
    autoFill: true
  };

  chrome.storage.sync.get(['noteTemplate', 'autoFill'], function(data) {
    if (data.noteTemplate) settings.noteTemplate = data.noteTemplate;
    if (data.autoFill !== undefined) settings.autoFill = data.autoFill;
  });

  chrome.storage.onChanged.addListener(function(changes) {
    if (changes.noteTemplate) settings.noteTemplate = changes.noteTemplate.newValue;
    if (changes.autoFill) settings.autoFill = changes.autoFill.newValue;
  });

  function extractProfileInfo() {
    const nameElement = document.querySelector('h1.text-heading-xlarge, h1.inline.t-24');
    const name = nameElement ? nameElement.textContent.trim().split(' ')[0] : 'there';

    const headlineElement = document.querySelector('.text-body-medium.break-words, .pv-text-details__left-panel .text-body-medium');
    let field = 'your field';

    if (headlineElement) {
      const headline = headlineElement.textContent.trim();
      const keywords = headline.split(/[|@,]/);
      if (keywords.length > 0) {
        field = keywords[0].trim().toLowerCase();
      }
    }

    return { name, field };
  }

  function generateNote(template, info) {
    return template
      .replace(/\{name\}/gi, info.name)
      .replace(/\{field\}/gi, info.field);
  }

  function fillNoteTextarea() {
    try {
      const textarea = document.querySelector('textarea[name="message"], textarea#custom-message');
      if (textarea && textarea.value.trim() === '' && settings.autoFill) {
        const info = extractProfileInfo();
        const note = generateNote(settings.noteTemplate, info);

        textarea.value = note;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));

        textarea.classList.add('linkedin-note-filled');
        console.debug('LinkedIn Note Auto-Generator: note filled.');
      }
    } catch (err) {
      console.warn('LinkedIn Note Auto-Generator: fill error', err);
    }
  }

  const observer = new MutationObserver(function(mutations) {
    try {
      for (let mutation of mutations) {
        if (mutation.addedNodes.length) {
          const textarea = document.querySelector('textarea[name="message"], textarea#custom-message');
          if (textarea && !textarea.classList.contains('linkedin-note-filled')) {
            setTimeout(fillNoteTextarea, 300);
          }
        }
      }
    } catch (err) {
      console.warn('LinkedIn Note Auto-Generator: observer error', err);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Robust click handler without unsupported selectors
  document.addEventListener('click', function(e) {
    try {
      const btn = e.target && e.target.closest ? e.target.closest('button') : null;
      if (!btn) return;

      const aria = (btn.getAttribute('aria-label') || '').toLowerCase();
      const text = (btn.innerText || btn.textContent || '').toLowerCase();

      if (aria.includes('add a note') || text.includes('add a note')) {
        setTimeout(fillNoteTextarea, 500);
      }
    } catch (err) {
      console.warn('LinkedIn Note Auto-Generator: click handler error', err);
    }
  });

})();