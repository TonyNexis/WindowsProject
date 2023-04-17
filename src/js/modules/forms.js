import checkNumInputs from './checkNumInputs';

const forms = (state) => {
  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');

  checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: 'Загрузка...',
    succes: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {
        method: 'POST',
        body: data,
    });

    return res.text();
  };

  const clearInputs = () => {
    inputs.forEach(element => {
        element.value = '';
    });
  };

  form.forEach(item => {
    item.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        item.appendChild(statusMessage);

    const formData = new FormData(item);
    if (item.getAttribute('data-calc') === 'end') {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (let key in state) {
        formData.append(key, state[key]);
      }
    }

    postData('assets/server.php', formData)
        .then(res => {
            console.log(res);
            statusMessage.textContent = message.succes;
        })
        .catch((err) => {
            console.error(err);
            statusMessage.textContent = message.failure;
        })
        .finally((res) => {
            clearInputs();
            setTimeout(() => {
                statusMessage.remove();
            }, 4000);
        });
    });
  });
};

export default forms;
