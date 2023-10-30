<template>
    <div class="memory-activity-wrapper">
        <ul class="cards">
            <li class="card" ref="cards" @click="flipCard" v-for="(card, index) in sourcesBackCardImages"
                :key="`card-${index}`">
                <div class="view fron-view">
                    <img src="~/assets/img/memory_activity/que_icon.svg" alt="icon">
                </div>
                <div class="view back-view">
                    <img :src="card.srcBackViewImg" alt="card-img">
                </div>
            </li>
        </ul>
    </div>
    <div class="memory-activity-actions" v-if="renderResetBtn">
        <button class="memory-activity-actions__btn" @click="resetGame"><span>Reiniciar</span></button>
    </div>
    <div class="feedback" v-show="showFeedBack">
        <p class="feedback__text">{{ feedBackText }}</p>
    </div>
</template>

<script setup>
useHead({
    title: 'Actividad de memoria',
    meta: [
        { name: 'description', content: 'A continuación, verás un tablero con diferentes parejas de objetos que se encuentran desordenados.  Tras unos segundos, los objetos se cubrirán. Toca / haz clic sobre cualquiera de las cuadrículas para descubrir el objeto que contiene. Luego, toca/haz clic sobre la cuadrícula en la que crees que se encuentra su pareja correcta. Si aciertas, esta pareja será descubierta. De lo contrario, volverán a taparse. ¡Buena suerte!' }
    ],
    bodyAttrs: {
        class: 'memory-activity bg-blue-light'
    }
})

const showFeedBack = ref(false);
const renderResetBtn = ref(false);
const feedBackText = '¡Qué gran memoria!';
const cards = ref([]);

const sourcesBackCardImages = ref([
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/aprendelibre-dark.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/arlequin.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/book.jpg' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/brain.jpg' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/computer-mouse.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/eye.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/idea.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/laptop.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/pencil.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/smartphone.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/aprendelibre-dark.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/arlequin.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/book.jpg' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/brain.jpg' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/computer-mouse.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/eye.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/idea.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/laptop.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/pencil.png' },
    { srcBackViewImg: 'https://aprendelibremedia.blob.core.windows.net/media/interactive-images/smartphone.png' },
])

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function sortBackImagesCards() {
    sourcesBackCardImages.value.sort(() => Math.random() > 0.5 ? 1 : -1);
}

function unFlipCards() {
    cards.value.forEach((card) => {
        card.classList.remove('flip');
    })
}

function flipCards() {
    cards.value.forEach((card) => {
        card.classList.add('flip');
    })
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";

    sortBackImagesCards()
}

function resetGame() {
    renderResetBtn.value = false;

    shuffleCard();

    setTimeout(() => {
        flipCards();
    }, 1000);

    setTimeout(() => {
        unFlipCards();
    }, 3000);
}

onMounted(async () => {
    cards.value = document.querySelectorAll('.card');

    resetGame();
})

function showValidFeedBack() {
    showFeedBack.value = true;

    setTimeout(() => {
        showFeedBack.value = false;
    }, 1500)
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        showValidFeedBack();
        matched++;

        if (matched === 10) {
            renderResetBtn.value = true;
        }

        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }

    setTimeout(() => {
        cardOne.classList.add('shake')
        cardTwo.classList.add('shake')
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove('shake', 'flip')
        cardTwo.classList.remove('shake', 'flip')
        cardOne = cardTwo = "";
        disableDeck = false
    }, 1200)
}

function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add('flip')

        if (!cardOne) {
            return cardOne = clickedCard;
        }

        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector('.back-view img').src;
        let cardTwoImg = cardTwo.querySelector('.back-view img').src;

        matchCards(cardOneImg, cardTwoImg);
    }
}
</script>

