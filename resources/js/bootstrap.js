import "bootstrap";

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from "axios";
window.axios = axios;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.baseURL = "/api"; // Adjust the base URL according to your API endpoint
import { toast } from "react-toastify";

window.axios.interceptors.response.use(
    (response) => {
        // Show success toast for successful responses with status code 200
        if (response.status === 200 || response.status === 201) {
            toast.success("Request successful");
        }
        return response;
    },
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            toast.error(error.response.data.message || "An error occurred");
        } else if (error.request) {
            // The request was made but no response was received
            toast.error("No response received from the server");
        } else {
            // Something happened in setting up the request that triggered an Error
            toast.error("An error occurred while setting up the request");
        }
        return Promise.reject(error);
    }
);

// Intercept requests to attach the CSRF token

window.axios
    .get("/user")
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.error(error);
    });
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
//     wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
