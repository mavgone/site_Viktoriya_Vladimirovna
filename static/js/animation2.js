Vue.use(VueTheMask);

new Vue({
    el: "#app",

    data() {
        return {
            currentCardBackground: Math.floor(Math.random() * 25 + 1),

            cardName: "",
            cardNumber: "",
            cardMonth: "",
            cardYear: "",
            cardCvv: "",

            minCardYear: new Date().getFullYear(),

            amexCardMask: "#### ###### #####",
            otherCardMask: "#### #### #### ####",

            cardNumberTemp: "",

            isCardFlipped: false,

            focusElementStyle: null,
            isInputFocused: false
        };
    },

    mounted() {
        this.cardNumberTemp = this.otherCardMask;

        const cardNumberInput = document.getElementById("cardNumber");

        if (cardNumberInput) {
            cardNumberInput.focus();
        }
    },

    computed: {

        getCardType() {

            let number = this.cardNumber;

            let re = new RegExp("^4");

            if (number.match(re) != null) {
                return "visa";
            }

            
            re = new RegExp("^(34|37)");

            if (number.match(re) != null) {
                return "amex";
            }

            
            re = new RegExp("^5[1-5]");

            if (number.match(re) != null) {
                return "mastercard";
            }

            
            re = new RegExp("^6011");

            if (number.match(re) != null) {
                return "discover";
            }

            
            re = new RegExp("^9792");

            if (number.match(re) != null) {
                return "troy";
            }

            
            return "visa";
        },

        
        generateCardNumberMask() {

            if (this.getCardType === "amex") {
                return this.amexCardMask;
            }

            return this.otherCardMask;
        },

        
        minCardMonth() {

            if (this.cardYear === this.minCardYear) {
                return new Date().getMonth() + 1;
            }

            return 1;
        }
    },

    watch: {

        cardYear() {

            if (this.cardMonth < this.minCardMonth) {
                this.cardMonth = "";
            }
        }
    },

    methods: {

        flipCard(status) {

            this.isCardFlipped = status;
        },

        
        focusInput(e) {

            this.isInputFocused = true;

            const targetRef = e.target.dataset.ref;

            const target = this.$refs[targetRef];

            if (!target) {
                return;
            }

            this.focusElementStyle = {

                width: `${target.offsetWidth}px`,

                height: `${target.offsetHeight}px`,

                transform:
                    `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
            };
        },

        
        blurInput() {

            const vm = this;

            setTimeout(() => {

                if (!vm.isInputFocused) {
                    vm.focusElementStyle = null;
                }

            }, 300);

            vm.isInputFocused = false;
        }
    }
});
