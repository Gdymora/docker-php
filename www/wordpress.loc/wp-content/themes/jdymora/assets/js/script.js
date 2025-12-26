// Функція для відкриття модального вікна
function openModal() {
    const modal = document.getElementById("form-up");
    modal.style.display = "block";
  }
  
  // Функція для закриття модального вікна
  function closeModal() {
    const modal = document.getElementById("form-up");
    modal.style.display = "none";
  }
  
// Функція для відправки форми за допомогою AJAX
function submitForm() {
    const form = document.getElementById("email-form");
  
    // Отримати дані з форми
    const formData = new FormData(form);
  
    // Виконати запит за допомогою fetch
    fetch(form.action, {
      method: form.method,
      body: formData
    })
    .then(response => {
      if (response.ok) {
        showSuccessMessage();
      } else {
        showFailureMessage();
      }
    })
    .catch(error => {
      showFailureMessage();
    });
  }

  // Функція для відображення повідомлення успіху
function showSuccessMessage() {
    const successMessage = document.getElementById("form-success");
    successMessage.style.display = "block";
  }
  
  // Функція для відображення повідомлення про невдачу
  function showFailureMessage() {
    const failureMessage = document.getElementById("form-failure");
    failureMessage.style.display = "block";
  }


  // Отримати всі елементи акордеонів
const accordionItems = document.querySelectorAll('.div-block-13');

// Додати обробник події кліку до кожного елементу акордеону
accordionItems.forEach(function(item) {
  const title = item.querySelector('.div-block-14');
  const content = item.querySelector('.text-block-14');

  // Обробник події кліку
  title.addEventListener('click', function() {
    // Перевірити, чи блок акордеону є видимим або прихованим
    const isContentVisible = content.classList.contains('show');

    // Змінити стан блоку акордеону відповідно до його поточного стану
    if (isContentVisible) {
      content.classList.remove('show');
    } else {
      // Закрити всі відкриті блоки акордеону перед відкриттям нового
      closeAllAccordionItems();
      content.classList.add('show');
    }
  });
});

// Функція для закриття всіх блоків акордеону
function closeAllAccordionItems() {
  accordionItems.forEach(function(item) {
    const content = item.querySelector('.text-block-14');
    content.classList.remove('show');
  });
}