"use strict"
// Select
let isSelected = false;
//for visible
function checkNameAndSelect() {
    if (document.getElementById('username').value !== '' && isSelected == true) {
        document.getElementById('fields2').classList.add('_visible');
    }
}
//select
const Select = function () {
    let selectHeader = document.querySelectorAll('.select__header');
    let selectItem = document.querySelectorAll('.select__item');
    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle)
    });

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
    });

    function selectToggle() {
        this.parentElement.classList.toggle('is-active');
    }

    function selectChoose() {
        let text = this.innerText,
            select = this.closest('.select'),
            currentText = this.closest('.select').querySelector('.select__current');
        currentText.innerText = text;
        select.classList.remove('is-active');
        if (isSelected == false) {
            currentText.classList.remove('select__placeholder');
            selectHeader = this.closest('.select').querySelector('.select__header');
            selectHeader.classList.remove('select__placeholder');
            isSelected = true;
        }
        checkNameAndSelect();
    }
};

const DateField = function () {
    let dateField = document.getElementById('userbirth');
    dateField.addEventListener('click', dateFieldClick);

    function dateFieldClick() {
        dateField.style.color = 'black';
    }
}

Select();
DateField();

//preview file
const Upload = document.getElementById('upload');
Upload.onchange = uploadFile;

function uploadFile() {
    // file name
    let fileName = this.value;
    let lastIndex = fileName.lastIndexOf('\\');
    if (lastIndex >= 0) {
        fileName = fileName.slice(++lastIndex).split('.')
    }
    document.getElementById('filename').value = fileName[0];

    InfoFile(fileName[1]);


    // img
    const TypeFile = (Upload.files[0].type).split('/')[0]
    if (TypeFile === 'image') {
        PreviewLoadImage()
        document.querySelector('.preview__image').style.display = 'block';
    }
    else {
        document.querySelector('.preview__image').style.display = 'none';
    }

    document.getElementById('file').classList.add('_visible')
    document.getElementById('submitButton').removeAttribute('disabled')
}

// file format
const InfoFile = fileName => {
    let fileSize,
        unit;
    const FileSize = Upload.files[0].size;
    if ((FileSize + 1) / 1024 >= 1 && (FileSize + 1) / 1024 / 1024 < 1) {
        fileSize = FileSize / 1024;
        unit = 'kb';
        fileSize = fileSize.toFixed(0);
    } else {
        fileSize = FileSize / 1024 / 1024;
        fileSize = fileSize.toFixed(2);
        unit = 'mb';
    }
    const info = [fileName.toUpperCase(), fileSize, unit].join(' ');
    document.getElementById('format').value = info;
}
// preview image
const PreviewLoadImage = () => {
    const [file] = upload.files;
    formPreview.src = URL.createObjectURL(file);
}

// delete file

document.querySelector('.file__delete').addEventListener('click', () => {
    document.getElementById('file').classList.remove('_visible');
    Upload.value = ''
    Upload.type = 'file'
    document.getElementById('submitButton').setAttribute('disabled', 'disabled');
})

// active input
for (const input of document.getElementsByTagName('input')) {
    input.addEventListener('click', function () {
        input.addEventListener('change', () => {
            (this.value.length === 0) ? input.classList.remove('_active') : input.classList.add('_active');
        })
    })
}

// visible fields city, date, country
document.getElementById('username').addEventListener('change', checkNameAndSelect);

// check fields city, date, country
const FieldFile = document.getElementById('fields3');
const CheckFullInput = () => {
    const [...fields2] = document.getElementById('fields2').getElementsByTagName('input')
    let counterFull = 0;
    fields2.forEach(field => {
        if (field.value !== '') {
            counterFull++
        }
    })
    if (counterFull === 3) {
        FieldFile.classList.add('_visible');
    }
}

// visible field file
document.getElementById('usercountry').addEventListener('change', CheckFullInput);
document.getElementById('usercity').addEventListener('change', CheckFullInput);
document.getElementById('userbirth').addEventListener('change', CheckFullInput);

//validate form
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);
        if (error == 0) {
            document.getElementById('complete').classList.add('_visible');
        }
    }

    function formValidate(form) {
        const onlyletters = (field) => !/^[A-Za-zA-Яа-яЁё ]*$/.test(field.value);
        const checkDate = (field) => field.value.split('-')[0] > 2021 || field.value.split('-')[0] < 1922;
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const field = formReq[index];
            formRemoveError(field);

            if (field.classList.contains('field__date')) {
                if (checkDate(field)) {
                    formAddError(field);
                    error++;
                }
            } else if (field.value === '' || onlyletters(field)) {
                formAddError(field);
                error++;
            } else if (field.id === 'username') {
                if (field.value.includes(" ") || onlyletters(field)) {
                    formAddError(field);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(field) {
        field.parentElement.classList.add('_error');
        field.classList.add('_error');
    }

    function formRemoveError(field) {
        field.parentElement.classList.remove('_error');
        field.classList.remove('_error');
    }
});

// slider
let slideIndex = 1;
showSlides(slideIndex);

function plusSlide() {
    showSlides(slideIndex += 1);
}

function minusSlide() {
    showSlides(slideIndex -= 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("item");
    let dots = document.getElementsByClassName("slider-dots_item");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
