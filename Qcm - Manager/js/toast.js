import { toastContainer } from './dom.js';

export function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast max-w-sm w-full bg-${type === 'success' ? 'green' : 'red'}-600 text-white p-4 rounded-md shadow-lg mb-2`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}