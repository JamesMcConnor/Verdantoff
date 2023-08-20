<template>
    <div>
        <div class="error-toast-container">
            <div v-for="(message, index) in errorMessages" :key="index" class="error-toast"
                :class="{ 'active': message.active }">
                {{ message.text }}
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        messages: Array,
    },
    data() {
        return {
            errorMessages: [],
        };
    },
    methods: {
        showErrorToast() {
            // Clear existing error messages
            this.errorMessages = [];

            // Iterate through the provided messages and add them to the errorMessages array with an active property
            for (const message of this.messages) {
                this.errorMessages.push({ text: message, active: true });

                // Set a timer to hide each message after a delay (e.g., 2 seconds)
                setTimeout(() => {
                    const index = this.errorMessages.findIndex((msg) => msg.text === message);
                    if (index !== -1) {
                        this.errorMessages[index].active = false;
                        this.errorMessages.splice(index, 1);
                    }
                }, 3000);
            }
        },
    },
};
</script>
  
<style scoped>
.error-toast-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column-reverse;
    /* Stack messages in reverse order */
}

.error-toast {
    background-color: #ff0000;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    /* Add gap between messages */
    opacity: 0;
    transform: translateY(100%);
    /* Slide in from the bottom */
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

/* Apply styles to show the error messages */
.error-toast.active {
    opacity: 1;
    transform: translateY(0);
}
</style>
  