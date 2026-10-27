;(function () {
    'use strict';

    class Form {
        static patternName = /^[а-яёА-ЯЁ\s]+$/;
        static patternMsg = /^[а-яёА-ЯЁ\s]+$/;
        static patternMail = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
        static patternPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        static errorMess = [
            'Незаполненное поле ввода',
            'Введите Ваше реальное имя',
            'Укажите Вашу электронную почту',
            'Неверный формат электронной почты',
            'Укажите тему сообщения',
            'Напишите текст сообщения'
        ];

        constructor(form) {
            this.form = form;
            this.fields = this.form.querySelectorAll('.form-control');
            this.btn = this.form.querySelector('[type=submit]');
            this.iserror = false;
            this.registerEventsHandler();
        }

        static getElement(el) {
            return el.parentElement.nextElementSibling;
        }

        static getParent(el) {
            return el.parentNode;
        }

        registerEventsHandler() {
            this.btn.addEventListener('click', this.validForm.bind(this));
            this.form.addEventListener('focus', () => {
                const el = document.activeElement;
                if (el === this.btn) return;
                this.cleanError(el, parent);
            }, true);
            for (let field of this.fields) {
                field.addEventListener('blur', this.validBlurField.bind(this));
            }
        }

        validForm(e) {
            e.preventDefault();
            document.querySelector('.feedback__captcha .g-recaptcha-error').innerHTML = "";
            const formData = new FormData(this.form);
            let error;

            for (let property of formData.keys()) {
                error = this.getError(formData, property);
                if (error.length == 0) continue;
                this.iserror = true;
                this.showError(property, error);
            }

            if (this.iserror) return this.showError(property, error);
            this.sendFormData(formData);
        }

        validBlurField(e) {
            const target = e.target;
            const property = target.getAttribute('name');
            const value = target.value;

            const formData = new FormData();
            formData.append(property, value);

            const error = this.getError(formData, property);
            if (error.length == 0) return this.showSuccess(property, error);
            this.showError(property, error);
        }

        getError(formData, property) {
            let error = '';
            const validate = {
                username: () => {
                    if (formData.get('username').length == 0 || Form.patternName.test(formData.get('username')) == false) {
                        error = Form.errorMess[1];
                    }
                },
                usermail: () => {
                    if (formData.get('usermail').length == 0) {
                        error = Form.errorMess[2];
                    } else if (Form.patternMail.test(formData.get('usermail')) == false) {
                        error = Form.errorMess[3];
                    }
                },
                // userphone: () => {
                //     if (formData.get('userphone').length == 0) {
                //         return
                //     } else if (Form.patternPhone.test(formData.get('userphone')) == false) {
                //         error = Form.errorMess[3];
                //     }
                // },
                textmess: () => {
                    if (formData.get('textmess').length == 0 || Form.patternMsg.test(formData.get('textmess')) == false) {
                        error = Form.errorMess[3];
                    }
                },
                // userorganization: () => {
                // 	if (Form.patternMsg.test(formData.get('userorganization')) == false) {
                // 		error = Form.errorMess[3];
                // 	}
                // }
            }

            if (property in validate) {
                validate[property]();
            }
            return error;
        }

        showError(property, error) {
            const el = this.form.querySelector(`[name=${property}]`);
            const send = this.form.querySelector('#send_mess');
            const parent = Form.getParent(el);

            el.classList.remove('form-control_success');
            parent.classList.remove('feedback--success');

            send.classList.add('disabled');
            el.classList.add('form-control_error');
            parent.classList.add('feedback--error');
        }

        cleanError(el) {
            const parent = Form.getParent(el);
            const send = this.form.querySelector('#send_mess');

            el.classList.remove('form-control_error');
            parent.classList.remove('feedback--error');
            send.classList.remove('disabled');

            this.iserror = false;
        }

        showSuccess(property, error) {
            const el = this.form.querySelector(`[name=${property}]`);
            const send = this.form.querySelector('#send_mess');
            const parent = Form.getParent(el);

            send.classList.remove('disabled');
            el.classList.remove('form-control_error');
            parent.classList.remove('feedback--error');

            el.classList.add('form-control_success');
            parent.classList.add('feedback--success');
        }

        sendFormData(formData) {
            let xhr = new XMLHttpRequest();
            // true = async
            xhr.open('POST', '/wp-admin/admin-ajax.php', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        if (xhr.responseText === "Спасибо! Ваше обращение отправлено.") {
                            document.querySelector('.feedback-sent').style.display = 'flex';
                            popup.classList.remove('active');
                            body.classList.remove('no-scroll');
                        } else {
                            document.querySelector('.feedback__captcha .g-recaptcha-error').innerHTML = xhr.responseText;
                        }
                        return;
                        document.querySelector('.feedback-sent').style.display = 'flex';
                        popup.classList.remove('active');
                        body.classList.remove('no-scroll');

                    } else {
                    }
                } else {
                }
            }
            formData.append('action', 'formGet');
            formData.append('topic', labelAppeal.innerText);
            formData.append('who', document.querySelector('.dropdown__options-filter li').innerText);
            xhr.send(formData);
        }
    }

    class FormFree {
        static patternName = /^[а-яёА-ЯЁ\s]+$/;
        static patternMsg = /^[а-яёА-ЯЁ\s]+$/;
        static patternMail = /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
        static patternPhone = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        static errorMess = [
            'Незаполненное поле ввода',
            'Введите Ваше реальное имя',
            'Укажите Вашу электронную почту',
            'Неверный формат электронной почты',
            'Укажите тему сообщения',
            'Напишите текст сообщения'
        ];

        constructor(form) {
            this.form = form;
            this.fields = this.form.querySelectorAll('.form-control');
            this.btn = this.form.querySelector('[type=submit]');
            this.iserror = false;
            this.registerEventsHandler();
        }

        static getElement(el) {
            return el.parentElement.nextElementSibling;
        }

        static getParent(el) {
            return el.parentNode;
        }

        registerEventsHandler() {
            this.btn.addEventListener('click', this.validForm.bind(this));
            this.form.addEventListener('focus', () => {
                const el = document.activeElement;
                if (el === this.btn) return;
                this.cleanError(el, parent);
            }, true);
            for (let field of this.fields) {
                field.addEventListener('blur', this.validBlurField.bind(this));
            }
        }

        validForm(e) {
            e.preventDefault();
            document.querySelector('.feedback__captcha .g-recaptcha-error').innerHTML = "";
            const formData = new FormData(this.form);
            let error;

            for (let property of formData.keys()) {
                error = this.getError(formData, property);
                if (error.length == 0) continue;
                this.iserror = true;
                this.showError(property, error);
            }

            if (this.iserror) return this.showError(property, error);
            this.sendFormData(formData);
        }

        validBlurField(e) {
            const target = e.target;
            const property = target.getAttribute('name');
            const value = target.value;

            const formData = new FormData();
            formData.append(property, value);

            const error = this.getError(formData, property);
            if (error.length == 0) return this.showSuccess(property, error);
            this.showError(property, error);
        }

        getError(formData, property) {
            let error = '';
            const validate = {
                username: () => {
                    if (formData.get('username').length == 0 || Form.patternName.test(formData.get('username')) == false) {
                        error = Form.errorMess[1];
                    }
                },
                usermail: () => {
                    if (formData.get('usermail').length == 0) {
                        error = Form.errorMess[2];
                    } else if (Form.patternMail.test(formData.get('usermail')) == false) {
                        error = Form.errorMess[3];
                    }
                },
                // userphone: () => {
                //     if (formData.get('userphone').length == 0) {
                //         return
                //     } else if (Form.patternPhone.test(formData.get('userphone')) == false) {
                //         error = Form.errorMess[3];
                //     }
                // },
                textmess: () => {
                    if (formData.get('textmess').length == 0 || Form.patternMsg.test(formData.get('textmess')) == false) {
                        error = Form.errorMess[3];
                    }
                },
                // userorganization: () => {
                // 	if (Form.patternMsg.test(formData.get('userorganization')) == false) {
                // 		error = Form.errorMess[3];
                // 	}
                // }
            }

            if (property in validate) {
                validate[property]();
            }
            return error;
        }

        showError(property, error) {
            const el = this.form.querySelector(`[name=${property}]`);
            const send = this.form.querySelector('#send_mess');
            const parent = Form.getParent(el);

            el.classList.remove('form-control_success');
            parent.classList.remove('feedback--success');

            send.classList.add('disabled');
            el.classList.add('form-control_error');
            parent.classList.add('feedback--error');
        }

        cleanError(el) {
            const parent = Form.getParent(el);
            const send = this.form.querySelector('#send_mess');

            el.classList.remove('form-control_error');
            parent.classList.remove('feedback--error');
            send.classList.remove('disabled');

            this.iserror = false;
        }

        showSuccess(property, error) {
            const el = this.form.querySelector(`[name=${property}]`);
            const send = this.form.querySelector('#send_mess');
            const parent = Form.getParent(el);

            send.classList.remove('disabled');
            el.classList.remove('form-control_error');
            parent.classList.remove('feedback--error');

            el.classList.add('form-control_success');
            parent.classList.add('feedback--success');
        }

        sendFormData(formData) {
            // console.log(formData);
            // return;
            let xhr = new XMLHttpRequest();
            // true = async
            xhr.open('POST', '/wp-admin/admin-ajax.php', true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        if (xhr.responseText === "Спасибо! Ваше обращение отправлено.") {
                            document.querySelector('.feedback-sent').style.display = 'flex';
                            freeSamplePopup.classList.remove('active');
                            body.classList.remove('no-scroll');
                        } else {
                            document.querySelector('.feedback__captcha .g-recaptcha-error').innerHTML = xhr.responseText;
                        }
                        return;
                        document.querySelector('.feedback-sent').style.display = 'flex';
                        popup.classList.remove('active');
                        body.classList.remove('no-scroll');

                    } else {
                    }
                } else {
                }
            }
            formData.append('action', 'formFreeSample');
            xhr.send(formData);
        }
    }

    const forms = document.querySelectorAll('[name=feedback]');
    const formFree = document.querySelectorAll('[name=free-samples]');
    if (forms) {
        for (let form of forms) {
            const f = new Form(form);
        }
    }
    if (formFree) {
        for (let form of formFree) {
            const fFree = new FormFree(form);
        }
    }
})();

$(".xclose").on("click", function () {
    document.querySelector('.feedback-sent').style.display = '';
})

const body = document.body

const openPopup = document.querySelector('#feedback')
const closePopup = document.querySelector('#feedback-popup .feedback__header-close')
const closeFreeSamplePopup = document.querySelector('#free-popup .feedback__header-close')
const popup = document.querySelector('#feedback-popup')
const freeSamplePopup = document.querySelector('#free-popup')
const freeSamplePopupOpen = document.querySelectorAll('.sample-banner__button')

freeSamplePopupOpen.forEach(freeSamplePopupOpenBtn => {
    freeSamplePopupOpenBtn.addEventListener('click', function (e) {
        e.preventDefault()
        freeSamplePopup.classList.add('active')
        freeSamplePopup.classList.add('no-scroll')
    })
})

var currentLocation = window.location;

function showSamplePopup() {
    freeSamplePopup.classList.add('active')
    freeSamplePopup.classList.add('no-scroll')
}

if (currentLocation.pathname.includes('products/barista')) {
    setTimeout(showSamplePopup, 10000)
}
if (openPopup) {
    openPopup.addEventListener('click', function (e) {
        e.preventDefault()
        popup.classList.add('active')
        body.classList.add('no-scroll')
    })
}

if (closePopup) {
    closePopup.addEventListener('click', () => {
        popup.classList.remove('active')
        body.classList.remove('no-scroll')
    })
}
if (closeFreeSamplePopup) {
    closeFreeSamplePopup.addEventListener('click', () => {
        freeSamplePopup.classList.remove('active')
        freeSamplePopup.classList.remove('no-scroll')
    })
}

const label = document.querySelector('.dropdown__filter-selected')
const labelAppeal = document.querySelector('.dropdown__appeal-filter-selected')
const options = Array.from(document.querySelectorAll('.dropdown__select-option'))
const optionsAppeal = Array.from(document.querySelectorAll('.dropdown__appeal-select-option'))
const dropdownFilter = document.querySelector('.dropdown__filter')
const dropdownAppealFilter = document.querySelector('.dropdown__appeal-filter')
const inputFocus = document.querySelector('#input-focus')
const dropdownList = document.querySelector('.dropdown-list')
const organizationBlock = document.querySelector('#organization')
const organizationOwner = document.querySelector('#dropdown-owner')
const organizationMerch = document.querySelector('#dropdown-merch')

if (inputFocus) {
    inputFocus.addEventListener('click', () => {
        inputFocus.focus();
    })
}

options.forEach((option) => {
    option.addEventListener('click', () => {
        label.textContent = option.textContent
        organizationBlock.classList.remove('active')
    })
})

optionsAppeal.forEach((option) => {
    option.addEventListener('click', () => {
        labelAppeal.textContent = option.textContent
    })
})
if (dropdownFilter) {
    dropdownFilter.addEventListener('click', () => {
        dropdownFilter.classList.toggle('active')
    })
}

if (dropdownAppealFilter) {
    dropdownAppealFilter.addEventListener('click', () => {
        dropdownAppealFilter.classList.toggle('active')
    })
}

if (organizationOwner) {
    organizationOwner.addEventListener('click', function (e) {
        e.preventDefault()
        organizationBlock.classList.add('active')
        dropdownFilter.classList.remove('active')
    })
}

if (organizationMerch) {
    organizationMerch.addEventListener('click', function (e) {
        e.preventDefault()
        organizationBlock.classList.add('active')
        dropdownFilter.classList.remove('active')
    })
}

document.addEventListener('click', (e) => {
    const toggle = document.querySelector('.dropdown__switch')
    const element = e.target
    if (element == toggle) return;
    const isDropdownChild = element.closest('.dropdown__filter')
    if (!isDropdownChild) {
        toggle.checked = false
    }
})

document.addEventListener('click', (e) => {
    const toggle = document.querySelector('.dropdown__appeal-switch')
    const element = e.target
    if (element == toggle) return;
    const isDropdownChild = element.closest('.dropdown__appeal-filter')
    if (!isDropdownChild) {
        toggle.checked = false
    }
});
