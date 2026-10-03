(() => {
  const STORAGE_KEY = 'starbuks_chat_messages';

  const replies = [
    {
      words: ['здравствуйте', 'привет', 'добрый день', 'добрый вечер'],
      text: 'Здравствуйте! Чем могу помочь?'
    },
    {
      words: ['цена', 'стоимость', 'сколько'],
      text: 'Актуальные цены можно посмотреть в разделе «Menu» на сайте.'
    },
    {
      words: ['меню', 'кофе', 'напит'],
      text: 'Конечно! Перейдите в раздел «Menu», там собраны наши напитки и цены.'
    },
    {
      words: ['часы', 'работаете', 'открыт', 'время'],
      text: 'Мы работаем с понедельника по пятницу с 8:00 до 20:00, а в выходные с 9:00 до 21:00.'
    },
    {
      words: ['спасибо', 'благодарю'],
      text: 'Пожалуйста! Будем рады помочь ещё.'
    }
  ];

  const defaultReply =
    'Спасибо за сообщение! Администратор скоро ответит на ваш вопрос.';

  function getTime() {
    return new Date().toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function loadMessages() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function saveMessages(messages) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(messages.slice(-50))
    );
  }

  function findReply(text) {
    const normalized = text.toLowerCase();

    const match = replies.find(reply =>
      reply.words.some(word => normalized.includes(word))
    );

    return match ? match.text : defaultReply;
  }

  const widget = document.createElement('div');
  widget.className = 'chat-widget';

  widget.innerHTML = `
    <div class="chat-window" aria-label="Чат поддержки">

      <div class="chat-header">
        <div class="chat-header-info">
          <span class="chat-title">Чат поддержки</span>
          <span class="chat-status">Администратор онлайн</span>
        </div>

        <button
          class="chat-close"
          type="button"
          aria-label="Закрыть чат"
        >
          ×
        </button>
      </div>

      <div class="chat-messages" aria-live="polite"></div>

      <div class="chat-typing">
        Администратор печатает...
      </div>

      <form class="chat-form">

        <input
          class="chat-input"
          type="text"
          maxlength="300"
          autocomplete="off"
          placeholder="Напишите сообщение..."
          aria-label="Сообщение"
        >

        <button
          class="chat-send"
          type="submit"
          aria-label="Отправить"
        >
          ➤
        </button>

      </form>

    </div>

    <button
      class="chat-toggle"
      type="button"
      aria-label="Открыть чат"
    >
      Чат поддержки
    </button>
  `;

  document.body.appendChild(widget);

  const messagesElement =
    widget.querySelector('.chat-messages');

  const input =
    widget.querySelector('.chat-input');

  const form =
    widget.querySelector('.chat-form');

  const typing =
    widget.querySelector('.chat-typing');

  const toggle =
    widget.querySelector('.chat-toggle');

  const close =
    widget.querySelector('.chat-close');

  let messages = loadMessages();

  function renderMessage(message) {
    const wrapper = document.createElement('div');

    wrapper.className =
      `chat-message chat-message--${message.sender}`;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = message.text;

    const time = document.createElement('div');
    time.className = 'chat-time';
    time.textContent = message.time;

    wrapper.append(bubble, time);

    messagesElement.appendChild(wrapper);
  }

  function renderMessages() {
    messagesElement.innerHTML = '';

    if (messages.length === 0) {
      messages = [
        {
          sender: 'operator',
          text: 'Здравствуйте! Чем могу помочь?',
          time: getTime()
        }
      ];

      saveMessages(messages);
    }

    messages.forEach(renderMessage);

    messagesElement.scrollTop =
      messagesElement.scrollHeight;
  }

  function addMessage(sender, text) {
    const message = {
      sender,
      text,
      time: getTime()
    };

    messages.push(message);

    messages = messages.slice(-50);

    saveMessages(messages);

    renderMessage(message);

    messagesElement.scrollTop =
      messagesElement.scrollHeight;
  }

  function openChat() {
    widget.classList.add('is-open');

    input.focus();

    messagesElement.scrollTop =
      messagesElement.scrollHeight;
  }

  toggle.addEventListener('click', openChat);

  close.addEventListener('click', () => {
    widget.classList.remove('is-open');
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    const text = input.value.trim();

    if (!text) {
      return;
    }

    addMessage('user', text);

    input.value = '';

    typing.classList.add('is-visible');

    messagesElement.scrollTop =
      messagesElement.scrollHeight;

    setTimeout(() => {
      typing.classList.remove('is-visible');

      addMessage(
        'operator',
        findReply(text)
      );
    }, 900);
  });

  renderMessages();
})();
